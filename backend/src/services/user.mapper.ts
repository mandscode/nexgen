import { plainToInstance } from 'class-transformer';
import User from '../models/user';
import { UserRespDTO } from './user.service';
import { toRolesDTO } from './role.mapper';
import { toEntitiesDTO } from './entity.mapper';

export function toUserDTO(user: User): UserRespDTO {

    const roles = user.dataValues.roles;
    const entities = user.dataValues.entities;
    delete user.dataValues.roles;
    delete user.dataValues.entities;
    const userDto = plainToInstance(UserRespDTO, user.dataValues);
    
    if (roles) {
        userDto.roles = toRolesDTO(roles);
    }
    if (entities) {
        userDto.entities = toEntitiesDTO(entities);
    }
    userDto.status = user.status; // Map status
    return userDto;
}

export function toUsersDTO(users: User[]): UserRespDTO[] {
    return users.map(user => {
        return toUserDTO(user);
    }
    )
}