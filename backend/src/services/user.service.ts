import Entity from '../models/entity';
import Role from '../models/role';
import User from '../models/user';
import { EntityDTO } from './entity.service';
import { RoleDTO } from './role.service';
import { toUserDTO, toUsersDTO } from './user.mapper';

import bcrypt from 'bcrypt';

export class UserReqDTO {
    id?: number;
    firstName!: string;
    lastName!: string;
    email!: string;
    password?:string;
    roleIds!: number[];
    entityIds?: number[];
    isMasterAdmin!:boolean;
    isFirstLogin!:boolean;
    status?: string; // Add status
    personalDetails?: { [key: string]: any };
}

export class UserRespDTO {
    id?: number;
    firstName!: string;
    lastName!: string;
    email!: string;
    roles?: RoleDTO[];
    isMasterAdmin!:boolean;
    personalDetails?: { [key: string]: any };
    status?: string; // Add status
    entities?:any[];
    isFirstLogin!:boolean;
}

const SALT_ROUNDS = 10;

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
        
        // 🔍 Check if user already exists
        const existingUser = await User.findOne({ where: { email: user.email } });
        if (existingUser) {
            throw new Error("User with this email already exists.");
        }
        const rolesReqs = user.roleIds.map(roleId => Role.findByPk(roleId));

        const roles = (await Promise.all(rolesReqs)).filter(role => !!role);
        // Set default status if not provided
        const userData = {
            ...user,
            status: user.status || 'active',
            entityIds: user.entityIds || []
        };

        return User.create({ ...userData }).then((createdUser) => {
            return createdUser.addRoles(roles).then(() => this.getUserById(createdUser.id));
        });
    }

    async createUserUsingPassword(user: UserReqDTO): Promise<UserRespDTO | null> {
        if (!user.password) {
            throw new Error("Password is required to create a user.");
        }
    
        const existingUser = await User.findOne({ where: { email: user.email } });
        if (existingUser) {
            throw new Error("User with this email already exists.");
        }
    
        const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
    
        const userData = {
            ...user,
            password: hashedPassword,
            status: user.status || 'active',
        };
    
        const createdUser = await User.create(userData);
    
    
        if (user.roleIds && user.roleIds.length > 0) {
            const roles = await Role.findAll({ where: { id: user.roleIds } });
    
            if (roles.length > 0) {
                await createdUser.$set('roles', roles);
                console.log("Roles assigned successfully.");
            } else {
                console.warn("No valid roles found for the provided IDs.");
            }
        }
    
        if (user.entityIds && user.entityIds.length > 0) {
            const entities = await Entity.findAll({ where: { id: user.entityIds } });
    
            if (entities.length > 0) {
                await createdUser.$set('entities', entities);
                console.log("Entities assigned successfully.");
            } else {
                console.warn("No valid entities found for the provided IDs.");
            }
        }
    
        return this.getUserById(createdUser.id);
    }
    
    async changePassword(userId: number, oldPassword: string, newPassword: string, isFirstLogin:boolean): Promise<void> {
        // Find the user by ID
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error("User not found.");
        }

        // Validate the old password
        const isPasswordValid = await this.validatePassword(userId, oldPassword);
        if (!isPasswordValid) {
            throw new Error("Old password is incorrect.");
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

        // Update the user's password
        user.password = hashedPassword;
        user.isFirstLogin = isFirstLogin;
        await user.save();
    }

    async updateUser(user: UserReqDTO): Promise<UserRespDTO | null> {
        if (user.id) {
            // Hash password if it's being updated
            if (user.password) {
                const saltRounds = 10;
                user.password = await bcrypt.hash(user.password, saltRounds);
            }

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
        return await User.findByPk(id, {
            include: [
                { model: Role, attributes: ['id', 'name'] },  // Exclude circular `users` relation
                { model: Entity, attributes: ['id', 'name'] }
            ],
            attributes: { exclude: ['password'] },  // Prevent sensitive data
        }).then(user => user ? toUserDTO(user) : null);
    }
    
    async validatePassword(userId: number, password: string): Promise<boolean> {
        const user = await User.findByPk(userId);
        if (!user || !user.password) {
            throw new Error('User not found');
        }
        return bcrypt.compare(password, user.password);
    }
    
    async findUserByEmail(email: string): Promise<UserRespDTO | null> {
        
        return User.findOne({ where: { email } }).then(user => user ? toUserDTO(user) : null);
    }
}

const userService = new UserService();

export default userService;