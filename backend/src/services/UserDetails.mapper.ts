import { plainToInstance } from 'class-transformer';
import User from '../models/user';
import { toRolesDTO } from './role.mapper';

import { toEntitiesDTO } from './entity.mapper';
import { UserDetailsDTO } from './UserDetails.service';

export function toUserDetailsDTO(user: User): UserDetailsDTO {

    const roles = user.dataValues.roles;
    const entities = user.dataValues.entities;
    delete user.dataValues.roles;
    delete user.dataValues.entities;
    const userDto = plainToInstance(UserDetailsDTO, user.dataValues);
    if (roles) {
        userDto.roles = toRolesDTO(roles);
    }
    if (entities) {
        userDto.entities = toEntitiesDTO(entities);
    }
    userDto.status = user.status; // Map status
    return userDto;
}