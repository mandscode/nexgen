"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserDTO = toUserDTO;
exports.toUsersDTO = toUsersDTO;
const class_transformer_1 = require("class-transformer");
const user_service_1 = require("./user.service");
const role_mapper_1 = require("./role.mapper");
function toUserDTO(user) {
    const roles = user.dataValues.roles;
    const entities = user.dataValues.entities;
    delete user.dataValues.roles;
    delete user.dataValues.entities;
    const userDto = (0, class_transformer_1.plainToInstance)(user_service_1.UserRespDTO, user.dataValues);
    if (roles) {
        userDto.roles = (0, role_mapper_1.toRolesDTO)(roles);
    }
    if (entities) {
        userDto.entities = (0, role_mapper_1.toRolesDTO)(entities);
    }
    userDto.status = user.status; // Map status
    return userDto;
}
function toUsersDTO(users) {
    return users.map(user => {
        return toUserDTO(user);
    });
}
