"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandResponse = exports.UnlockConnectorCommand = exports.StopSessionCommand = exports.StartSessionCommand = exports.ReserveNowCommand = void 0;
const zod_1 = require("zod");
const ocpi_tokens_1 = require("./ocpi.tokens");
exports.ReserveNowCommand = zod_1.z.object({
    response_url: zod_1.z.string().url(),
    token: ocpi_tokens_1.Token,
    expiry_date: zod_1.z.date(),
    reservation_id: zod_1.z.number().int(),
    location_id: zod_1.z.string().max(39),
    evse_uid: zod_1.z.string().max(39).nullish(),
});
exports.StartSessionCommand = zod_1.z.object({
    response_url: zod_1.z.string().url(),
    token: ocpi_tokens_1.Token,
    location_id: zod_1.z.string().max(39),
    evse_uid: zod_1.z.string().max(39).nullish(),
});
exports.StopSessionCommand = zod_1.z.object({
    response_url: zod_1.z.string().url(),
    session_id: zod_1.z.string().max(36),
});
exports.UnlockConnectorCommand = zod_1.z.object({
    response_url: zod_1.z.string().url(),
    location_id: zod_1.z.string().max(39),
    evse_uid: zod_1.z.string().max(39),
    connector_id: zod_1.z.string().max(36),
});
const CommandResponseType = zod_1.z.enum([
    "NOT_SUPPORTED",
    "REJECTED",
    "ACCEPTED",
    "TIMEOUT",
    "UNKNOWN_SESSION",
]);
exports.CommandResponse = zod_1.z.object({
    result: CommandResponseType,
});
//# sourceMappingURL=ocpi.commands.js.map