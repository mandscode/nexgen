import { plainToInstance } from 'class-transformer';
import Role from '../models/role';
import { RoleDTO } from './role.service';

export function toRoleDTO(role: Role): RoleDTO {
    return plainToInstance(RoleDTO, role.dataValues);
}

export function toRolesDTO(roles: Role[]): RoleDTO[] {
    return roles.map(role => plainToInstance(RoleDTO, role.dataValues))
}