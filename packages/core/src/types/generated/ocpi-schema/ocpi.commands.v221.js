"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandResult = exports.CommandResponse = exports.UnlockConnectorCommand = exports.StopSessionCommand = exports.StartSessionCommand = exports.CancelReservationCommand = exports.ReserveNowCommand = void 0;
const zod_1 = require("zod");
const ocpi_common_v221_1 = require("./ocpi.common.v221");
const ocpi_tokens_v221_1 = require("./ocpi.tokens.v221");
exports.ReserveNowCommand = zod_1.z.object({
    response_url: zod_1.z.string().url(),
    token: ocpi_tokens_v221_1.Token,
    expiry_date: zod_1.z.date(),
    reservation_id: zod_1.z.string().max(36),
    location_id: zod_1.z.string().max(36),
    evse_uid: zod_1.z.string().max(36).nullish(),
    authorization_reference: zod_1.z.string().max(36).nullish(),
});
exports.CancelReservationCommand = zod_1.z.object({
    response_url: zod_1.z.string().url(),
    reservation_id: zod_1.z.string().max(36),
});
exports.StartSessionCommand = zod_1.z.object({
    response_url: zod_1.z.string().url(),
    token: ocpi_tokens_v221_1.Token,
    location_id: zod_1.z.string().max(36),
    evse_uid: zod_1.z.string().max(36).nullish(),
    connector_id: zod_1.z.string().max(36).nullish(),
    authorization_reference: zod_1.z.string().max(36).nullish(),
});
exports.StopSessionCommand = zod_1.z.object({
    response_url: zod_1.z.string().url(),
    session_id: zod_1.z.string().max(36),
});
exports.UnlockConnectorCommand = zod_1.z.object({
    response_url: zod_1.z.string().url(),
    location_id: zod_1.z.string().max(36),
    evse_uid: zod_1.z.string().max(36),
    connector_id: zod_1.z.string().max(36),
});
const CommandResponseType = zod_1.z.enum([
    "NOT_SUPPORTED",
    "REJECTED",
    "ACCEPTED",
    "UNKNOWN_SESSION",
]);
exports.CommandResponse = zod_1.z.object({
    result: CommandResponseType,
    timeout: zod_1.z.number().int().nonnegative(),
    message: zod_1.z.array(ocpi_common_v221_1.DisplayText).nullish(),
});
const CommandResultType = zod_1.z.enum([
    "ACCEPTED",
    "CANCELED_RESERVATION",
    "EVSE_OCCUPIED",
    "EVSE_INOPERATIVE",
    "FAILED",
    "NOT_SUPPORTED",
    "REJECTED",
    "TIMEOUT",
    "UNKNOWN_RESERVATION",
]);
exports.CommandResult = zod_1.z.object({
    result: CommandResultType,
    message: zod_1.z.array(ocpi_common_v221_1.DisplayText).nullish(),
});
const CommandType = zod_1.z.enum([
    "CANCEL_RESERVATION",
    "RESERVE_NOW",
    "START_SESSION",
    "STOP_SESSION",
    "UNLOCK_CONNECTOR"
]);
//# sourceMappingURL=ocpi.commands.v221.js.map