"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toGoogleLoginDTO = toGoogleLoginDTO;
const class_transformer_1 = require("class-transformer");
const auth_service_1 = require("./auth.service");
function toGoogleLoginDTO(user) {
    return (0, class_transformer_1.plainToInstance)(auth_service_1.GoogleLoginRespDTO, {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        picture: user.picture,
    });
}
