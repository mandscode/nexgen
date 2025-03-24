"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserDetailsDTO = toUserDetailsDTO;
const class_transformer_1 = require("class-transformer");
const role_mapper_1 = require("./role.mapper");
const entity_mapper_1 = require("./entity.mapper");
const UserDetails_service_1 = require("./UserDetails.service");
function toUserDetailsDTO(user) {
    const roles = user.dataValues.roles;
    const entities = user.dataValues.entities;
    delete user.dataValues.roles;
    delete user.dataValues.entities;
    const userDto = (0, class_transformer_1.plainToInstance)(UserDetails_service_1.UserDetailsDTO, user.dataValues);
    if (roles) {
        userDto.roles = (0, role_mapper_1.toRolesDTO)(roles);
    }
    if (entities) {
        userDto.entities = (0, entity_mapper_1.toEntitiesDTO)(entities);
    }
    userDto.status = user.status; // Map status
    return userDto;
}
