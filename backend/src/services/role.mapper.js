"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toRoleDTO = toRoleDTO;
exports.toRolesDTO = toRolesDTO;
const class_transformer_1 = require("class-transformer");
const role_service_1 = require("./role.service");
function toRoleDTO(role) {
    return (0, class_transformer_1.plainToInstance)(role_service_1.RoleDTO, role.dataValues);
}
function toRolesDTO(roles) {
    return roles.map(role => (0, class_transformer_1.plainToInstance)(role_service_1.RoleDTO, role.dataValues));
}
