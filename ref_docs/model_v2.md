# Beckn v2 ↔ OCPI 2.2.1 Mapping (EV Charging)

## Scope
- Focuses on EV charging order journeys (discover/search ➝ select ➝ init ➝ confirm ➝ fulfillment/status ➝ post-session logs) in Beckn Protocol v2 draft.
- OCPI baseline is 2.2.1 (core modules: Locations, Tariffs, Sessions, CDRs, Tokens, Commands; optional where relevant to the flow).
- Ancillary data (provider identity, amenities, telemetry, etc.) captured when it impacts the order, reservation, or pricing experience.
- Role alignment assumed: Beckn App Provider (BAP) ↔ Mobility Service Provider (MSP); Beckn Provider Platform (BPP) ↔ Charge Point Operator (CPO). Deviations are called out explicitly.

## Terminology Alignment

| Role / Concept                   | Beckn v2 Term / Schema                                                       | OCPI 2.2.1 Equivalent                            | Notes |
| -------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------ | ----- |
| Platform providing retail UX    | `beckn:BAP` / `beckn:Context.beckn:bapId`                                    | MSP (EMSP)                                       | BAP federates consumer search, composes demand. |
| Charging network operator        | `beckn:BPP` / `beckn:Provider`                                               | CPO (OCPI party_code/Locations owner)            | Single CPO can expose multiple Providers through one BPP instance. |
| Station catalogue                | `beckn:Catalog.beckn:items` + `EvChargingService` attributes                 | `/locations` (locations, EVSEs, connectors)      | Beckn separates commercial Offer from technical Item attributes. |
| Commercial offer                 | `beckn:Offer` + `EvChargingOffer.ChargingOffer` attributes                   | `/tariffs`, `/pricing` (Tariff + PriceComponent) | OCPI tariffs referenced by EVSE connectors; Beckn carries price snapshot per offer. |
| Fulfillment / session lifecycle  | `beckn:Fulfillment` (type `Service`), `beckn:Order`, `beckn:OrderState`      | `/sessions`, `/commands`, `/cdrs`                | Fulfillment IDs map to OCPI session IDs; Beckn order events mirror OCPI session statuses. |
| Authorization handle             | `beckn:Quote`, `beckn:Payment`, `beckn:Fulfillment.authorization`            | `/tokens`, `/commands/START_SESSION`             | MSP-issued tokens or ad-hoc auth flow. |
| Post-charge evidence             | `beckn:Order.billing`, logs in `acknowledgements`                            | `/cdrs`, `/sessions` final state                 | Beckn expects summarized totals; OCPI offers detailed meter values. |

## API Flow Mapping

| Beckn Action (BAP ➝ BPP unless noted) | Typical OCPI Call(s)                            | Direction | Notes |
| ------------------------------------- | ----------------------------------------------- | --------- | ----- |
| `search` / `discover`                 | `GET /locations` (+ `GET /tariffs` on demand)   | MSP ➝ CPO | Locations filtered by geo, connector attributes, charging power; piggyback synchronous tariffs when Beckn offer needs snapshot. |
| `on_search` / `on_discover`           | n/a (BPP ➝ BAP callback)                        | CPO ➝ MSP | BPP composes Beckn catalog using OCPI payloads, possibly cached (Redis). |
| `select`                              | No direct OCPI call; may re-validate `/locations` or `/tariffs`             | MSP ➝ CPO | Beckn `select` acknowledges item + offer chosen; BPP may re-fetch OCPI data to confirm availability & pricing. |
| `on_select`                           | Optional `POST /commands/RESERVE_NOW` or custom hold | CPO ➝ MSP | Only needed if Beckn operator holds connector. If not using OCPI commands, mark “No OCPI equivalent”. |
| `init`                                | `/tokens` (validate), `/commands/START_SESSION` | MSP ➝ CPO | BAP provides driver token/payment intent; BPP initiates OCPI remote start. |
| `on_init`                             | `/sessions` read                               | CPO ➝ MSP | BPP returns fulfillment handle (OCPI session UID) and tariff snapshot to BAP. |
| `confirm`                             | `/commands/RESUME_SESSION` (if paused) / `/sessions` update | MSP ➝ CPO | Typically redundant; confirm acknowledges start. |
| `on_confirm`                          | `/sessions`                                      | CPO ➝ MSP | Provide active charging details (connector, meter start). |
| `status` / `track`                    | `GET /sessions/{country_code}/{party_id}/{session_id}` | MSP ↔ CPO | Polling or webhook equivalent. |
| `on_status` / `on_track`              | n/a (BPP ➝ BAP)                                 | CPO ➝ MSP | Provide incremental SOC/energy/time updates when OCPI session changes. |
| `update` / `cancel`                   | `/commands/STOP_SESSION`, `/commands/CANCEL_RESERVATION` | MSP ➝ CPO | Stopping session maps to OCPI remote stop. |
| `on_update` / `on_cancel`             | `/sessions` final state, `/cdrs`                | CPO ➝ MSP | Final totals delivered to Beckn. |
| Post-settlement (`rating`, `support`) | `/cdrs`, operator CRM                           | CPO ➝ MSP | Beckn expects invoice-ready summary; OCPI CDR contains authoritative billing data. |

## Entity Mapping

### Provider (CPO Identity)

| Beckn Field / Attribute                                                                    | Type      | OCPI Source              | Path / Field                                         | Direction | Notes |
| ------------------------------------------------------------------------------------------ | --------- | ------------------------ | ---------------------------------------------------- | --------- | ----- |
| `beckn:Provider.beckn:id`                                                                  | string    | `/locations`             | `party_id` + `country_code`                          | CPO ➝ MSP | Compose stable provider identifier using OCPI party code tuple. |
| `beckn:Provider.beckn:descriptor.name`                                                     | string    | `/locations`             | `operator.name` or `name`                            | CPO ➝ MSP | Prefer `operator.name`; fall back to Location name. |
| `beckn:Provider.beckn:descriptor.images[]`                                                 | array     | No OCPI equivalent       | -                                                    | CPO ➝ MSP | Populate from branding registry or omit. |
| `beckn:Provider.beckn:categories`                                                          | array     | No OCPI equivalent       | -                                                    | CPO ➝ MSP | Use Beckn taxonomy (e.g., `EV_CHARGING_NETWORK`). |
| `beckn:Provider.beckn:locations[*]`                                                        | array     | `/locations`             | `data[]`                                             | CPO ➝ MSP | Each OCPI Location becomes a Beckn provider location. |
| `Provider.attributes.EvChargingPointOperator.operatorName`                                | string    | `/locations`             | `operator.name`                                      | CPO ➝ MSP | Aligns exactly. |
| `Provider.attributes.EvChargingPointOperator.operatorCode`                                | string    | `/versions`              | `party_id`                                           | CPO ➝ MSP | Useful for roaming clarity. |
| `Provider.attributes.EvChargingPointOperator.identifier`                                  | string    | `/versions` or registry  | `country_code*party_id`                              | CPO ➝ MSP | Compose URN. |
| `Provider.attributes.EvChargingPointOperator.supportEmail/supportPhone`                   | string    | Optional OCPI `operator` | `operator.contact_email/contact_phone`               | CPO ➝ MSP | Present when OCPI exposes contact info. |
| `Provider.attributes.*` (statutory IDs, GST, CIN, MSME)                                    | string    | No OCPI equivalent       | -                                                    | CPO ➝ MSP | BPP maintains these locally; advertise on Beckn only. |

### Location (Site) Mapping

| Beckn Field                                                                                | Type    | OCPI Source       | Path                                                  | Direction | Notes |
| ------------------------------------------------------------------------------------------ | ------- | ----------------- | ----------------------------------------------------- | --------- | ----- |
| `Provider.locations[*].id`                                                                 | string  | `/locations`      | `data[].id`                                           | CPO ➝ MSP | Maintain 1:1 with OCPI Location ID. |
| `Provider.locations[*].descriptor.name`                                                    | string  | `/locations`      | `data[].name`                                         | CPO ➝ MSP | - |
| `Provider.locations[*].gps`                                                                | string  | `/locations`      | `latitude`, `longitude`                               | CPO ➝ MSP | Format `"{lat},{lon}"`. |
| `Provider.locations[*].address`                                                            | object  | `/locations`      | `address`, `city`, `postal_code`, `state`, `country_code` | CPO ➝ MSP | Map to Beckn address fields; convert ISO country. |
| `Provider.locations[*].descriptor.images[]`                                                | array   | `/locations`      | `images[]`                                            | CPO ➝ MSP | Translate OCPI `Image` objects to Beckn media. |
| `Provider.locations[*].geo.fencing`                                                        | object  | No OCPI equivalent | -                                                     | CPO ➝ MSP | Optional; derive from geospatial systems. |
| `Provider.locations[*].time` (opening hours)                                               | array   | `/locations`      | `opening_times`                                       | CPO ➝ MSP | Flatten `regular_hours`, `twenty_four_seven`. |
| `EvChargingService.serviceLocation`                                                        | object  | `/locations`      | `coordinates`, `address`, `parking_type`              | CPO ➝ MSP | Embedded under Item attributes for each connector. |

### Item (Connector / Service) Mapping

| Beckn Item Attribute (`EvChargingService`)                                                 | Type     | OCPI Source        | Path                                                       | Direction | Notes |
| ------------------------------------------------------------------------------------------ | -------- | ------------------ | ---------------------------------------------------------- | --------- | ----- |
| `connectorType`                                                                            | enum     | `/locations`       | `evses[].connectors[].standard`                            | CPO ➝ MSP | Map enumerations (`IEC_62196_T2` ➝ `Type2`) via lookup. |
| `connectorFormat`                                                                          | enum     | `/locations`       | `evses[].connectors[].format`                              | CPO ➝ MSP | Beckn enumerations align with OCPI `SOCKET`/`CABLE`. |
| `connectorId`                                                                              | string   | `/locations`       | `evses[].connectors[].id`                                  | CPO ➝ MSP | Expose for session tying. |
| `powerType`                                                                                | enum     | `/locations`       | `evses[].connectors[].power_type`                          | CPO ➝ MSP | Map `AC_1_PHASE`/`AC_3_PHASE` to Beckn `AC_SINGLE_PHASE` etc. |
| `maxPowerKW`                                                                               | number   | `/locations`       | `max_electric_power` or compute `voltage*amperage/1000`    | CPO ➝ MSP | Use derived value when OCPI omits `max_electric_power`. |
| `minPowerKW`                                                                               | number   | No OCPI equivalent | -                                                          | CPO ➝ MSP | Populate from provider metadata or infer from tariffs. |
| `socketCount`                                                                              | integer  | `/locations`       | count of `evses[].connectors`                              | CPO ➝ MSP | Sum connectors by EVSE. |
| `reservationSupported`                                                                     | boolean  | `/locations`       | `evses[].capabilities[]` contains `RESERVABLE`             | CPO ➝ MSP | Default true if capability present. |
| `stationStatus`                                                                            | enum     | `/locations`       | `evses[].status`                                           | CPO ➝ MSP | Translate OCPI status to Beckn availability states. |
| `chargingSpeed`                                                                            | enum     | derived            | Based on `maxPowerKW` thresholds                           | CPO ➝ MSP | e.g., <7 kW SLOW, 7-22 NORMAL, etc. |
| `amenityFeature[]`                                                                         | array    | `/locations`       | `facilities`, `directions`, `parking_type`                 | CPO ➝ MSP | Flatten textual hints/amenities. |
| `evseId`                                                                                   | string   | `/locations`       | `evses[].evse_id`                                          | CPO ➝ MSP | Provide full EVSE identifier for roaming reconciliation. |
| `serviceLocation`                                                                          | object   | `/locations`       | `coordinates`, `address`                                  | CPO ➝ MSP | Reuses Beckn Location schema populated from OCPI. |
| `ocppId`                                                                                   | string   | No OCPI equivalent | -                                                          | CPO ➝ MSP | Use operator-internal CSMS identifier. |
| `roamingNetwork`                                                                           | string   | `/versions`        | `business_details.party_id` (HUB)                         | CPO ➝ MSP | Optional; set when network aggregator present. |

### Offer & Pricing Mapping

| Beckn Offer Attribute                                                                       | Type    | OCPI Source        | Path / Field                                                     | Direction | Notes |
| ------------------------------------------------------------------------------------------- | ------- | ------------------ | ---------------------------------------------------------------- | --------- | ----- |
| `beckn:Offer.beckn:id`                                                                      | string  | `/tariffs`         | `tariff.id`                                                      | CPO ➝ MSP | Use canonical Tariff ID. |
| `beckn:Offer.beckn:descriptor.name`                                                         | string  | `/tariffs`         | `tariff.alt_text[]` / `tariff.type`                              | CPO ➝ MSP | Provide human-readable tariff name; fallback to `id`. |
| `beckn:Offer.beckn:price`                                                                   | object  | `/tariffs`         | `elements[].price_components[]`                                 | CPO ➝ MSP | Compose base price snapshot; include currency. |
| `EvChargingOffer.tariffModel`                                                               | enum    | `/tariffs`         | `elements[].price_components[].type`                            | CPO ➝ MSP | Map `TIME`, `ENERGY`, `FLAT` to Beckn tariff models. |
| `EvChargingOffer.priceSpecification.components[]`                                           | array   | `/tariffs`         | `elements[].price_components[]`                                 | CPO ➝ MSP | Each component (type, price, vat, step_size). |
| `EvChargingOffer.idleFeePolicy`                                                             | string  | `/tariffs`         | `tariff.elements[].restrictions.max_duration`/`min_duration`     | CPO ➝ MSP | Construct narrative from restrictions; mark “No OCPI equivalent” if absent. |
| `EvChargingOffer.buyerFinderFee`                                                            | object  | No OCPI equivalent | -                                                                | CPO ➝ MSP | Fee negotiated between MSP & BPP; outside OCPI. |
| `Offer.validity`                                                                            | array   | `/tariffs`         | `start_date_time`, `end_date_time`                              | CPO ➝ MSP | Convert to Beckn `TimePeriod`. |
| `Offer.linkedItems`                                                                         | array   | `/locations`       | `evses[].connectors[].tariff_ids[]`                              | CPO ➝ MSP | Map connectors referencing this tariff. |
| Taxes (`Offer.taxes`, `price.vat`)                                                          | object  | `/tariffs`         | `price_components[].vat`                                         | CPO ➝ MSP | Align decimals (OCPI uses percentage). |
| `Offer.redemptions` (voucher codes)                                                         | array   | No OCPI equivalent | -                                                                | MSP ➝ CPO | BAP-provided promotions; BPP validates locally. |

### Fulfillment, Sessions & Order Lifecycle

| Beckn Fulfillment / Order Field                                                             | Type    | OCPI Source       | Path / Field                                                | Direction | Notes |
| ------------------------------------------------------------------------------------------- | ------- | ----------------- | ----------------------------------------------------------- | --------- | ----- |
| `beckn:Fulfillment.beckn:id`                                                                | string  | `/sessions`       | `session.id`                                                | CPO ➝ MSP | Use OCPI session UID (CPO scope). |
| `beckn:Fulfillment.beckn:type` (`Service`)                                                  | string  | n/a               | -                                                           | -         | Static value. |
| `beckn:Fulfillment.authorization.token`                                                     | string  | `/tokens`         | `token.uid`                                                 | MSP ➝ CPO | BAP supplies MSP token for driver/vehicle. |
| `beckn:Fulfillment.agent` / `customer`                                                      | object  | `/sessions`       | `session.auth_method`, `session.auth_id`                    | Bidirectional | Map driver identity; hide PII when not permitted. |
| `beckn:Fulfillment.start.time` / `end.time`                                                 | datetime| `/sessions`       | `session.start_datetime`, `session.end_datetime`            | CPO ➝ MSP | Convert to ISO 8601 with timezone; OCPI uses UTC. |
| `beckn:Fulfillment.instructions`                                                            | string  | `/locations`      | `evses[].directions[]`                                      | CPO ➝ MSP | Provide textual instructions to driver. |
| `beckn:Order.beckn:id`                                                                      | string  | `/sessions`       | `session.id` or composed from `country_code/party_id`       | CPO ➝ MSP | Order ID mirrors Fulfillment ID. |
| `beckn:Order.beckn:state`                                                                   | enum    | `/sessions`       | `session.status`                                            | CPO ➝ MSP | Map OCPI session status to Beckn order state machine (`ACTIVE`, `COMPLETED`, etc.). |
| `beckn:Order.billing.totalPayable`                                                          | amount  | `/cdrs`           | `cdr.total_cost`                                            | CPO ➝ MSP | When session finalizes, use CDR totals. |
| `beckn:Order.billing.breakup[]`                                                             | array   | `/sessions`/`cdrs`| `charging_periods`, `cost`                                  | CPO ➝ MSP | Flatten OCPI charging periods into Beckn line items. |
| `beckn:Order.documents[]` (invoice/receipt)                                                 | array   | `/cdrs`           | `invoice_reference`, `signed_data`                          | CPO ➝ MSP | Provide receipt URIs. |
| `beckn:Order.quote`                                                                         | object  | `/tariffs`        | Snapshot of tariff prior to start                           | CPO ➝ MSP | Use pre-session tariff snapshot; keep for dispute resolution. |
| `beckn:Order.payments[*]`                                                                   | object  | `/sessions`       | `session.total_cost`, `auth_method`                         | MSP ↔ CPO | If MSP charges user directly, treat BPP charges as settlement reference only. |

### Optional / Ancillary OCPI Modules

| Beckn Concern                              | OCPI Module                 | Usage Notes |
| ----------------------------------------- | --------------------------- | ----------- |
| Connector reservation (`init` ➝ `on_select`) | `/commands/RESERVE_NOW`     | Use when Beckn supports pre-hold; return reservation ID in fulfillment metadata. |
| Remote start/stop                          | `/commands/START_SESSION`, `/commands/STOP_SESSION` | Map to Beckn `init`/`cancel` transitions; propagate command responses as `on_init`/`on_cancel`. |
| Smart charging preferences                 | `/chargingprofiles`         | No direct Beckn equivalent yet; mark “No OCPI equivalent” in tables. |
| Meter telemetry during session             | `/sessions.charging_periods`| Provide as part of `on_status` payload or embed in log attachments. |
| Post-charge dispute / rating               | `/cdrs`                     | Use to back Beckn support (`issue`, `support` actions) with authoritative data. |

## Discrepancies & No-Equivalent Fields

- **Buyer finder fees** (`EvChargingOffer.buyerFinderFee`) – OCPI does not model BAP commissions; remains Beckn-only.
- **Marketing media & amenities** (rich descriptors, images, amenity taxonomy) – partial mapping from OCPI `Image` and `facilities`, rest Beckn-managed.
- **Advanced smart-charging settings** (user preference, schedule) – OCPI modules exist but Beckn v2 flow currently lacks hooks; mark as “No OCPI equivalent” or future scope.
- **Regulatory identifiers** for providers (GST, CIN, MSME) – outside OCPI scope, maintain in Beckn attributes.
- **Wallet/payment orchestration** – OCPI leaves MSP billing external; Beckn `Payment` details do not map back to OCPI; treat as MSP-internal.

## Side-by-Side Comparison

| Aspect                    | Beckn v2 EV Charging                                                  | OCPI 2.2.1                                                      | Alignment / Gap |
| ------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------- | --------------- |
| Discovery                 | `search/on_search` over catalog (`Item`, `Offer`, `Location`)         | `/locations` list with EVSEs, connectors, optional `tariffs`    | Beckn enriches OCPI data with marketplaces fields; requires caching for latency. |
| Offer/Pricing             | `Offer` + `EvChargingOffer` (tariff model, fee split, idle policy)    | `/tariffs` with `price_components`, `elements`                  | Core pricing aligns; Beckn adds marketplace commissions & narrative policies. |
| Authorization / Start     | `init/on_init` with `Fulfillment.authorization`, `Payment`            | `/tokens`, `/commands/START_SESSION`                            | Beckn wraps OCPI remote start and token validation; no additional fields needed. |
| Active Session Tracking   | `status/on_status`, `track/on_track` delivering meter/time updates    | `/sessions` (polling) + push via alternative channels           | Beckn expects event callbacks; implement via OCPI session change webhook or polling proxy. |
| Billing / Settlement      | `on_confirm`, `on_status` final updates, `Order.billing`, `logs`      | `/sessions` final state, `/cdrs`                                | Use CDR totals for Beckn billing; additional breakdown for taxes/fees required. |
| Provider Identity         | `Provider` core schema + `EvChargingPointOperator` attributes         | OCPI `party_id`, `operator` object                              | 1:1 for basic info; Beckn adds statutory/regulatory metadata. |
| Optional Capabilities     | Reservations, smart charging, commands via `on_select`, `update`      | `/commands`, `/chargingprofiles`                               | OCPI covers more smart-charging features; Beckn spec needs extensions if required. |

## Open Points & Clarifications

1. **Connector enumeration mapping:** confirm final Beckn enumeration list (e.g., `Type2` vs `IEC_62196_T2`). Current approach assumes deterministic lookup table; please share if alternative naming preferred.
2. **Tariff component aggregation:** Beckn offers expect human-readable price strings. Should marketplace display raw OCPI `price_components` or precompute blended rates (e.g., base + energy + parking)? Guidance will affect Offer table content.
3. **Reservation semantics:** If Beckn v2 intends to support guaranteed slot holds, decide whether to rely solely on OCPI `RESERVE_NOW` (limited support) or introduce Beckn-native reservation entity.
4. **Telemetry granularity:** OCPI sessions can include detailed charging periods + meter values. Should these be surfaced via Beckn `on_status` or stored in logs only?

Once these points are clarified, the mapping can be iterated to refine enumerations and any supplemental schemas.

