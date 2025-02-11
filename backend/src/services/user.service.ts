import Role from '../models/role';
import User from '../models/user';
import { RoleDTO } from './role.service';
import { toUserDTO, toUsersDTO } from './user.mapper';

export class UserReqDTO {
    id?: number;
    firstName!: string;
    lastName!: string;
    email!: string;
    roleIds!: number[];
    status?: string; // Add status
    personalDetails?: { [key: string]: any };
}

export class UserRespDTO {
    id?: number;
    firstName!: string;
    lastName!: string;
    email!: string;
    roles?: RoleDTO[];
    personalDetails?: { [key: string]: any };
    status?: string; // Add status
}

class UserService {
    async updateUserRoles(userId: number, roleIds: number[]): Promise<UserRespDTO | null> {
        if (roleIds) {
            const user = await User.findByPk(userId);
            if (user) {
                await user.setRoles(roleIds);
            }
            return this.getUserById(userId);
        }
        return null;
    }

    async createUser(user: UserReqDTO): Promise<UserRespDTO | null> {

        const rolesReqs = user.roleIds.map(roleId => Role.findByPk(roleId));
        const roles = (await Promise.all(rolesReqs)).filter(role => !!role);

        // Set default status if not provided
        const userData = {
            ...user,
            status: user.status || 'active',
        };

        return User.create({ ...userData }).then((createdUser) => {
            return createdUser.addRoles(roles).then(() => this.getUserById(createdUser.id));
        });
    }

    async updateUser(user: UserReqDTO): Promise<UserRespDTO | null> {
        if (user.id) {
            await User.update({ ...user }, { where: { id: user.id } });
            return this.getUserById(user.id);
        }
        return null;
    }

    async getAllUsers(): Promise<UserRespDTO[]> {
        return User.findAll({
            include: [
                {
                    model: Role
                }
            ]
        }).then(users => toUsersDTO(users));
    }

    async getUserById(id: number): Promise<UserRespDTO | null> {
        return User.findByPk(id, {
            include: [
                {
                    model: Role
                }
            ]
        }).then(user => user ? toUserDTO(user) : null);
    }
}

const userService = new UserService();

export default userService;