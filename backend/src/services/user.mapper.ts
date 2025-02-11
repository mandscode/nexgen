import { plainToInstance } from 'class-transformer';
import User from '../models/user';
import { UserRespDTO } from './user.service';
import { toRolesDTO } from './role.mapper';

export function toUserDTO(user: User): UserRespDTO {

    const roles = user.dataValues.roles;
    delete user.dataValues.roles;
    const userDto = plainToInstance(UserRespDTO, user.dataValues);
    if (roles) {
        userDto.roles = toRolesDTO(roles);
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