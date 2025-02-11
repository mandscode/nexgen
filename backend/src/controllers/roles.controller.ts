import { Get, Route, Post, Body, Path, Delete, Put } from 'tsoa';
import roleService, { RoleDTO } from '../services/role.service';

@Route('roles')
export class RoleController {

    @Get('/')
    public async getAllRoles(): Promise<RoleDTO[]> {
        return roleService.getAllRoles();
    }

    @Get('{id}')
    public async getRoleById(@Path() id: number): Promise<RoleDTO | null> {
        return roleService.getRoleId(id);
    }

    @Post('/')
    public async createRole(@Body() role: RoleDTO): Promise<RoleDTO> {
        return roleService.createRole(role);
    }

    @Delete('{id}')
    public async deleteRole(@Path() id: number): Promise<{ message: string }> {
        const isDeleted = await roleService.deleteRole(id);
        if (isDeleted) {
            return { message: 'Role deleted successfully' };
        } else {
            throw new Error('Role not found');
        }
    }

    @Put('{id}')
    public async updateRoleName(@Path() id: number, @Body() roleData: { name: string }): Promise<RoleDTO | null> {
        const updatedRole = roleService.updateRoleName(id, roleData.name);

        if (updatedRole) {
            return updatedRole;
        } else {
            throw new Error('Role not found or update failed');
        }
    }
}