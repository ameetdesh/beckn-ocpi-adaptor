## Items

| Fields             | Description                                                                   | Type                  | Source OCPI API | Path                                            | Beckn mapping                                                                |
| ------------------ | ----------------------------------------------------------------------------- | --------------------- | --------------- | ----------------------------------------------- | ---------------------------------------------------------------------------- |
| id                 | Auto-generated ID for the item                                                | Auto Sequence Integer | N/A             |                                                 | Item.id                                                                      |
| name               | A number/string printed on the outside of the EVSE for visual identification. | string                | GET /locations  | data[].evses[].physical_reference               | Item.descriptor.name                                                         |
| evse_uid           | Uniquely identifies the EVSE within the CPOs platform                         | string                | GET /locations  | data[].evses[].uid                              |                                                                              |
| location_id        | ID of the location                                                            | string                | GET /locations  | data[].id                                       | Item.location_ids[0]                                                         |
| connector_id       | Identifier of the Connector within the EVSE.                                  | string                | GET /locations  | data[].evses[].connectors[].id                  | Item.tags[code="connector-specifications"].list[code="connector_id"].value   |
| standard           | The standard of the installed connector.                                      | string                | GET /locations  | data[].evses[].connectors[].standard            | Item.tags[code="connector-specifications"].list[code="connector_type"].value |
| power_type         | Power type of the connector                                                   | string                | GET /locations  | data[0].evses[].connectors[].power_type         | Item.tags[code="connector-specifications"].list[code="power_type"].value     |
| max_voltage        | Max voltage of the connector                                                  | integer               | GET /locations  | data[0].evses[].connectors[].max_voltage        |                                                                              |
| max_amperage       | Max amperage of the connector                                                 | integer               | GET /locations  | data[0].evses[].connectors[].max_amperage       |                                                                              |
| max_electric_power | Max electric power of the connector                                           | integer               | GET /locations  | data[0].evses[].connectors[].max_electric_power |                                                                              |
| status             | Indicates the current status of the EVSE                                      | string                | GET /locations  | data[].evses[].status                           | Item.tags[code="connector-specifications"].list[code="status"].value         |
| tariff_id          | Foreign Key to tariffs.ID                               | string                | GET /locations  | data[].evses[].connectors[].tarriff_ids         | Item.price.id                                                                |

## Locations

| Fields          | Description                                                         | Type    | Source OCPI API | Path                                 | Beckn mapping                                               |
| --------------- | ------------------------------------------------------------------- | ------- | --------------- | ------------------------------------ | ----------------------------------------------------------- |
| id              | ID of the location                                                  | string  | GET /locations  | data[].id                            | Provider.locations[\*].id                                   |
| name            | Name of the location                                                | string  | GET /locations  | data[].name                          | Provider.locations[\*].descriptor.name                      |
| provider_id     | ID of the CPO that 'owns' this Location                             | string  | GET /locations  | data[].party_id                      | Provider.id                           |
| city            | City or town.                                                       | string  | GET /locations  | data[].city                          | Provider.locations[\*].city.name                            |
| state           | State or province of the location                                   | string  | GET /locations  | data[].state                         | Provider.locations[\*].state.name                           |
| country_code    | ISO-3166 alpha-2 country code of the CPO that 'owns' this Location. | string  | GET /locations  | data[].country_code                  | Provider.locations[\*].country.code                         |
| gps_latitude    | GPS coordinates of the location                                     | double  | GET /locations  | data[].coordinates.latitude          | Provider.locations[\*].gps (compose as "lat,long")          |
| gps_longitude   | GPS coordinates of the location                                     | double  | GET /locations  | data[].coordinates.longitude         | Provider.locations[\*].gps (compose as "lat,long")          |
| address_full    | Full address                                                        | string  | GET /locations  | data[].address                       | Provider.locations[\*].address                              |
| provider_name   | Name of the operator                                                | string  | GET /locations  | data[].operator.name                 | Provider.descriptor.name |
| twentyfourseven | Whether the location is operational twenty four seven               | boolean | GET /locations  | data[].opening_times.twentyfourseven |                                                             |

## Tariffs

| Fields          | Description                                                     | Type   | Source OCPI API | Path                            |
| --------------- | --------------------------------------------------------------- | ------ | --------------- | ------------------------------- |
| id              | ID of the tariff                                                | string | GET /tariffs    | data[].id                       |
| start_date_time | The time when this tariff becomes active, in UTC                | string | GET /tariffs    | data[].currency.start_date_time |
| end_date_time   | The time after which this tariff is no longer valid, in UTC     | string | GET /tariffs    | data[].currency.end_date_time   |
| currency        | ISO-4217 code of the currency of this tariff                    | string | GET /tariffs    | data[].currency                 |
| country_code    | ISO-3166 alpha-2 country code of the CPO that owns this Tariff. | string | GET /tariffs    | data[].country_code             |

## Price Components

| Fields           | Description                                           | Type                  | Source OCPI API | Path                                       |
| ---------------- | ----------------------------------------------------- | --------------------- | --------------- | ------------------------------------------ |
| id               | ID of the price component                             | Auto Sequence Integer | N/A             |                                            |
| tariff_id        | Foreign Key to tariffs.ID       | string                | GET /tariffs    | data[].id                                  |
| price            | Price per unit (excl. VAT) for this tariff dimension. | number                | GET /tariffs    | data[].elements[].price_components[].price |
| type             | Type of tariff dimension                              | string                | GET /tariffs    | data[].elements[].price_components[].type  |
| vat              | Applicable VAT percentage for this tariff dimension   | number                | GET /tariffs    | data[].elements[].price_components[].vat   |
