import Role from '../models/role';
import { toRoleDTO, toRolesDTO } from './role.mapper';

export class RoleDTO {
    id?: number;
    name!: string;
}

class RoleService {
    async createRole(role: RoleDTO): Promise<RoleDTO> {
        return Role.create(role).then(role => toRoleDTO(role));
    }

    async getAllRoles(): Promise<RoleDTO[]> {
        return Role.findAll().then(roles => toRolesDTO(roles));
    }

    async getRoleId(id: number): Promise<RoleDTO | null> {
        return Role.findByPk(id).then(role => role ? toRoleDTO(role) : null);
    }

    async deleteRole(id: number): Promise<boolean> {
        const role = await Role.findByPk(id);
        if (role) {
            await role.destroy();  // Deletes the role
            return true;
        }
        return false;
    }

    async updateRoleName(id: number, newName: string): Promise<RoleDTO | null> {
        const role = await Role.findByPk(id);

        if (role) {
            role.name = newName;
            await role.save();
            return toRoleDTO(role);
        }
        return null;
    }
}

const roleService = new RoleService();

export default roleService;