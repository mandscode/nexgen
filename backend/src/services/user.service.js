"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRespDTO = exports.UserReqDTO = void 0;
const entity_1 = __importDefault(require("../models/entity"));
const role_1 = __importDefault(require("../models/role"));
const user_1 = __importDefault(require("../models/user"));
const user_mapper_1 = require("./user.mapper");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserReqDTO {
}
exports.UserReqDTO = UserReqDTO;
class UserRespDTO {
}
exports.UserRespDTO = UserRespDTO;
const SALT_ROUNDS = 10;
class UserService {
    updateUserRoles(userId, roleIds) {
        return __awaiter(this, void 0, void 0, function* () {
            if (roleIds) {
                const user = yield user_1.default.findByPk(userId);
                if (user) {
                    yield user.setRoles(roleIds);
                }
                return this.getUserById(userId);
            }
            return null;
        });
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            // 🔍 Check if user already exists
            const existingUser = yield user_1.default.findOne({ where: { email: user.email } });
            if (existingUser) {
                throw new Error("User with this email already exists.");
            }
            const rolesReqs = user.roleIds.map(roleId => role_1.default.findByPk(roleId));
            const roles = (yield Promise.all(rolesReqs)).filter(role => !!role);
            // Set default status if not provided
            const userData = Object.assign(Object.assign({}, user), { status: user.status || 'active', entityIds: user.entityIds || [] });
            return user_1.default.create(Object.assign({}, userData)).then((createdUser) => {
                return createdUser.addRoles(roles).then(() => this.getUserById(createdUser.id));
            });
        });
    }
    createUserUsingPassword(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!user.password) {
                throw new Error("Password is required to create a user.");
            }
            const existingUser = yield user_1.default.findOne({ where: { email: user.email } });
            if (existingUser) {
                throw new Error("User with this email already exists.");
            }
            const hashedPassword = yield bcrypt_1.default.hash(user.password, SALT_ROUNDS);
            const userData = Object.assign(Object.assign({}, user), { password: hashedPassword, status: user.status || 'active' });
            const createdUser = yield user_1.default.create(userData);
            if (user.roleIds && user.roleIds.length > 0) {
                const roles = yield role_1.default.findAll({ where: { id: user.roleIds } });
                if (roles.length > 0) {
                    yield createdUser.$set('roles', roles);
                    console.log("Roles assigned successfully.");
                }
                else {
                    console.warn("No valid roles found for the provided IDs.");
                }
            }
            if (user.entityIds && user.entityIds.length > 0) {
                const entities = yield entity_1.default.findAll({ where: { id: user.entityIds } });
                if (entities.length > 0) {
                    yield createdUser.$set('entities', entities);
                    console.log("Entities assigned successfully.");
                }
                else {
                    console.warn("No valid entities found for the provided IDs.");
                }
            }
            return this.getUserById(createdUser.id);
        });
    }
    changePassword(userId, oldPassword, newPassword, isFirstLogin) {
        return __awaiter(this, void 0, void 0, function* () {
            // Find the user by ID
            const user = yield user_1.default.findByPk(userId);
            if (!user) {
                throw new Error("User not found.");
            }
            // Validate the old password
            const isPasswordValid = yield this.validatePassword(userId, oldPassword);
            if (!isPasswordValid) {
                throw new Error("Old password is incorrect.");
            }
            // Hash the new password
            const hashedPassword = yield bcrypt_1.default.hash(newPassword, SALT_ROUNDS);
            // Update the user's password
            user.password = hashedPassword;
            user.isFirstLogin = isFirstLogin;
            yield user.save();
        });
    }
    updateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (user.id) {
                // Hash password if it's being updated
                if (user.password) {
                    const saltRounds = 10;
                    user.password = yield bcrypt_1.default.hash(user.password, saltRounds);
                }
                yield user_1.default.update(Object.assign({}, user), { where: { id: user.id } });
                return this.getUserById(user.id);
            }
            return null;
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return user_1.default.findAll({
                include: [
                    {
                        model: role_1.default
                    }
                ]
            }).then(users => (0, user_mapper_1.toUsersDTO)(users));
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_1.default.findByPk(id, {
                include: [
                    { model: role_1.default, attributes: ['id', 'name'] }, // Exclude circular `users` relation
                    { model: entity_1.default, attributes: ['id', 'name'] }
                ],
                attributes: { exclude: ['password'] }, // Prevent sensitive data
            }).then(user => user ? (0, user_mapper_1.toUserDTO)(user) : null);
        });
    }
    validatePassword(userId, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.default.findByPk(userId);
            if (!user || !user.password) {
                throw new Error('User not found');
            }
            return bcrypt_1.default.compare(password, user.password);
        });
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_1.default.findOne({ where: { email } }).then(user => user ? (0, user_mapper_1.toUserDTO)(user) : null);
        });
    }
}
const userService = new UserService();
exports.default = userService;
