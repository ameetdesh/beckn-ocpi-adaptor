"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_to_json_schema_1 = __importDefault(require("zod-to-json-schema"));
const fs_1 = __importDefault(require("fs"));
const ocpi_location_1 = require("./ocpi.location");
const ocpi_tokens_v22_1 = require("./ocpi.tokens.v22");
const ocpi_tokens_v221_1 = require("./ocpi.tokens.v221");
const ocpi_location_v22_1 = require("./ocpi.location.v22");
const ocpi_location_v221_1 = require("./ocpi.location.v221");
const ocpi_sessions_v22_1 = require("./ocpi.sessions.v22");
const ocpi_sessions_v221_1 = require("./ocpi.sessions.v221");
const ocpi_cdrs_v22_1 = require("./ocpi.cdrs.v22");
const ocpi_cdrs_v221_1 = require("./ocpi.cdrs.v221");
const ocpi_tariff_v22_1 = require("./ocpi.tariff.v22");
const ocpi_tariff_v221_1 = require("./ocpi.tariff.v221");
const ocpi_common_1 = require("./ocpi.common");
const ocpi_session_1 = require("./ocpi.session");
const ocpi_version_1 = require("./ocpi.version");
const ocpi_versions_v22_1 = require("./ocpi.versions.v22");
const ocpi_versions_v221_1 = require("./ocpi.versions.v221");
const ocpi_credentials_1 = require("./ocpi.credentials");
const ocpi_credentials_v22_1 = require("./ocpi.credentials.v22");
const ocpi_credentials_v221_1 = require("./ocpi.credentials.v221");
const ocpi_cdr_1 = require("./ocpi.cdr");
const ocpi_tariff_1 = require("./ocpi.tariff");
const ocpi_tokens_1 = require("./ocpi.tokens");
const ocpi_commands_1 = require("./ocpi.commands");
const ocpi_commands_v22_1 = require("./ocpi.commands.v22");
const ocpi_commands_v221_1 = require("./ocpi.commands.v221");
const ocpi_utils_1 = require("./ocpi.utils");
const ocpi_chargingprofiles_v22_1 = require("./ocpi.chargingprofiles.v22");
const ocpi_chargingprofiles_v221_1 = require("./ocpi.chargingprofiles.v221");
const ocpi_hubclientinfo_v22_1 = require("./ocpi.hubclientinfo.v22");
const ocpi_hubclientinfo_v221_1 = require("./ocpi.hubclientinfo.v221");
const OCPI_SCHEMA_DIR = ".ocpi-schema";
const saveSchema = (schemaName, schema) => {
    if (!fs_1.default.existsSync(OCPI_SCHEMA_DIR)) {
        fs_1.default.mkdirSync(OCPI_SCHEMA_DIR);
    }
    fs_1.default.writeFileSync(`${OCPI_SCHEMA_DIR}/${schemaName}.json`, JSON.stringify((0, zod_to_json_schema_1.default)(schema, schemaName), null, 2));
};
saveSchema("ocpi.2_1_1.empty", ocpi_common_1.OcpiEmpty);
/* Versions */
saveSchema("ocpi.2_1_1.versions", ocpi_version_1.OcpiVersions);
saveSchema("ocpi.2_1_1.versions.response", (0, ocpi_common_1.ocpiSuccessResponse)(ocpi_version_1.OcpiVersions));
/* Version details */
saveSchema("ocpi.2_1_1.version_details", ocpi_version_1.OcpiVersionDetails);
saveSchema("ocpi.2_1_1.version_details.response", (0, ocpi_common_1.ocpiSuccessResponse)(ocpi_version_1.OcpiVersionDetails));
/* Versions 2.2 */
saveSchema("ocpi.2_2.versions", ocpi_versions_v22_1.OcpiVersions);
saveSchema("ocpi.2_2.versions.response", (0, ocpi_common_1.ocpiSuccessResponse)(ocpi_versions_v22_1.OcpiVersions));
/* Version details 2.2 */
saveSchema("ocpi.2.2.version_details", ocpi_versions_v22_1.OcpiVersionDetails);
saveSchema("ocpi.2_2.version_details.response", (0, ocpi_common_1.ocpiSuccessResponse)(ocpi_versions_v22_1.OcpiVersionDetails));
/* Versions 2.2.1 */
saveSchema("ocpi.2_2_1.versions", ocpi_versions_v221_1.OcpiVersions);
saveSchema("ocpi.2_2_1.versions.response", (0, ocpi_common_1.ocpiSuccessResponse)(ocpi_versions_v221_1.OcpiVersions));
/* Version details 2.2.1 */
saveSchema("ocpi.2_2_1.version_details", ocpi_versions_v221_1.OcpiVersionDetails);
saveSchema("ocpi.2_2_1.version_details.response", (0, ocpi_common_1.ocpiSuccessResponse)(ocpi_versions_v221_1.OcpiVersionDetails));
/* Credentials */
saveSchema("ocpi.2_1_1.credentials", ocpi_credentials_1.OcpiCredentials);
saveSchema("ocpi.2_1_1.credentials.response", (0, ocpi_common_1.ocpiSuccessResponse)(ocpi_credentials_1.OcpiCredentials));
/* Credentials 2.2 */
saveSchema("ocpi.2_2.credentials", ocpi_credentials_v22_1.OcpiCredentials);
saveSchema("ocpi.2_2.credentials.response", (0, ocpi_common_1.ocpiSuccessResponse)(ocpi_credentials_v22_1.OcpiCredentials));
/* Credentials 2.2.1 */
saveSchema("ocpi.2_2_1.credentials", ocpi_credentials_v221_1.OcpiCredentials);
saveSchema("ocpi.2_2_1.credentials.response", (0, ocpi_common_1.ocpiSuccessResponse)(ocpi_credentials_v221_1.OcpiCredentials));
/* Locations */
saveSchema("ocpi.2_1_1.locations", ocpi_location_1.Locations);
saveSchema("ocpi.2_1_1.locations.response", (0, ocpi_common_1.ocpiSuccessResponse)(ocpi_location_1.Locations));
saveSchema("ocpi.2_1_1.location", ocpi_location_1.Location);
saveSchema("ocpi.2_1_1.location.partial", (0, ocpi_utils_1.ocpiDeepPartial)(ocpi_location_1.Location));
saveSchema("ocpi.2_1_1.location.response", (0, ocpi_common_1.ocpiSuccessResponse)(ocpi_location_1.Location));
saveSchema("ocpi.2_1_1.evse", ocpi_location_1.Evse);
saveSchema("ocpi.2_1_1.evse.partial", (0, ocpi_utils_1.ocpiDeepPartial)(ocpi_location_1.Evse));
saveSchema("ocpi.2_1_1.evse.response", (0, ocpi_common_1.ocpiSuccessResponse)(ocpi_location_1.Evse));
saveSchema("ocpi.2_1_1.connector", ocpi_location_1.Connector);
saveSchema("ocpi.2_1_1.connector.partial", (0, ocpi_utils_1.ocpiDeepPartial)(ocpi_location_1.Connector));
saveSchema("ocpi.2_1_1.connector.response", (0, ocpi_common_1.ocpiSuccessResponse)(ocpi_location_1.Connector));
/* Locations 2.2 */
saveSchema("ocpi.2_2.locations", ocpi_location_v22_1.Locations);
saveSchema("ocpi.2_2.locations.response", (0, ocpi_common_1.ocpiSuccessResponse)(ocpi_location_v22_1.Locations));
saveSchema("ocpi.2_2.location", ocpi_location_v22_1.Location);
saveSchema("ocpi.2_2.location.partial", (0, ocpi_utils_1.ocpiDeepPartial)(ocpi_location_v22_1.Location));
saveSchema("ocpi.2_2.location.response", (0, ocpi_common_1.ocpiSuccessResponse)(ocpi_location_v22_1.Location));
saveSchema("ocpi.2_2.evse", ocpi_location_v22_1.Evse);
saveSchema("ocpi.2_2.evse.partial", (0, ocpi_utils_1.ocpiDeepPartial)(ocpi_location_v22_1.Evse));
saveSchema("ocpi.2_2.evse.response", (0, ocpi_common_1.ocpiSuccessResponse)(ocpi_location_v22_1.Evse));
saveSchema("ocpi.2_2.connector", ocpi_location_v22_1.Connector);
saveSchema("ocpi.2_2.connector.partial", (0, ocpi_utils_1.ocpiDeepPartial)(ocpi_location_v22_1.Connector));
saveSchema("ocpi.2_2.connector.response", (0, ocpi_common_1.ocpiSuccessResponse)(ocpi_location_v22_1.Connector));
/* Locations 2.2.1 */
saveSchema("ocpi.2_2_1.locations", ocpi_location_v221_1.Locations);
saveSchema("ocpi.2_2_1.locations.response", (0, ocpi_common_1.ocpiSuccessResponse)(ocpi_location_v221_1.Locations));
saveSchema("ocpi.2_2_1.location", ocpi_location_v221_1.Location);
saveSchema("ocpi.2_2_1.location.partial", (0, ocpi_utils_1.ocpiDeepPartial)(ocpi_location_v221_1.Location));
saveSchema("ocpi.2_2_1.location.response", (0, ocpi_common_1.ocpiSuccessResponse)(ocpi_location_v221_1.Location));
saveSchema("ocpi.2_2_1.evse", ocpi_location_v221_1.Evse);
saveSchema("ocpi.2_2_1.evse.partial", (0, ocpi_utils_1.ocpiDeepPartial)(ocpi_location_v221_1.Evse));
saveSchema("ocpi.2_2_1.evse.response", (0, ocpi_common_1.ocpiSuccessResponse)(ocpi_location_v221_1.Evse));
saveSchema("ocpi.2_2_1.connector", ocpi_location_v221_1.Connector);
saveSchema("ocpi.2_2_1.connector.partial", (0, ocpi_utils_1.ocpiDeepPartial)(ocpi_location_v221_1.Connector));
saveSchema("ocpi.2_2_1.connector.response", (0, ocpi_common_1.ocpiSuccessResponse)(ocpi_location_v221_1.Connector));
/* Sessions */
saveSchema("ocpi.2_1_1.sessions", ocpi_session_1.Sessions);
saveSchema("ocpi.2_1_1.sessions.response", (0, ocpi_common_1.ocpiSuccessResponse)(ocpi_session_1.Sessions));
saveSchema("ocpi.2_1_1.session", ocpi_session_1.Session);
saveSchema("ocpi.2_1_1.session.partial", (0, ocpi_utils_1.ocpiDeepPartial)(ocpi_session_1.Session));
saveSchema("ocpi.2_1_1.session.response", (0, ocpi_common_1.ocpiSuccessResponse)(ocpi_session_1.Session));
/* Sessions 2.2 */
saveSchema("ocpi.2_2.sessions", ocpi_sessions_v22_1.Sessions);
saveSchema("ocpi.2_2.sessions.response", (0, ocpi_common_1.ocpiSuccessResponse)(ocpi_sessions_v22_1.Sessions));
saveSchema("ocpi.2_2.session", ocpi_sessions_v22_1.Session);
saveSchema("ocpi.2_2.session.partial", (0, ocpi_utils_1.ocpiDeepPartial)(ocpi_sessions_v22_1.Session));
saveSchema("ocpi.2_2.session.response", (0, ocpi_common_1.ocpiSuccessResponse)(ocpi_sessions_v22_1.Session));
/* Sessions 2.2.1 */
saveSchema("ocpi.2_2_1.sessions", ocpi_sessions_v221_1.Sessions);
saveSchema("ocpi.2_2_1.sessions.response", (0, ocpi_common_1.ocpiSuccessResponse)(ocpi_sessions_v221_1.Sessions));
saveSchema("ocpi.2_2_1.session", ocpi_sessions_v221_1.Session);
saveSchema("ocpi.2_2_1.session.partial", (0, ocpi_utils_1.ocpiDeepPartial)(ocpi_sessions_v221_1.Session));
saveSchema("ocpi.2_2_1.session.response", (0, ocpi_common_1.ocpiSuccessResponse)(ocpi_sessions_v221_1.Session));
/* CDRs */
saveSchema("ocpi.2_1_1.cdrs", ocpi_cdr_1.Cdrs);
saveSchema("ocpi.2_1_1.cdrs.response", (0, ocpi_common_1.ocpiSuccessResponse)(ocpi_cdr_1.Cdrs));
saveSchema("ocpi.2_1_1.cdr", ocpi_cdr_1.Cdr);
saveSchema("ocpi.2_1_1.cdr.partial", (0, ocpi_utils_1.ocpiDeepPartial)(ocpi_cdr_1.Cdr));
saveSchema("ocpi.2_1_1.cdr.response", (0, ocpi_common_1.ocpiSuccessResponse)(ocpi_cdr_1.Cdr));
/* CDRs 2.2 */
saveSchema("ocpi.2_2.cdrs", ocpi_cdrs_v22_1.Cdrs);
saveSchema("ocpi.2_2.cdrs.response", (0, ocpi_common_1.ocpiSuccessResponse)(ocpi_cdrs_v22_1.Cdrs));
saveSchema("ocpi.2_2.cdr", ocpi_cdrs_v22_1.Cdr);
saveSchema("ocpi.2_2.cdr.partial", (0, ocpi_utils_1.ocpiDeepPartial)(ocpi_cdrs_v22_1.Cdr));
saveSchema("ocpi.2_2.cdr.response", (0, ocpi_common_1.ocpiSuccessResponse)(ocpi_cdrs_v22_1.Cdr));
/* CDRs 2.2.1 */
saveSchema("ocpi.2_2_1.cdrs", ocpi_cdrs_v221_1.Cdrs);
saveSchema("ocpi.2_2_1.cdrs.response", (0, ocpi_common_1.ocpiSuccessResponse)(ocpi_cdrs_v221_1.Cdrs));
saveSchema("ocpi.2_2_1.cdr", ocpi_cdrs_v221_1.Cdr);
saveSchema("ocpi.2_2_1.cdr.partial", (0, ocpi_utils_1.ocpiDeepPartial)(ocpi_cdrs_v221_1.Cdr));
saveSchema("ocpi.2_2_1.cdr.response", (0, ocpi_common_1.ocpiSuccessResponse)(ocpi_cdrs_v221_1.Cdr));
/* Charging Profiles 2.2 */
saveSchema("ocpi.2_2.chargingprofiles", ocpi_chargingprofiles_v22_1.SetChargingProfile);
saveSchema("ocpi.2_2.chargingprofiles.active", ocpi_chargingprofiles_v22_1.ActiveChargingProfile);
saveSchema("ocpi.2_2.chargingprofiles.response", (0, ocpi_common_1.ocpiSuccessResponse)(ocpi_chargingprofiles_v22_1.ChargingProfileResponse));
saveSchema("ocpi.2_2.chargingprofiles.active_charging_profile.result", ocpi_chargingprofiles_v22_1.ActiveChargingProfileResult);
saveSchema("ocpi.2_2.chargingprofiles.charging_profile.result", ocpi_chargingprofiles_v22_1.ChargingProfileResult);
saveSchema("ocpi.2_2.chargingprofiles.clear_profile.result", ocpi_chargingprofiles_v22_1.ClearProfileResult);
/* Charging Profiles 2.2.1 */
saveSchema("ocpi.2_2_1.chargingprofiles", ocpi_chargingprofiles_v221_1.SetChargingProfile);
saveSchema("ocpi.2_2_1.chargingprofiles.active", ocpi_chargingprofiles_v221_1.ActiveChargingProfile);
saveSchema("ocpi.2_2_1.chargingprofiles.response", (0, ocpi_common_1.ocpiSuccessResponse)(ocpi_chargingprofiles_v221_1.ChargingProfileResponse));
saveSchema("ocpi.2_2_1.chargingprofiles.active_charging_profile.result", ocpi_chargingprofiles_v221_1.ActiveChargingProfileResult);
saveSchema("ocpi.2_2_1.chargingprofiles.charging_profile.result", ocpi_chargingprofiles_v221_1.ChargingProfileResult);
saveSchema("ocpi.2_2_1.chargingprofiles.clear_profile.result", ocpi_chargingprofiles_v221_1.ClearProfileResult);
/* Hub Client Info 2.2 */
saveSchema("ocpi.2_2.hubclientinfo", ocpi_hubclientinfo_v22_1.ClientInfo);
saveSchema("ocpi.2_2.hubclientinfo.response", (0, ocpi_common_1.ocpiSuccessResponse)(ocpi_hubclientinfo_v22_1.ClientInfo));
saveSchema("ocpi.2_2.hubclientinfos", (0, ocpi_common_1.ocpiSuccessResponse)(ocpi_hubclientinfo_v22_1.ClientInfos));
/* Hub Client Info 2.2.1 */
saveSchema("ocpi.2_2_1.hubclientinfo", ocpi_hubclientinfo_v221_1.ClientInfo);
saveSchema("ocpi.2_2_1.hubclientinfo.response", (0, ocpi_common_1.ocpiSuccessResponse)(ocpi_hubclientinfo_v221_1.ClientInfo));
saveSchema("ocpi.2_2_1.hubclientinfos", (0, ocpi_common_1.ocpiSuccessResponse)(ocpi_hubclientinfo_v221_1.ClientInfos));
/* Tariffs */
saveSchema("ocpi.2_1_1.tariffs", ocpi_tariff_1.Tariffs);
saveSchema("ocpi.2_1_1.tariffs.response", (0, ocpi_common_1.ocpiSuccessResponse)(ocpi_tariff_1.Tariffs));
saveSchema("ocpi.2_1_1.tariff", ocpi_tariff_1.Tariff);
saveSchema("ocpi.2_1_1.tariff.partial", (0, ocpi_utils_1.ocpiDeepPartial)(ocpi_tariff_1.Tariff));
saveSchema("ocpi.2_1_1.tariff.response", (0, ocpi_common_1.ocpiSuccessResponse)(ocpi_tariff_1.Tariff));
/* Tariffs 2.2 */
saveSchema("ocpi.2_2.tariffs", ocpi_tariff_v22_1.Tariffs);
saveSchema("ocpi.2_2.tariffs.response", (0, ocpi_common_1.ocpiSuccessResponse)(ocpi_tariff_v22_1.Tariffs));
saveSchema("ocpi.2_2.tariff", ocpi_tariff_v22_1.Tariff);
saveSchema("ocpi.2_2.tariff.partial", (0, ocpi_utils_1.ocpiDeepPartial)(ocpi_tariff_v22_1.Tariff));
saveSchema("ocpi.2_2.tariff.response", (0, ocpi_common_1.ocpiSuccessResponse)(ocpi_tariff_v22_1.Tariff));
/* Tariffs 2.2.1 */
saveSchema("ocpi.2_2_1.tariffs", ocpi_tariff_v221_1.Tariffs);
saveSchema("ocpi.2_2_1.tariffs.response", (0, ocpi_common_1.ocpiSuccessResponse)(ocpi_tariff_v221_1.Tariffs));
saveSchema("ocpi.2_2_1.tariff", ocpi_tariff_v221_1.Tariff);
saveSchema("ocpi.2_2_1.tariff.partial", (0, ocpi_utils_1.ocpiDeepPartial)(ocpi_tariff_v221_1.Tariff));
saveSchema("ocpi.2_2_1.tariff.response", (0, ocpi_common_1.ocpiSuccessResponse)(ocpi_tariff_v221_1.Tariff));
/* Tokens */
saveSchema("ocpi.2_1_1.tokens", ocpi_tokens_1.Tokens);
saveSchema("ocpi.2_1_1.tokens.response", (0, ocpi_common_1.ocpiSuccessResponse)(ocpi_tokens_1.Tokens));
saveSchema("ocpi.2_1_1.token", ocpi_tokens_1.Token);
saveSchema("ocpi.2_1_1.token.partial", (0, ocpi_utils_1.ocpiDeepPartial)(ocpi_tokens_1.Token));
saveSchema("ocpi.2_1_1.token.response", (0, ocpi_common_1.ocpiSuccessResponse)(ocpi_tokens_1.Token));
/* Tokens 2.2 */
saveSchema("ocpi.2_2.tokens", ocpi_tokens_v22_1.Tokens);
saveSchema("ocpi.2_2.tokens.response", (0, ocpi_common_1.ocpiSuccessResponse)(ocpi_tokens_v22_1.Tokens));
saveSchema("ocpi.2_2.token", ocpi_tokens_v22_1.Token);
saveSchema("ocpi.2_2.token.partial", (0, ocpi_utils_1.ocpiDeepPartial)(ocpi_tokens_v22_1.Token));
saveSchema("ocpi.2_2.token.response", (0, ocpi_common_1.ocpiSuccessResponse)(ocpi_tokens_v22_1.Token));
/* Tokens 2.2 */
saveSchema("ocpi.2_2_1.tokens", ocpi_tokens_v221_1.Tokens);
saveSchema("ocpi.2_2_1.tokens.response", (0, ocpi_common_1.ocpiSuccessResponse)(ocpi_tokens_v221_1.Tokens));
saveSchema("ocpi.2_2_1.token", ocpi_tokens_v221_1.Token);
saveSchema("ocpi.2_2_1.token.partial", (0, ocpi_utils_1.ocpiDeepPartial)(ocpi_tokens_v221_1.Token));
saveSchema("ocpi.2_2_1.token.response", (0, ocpi_common_1.ocpiSuccessResponse)(ocpi_tokens_v221_1.Token));
/* Commands */
saveSchema("ocpi.2_1_1.commands.reserve_now.request", ocpi_commands_1.ReserveNowCommand);
saveSchema("ocpi.2_1_1.commands.start_session.request", ocpi_commands_1.StartSessionCommand);
saveSchema("ocpi.2_1_1.commands.stop_session.request", ocpi_commands_1.StopSessionCommand);
saveSchema("ocpi.2_1_1.commands.unlock_connector.request", ocpi_commands_1.UnlockConnectorCommand);
saveSchema("ocpi.2_1_1.commands.response", (0, ocpi_common_1.ocpiSuccessResponse)(ocpi_commands_1.CommandResponse));
/* Commands 2.2*/
saveSchema("ocpi.2_2.commands.reserve_now.request", ocpi_commands_v22_1.ReserveNowCommand);
saveSchema("ocpi.2_2.commands.cancel_reservation.request", ocpi_commands_v22_1.CancelReservationCommand);
saveSchema("ocpi.2_2.commands.start_session.request", ocpi_commands_v22_1.StartSessionCommand);
saveSchema("ocpi.2_2.commands.stop_session.request", ocpi_commands_v22_1.StopSessionCommand);
saveSchema("ocpi.2_2.commands.unlock_connector.request", ocpi_commands_v22_1.UnlockConnectorCommand);
saveSchema("ocpi.2_2.commands.response", (0, ocpi_common_1.ocpiSuccessResponse)(ocpi_commands_v22_1.CommandResponse));
saveSchema("ocpi.2_2.commands.result", ocpi_commands_v22_1.CommandResult);
/* Commands 2.2.1 */
saveSchema("ocpi.2_2_1.commands.reserve_now.request", ocpi_commands_v221_1.ReserveNowCommand);
saveSchema("ocpi.2_2_1.commands.cancel_reservation.request", ocpi_commands_v221_1.CancelReservationCommand);
saveSchema("ocpi.2_2_1.commands.start_session.request", ocpi_commands_v221_1.StartSessionCommand);
saveSchema("ocpi.2_2_1.commands.stop_session.request", ocpi_commands_v221_1.StopSessionCommand);
saveSchema("ocpi.2_2_1.commands.unlock_connector.request", ocpi_commands_v221_1.UnlockConnectorCommand);
saveSchema("ocpi.2_2_1.commands.response", (0, ocpi_common_1.ocpiSuccessResponse)(ocpi_commands_v221_1.CommandResponse));
saveSchema("ocpi.2_2_1.commands.result", ocpi_commands_v221_1.CommandResult);
/* Errors */
saveSchema("ocpi.error", ocpi_common_1.OcpiErrorResponse);
//# sourceMappingURL=ocpi.generate.js.map