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
const account_1 = __importDefault(require("../models/account"));
const entity_1 = __importDefault(require("../models/entity"));
const investor_1 = __importDefault(require("../models/investor"));
const project_1 = __importDefault(require("../models/project"));
const role_1 = __importDefault(require("../models/role"));
const user_1 = __importDefault(require("../models/user"));
const user_entities_1 = __importDefault(require("../models/user-entities"));
const investor_mapper_1 = require("./investor.mapper");
const user_mapper_1 = require("./user.mapper");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserReqDTO {
}
exports.UserReqDTO = UserReqDTO;
class UserRespDTO {
}
exports.UserRespDTO = UserRespDTO;
const SALT_ROUNDS = 10;
class UserService {
    constructor() {
        this.biometricTokens = {};
    }
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
            var _a;
            const user = yield user_1.default.findByPk(id, {
                include: [
                    { model: role_1.default, attributes: ['id', 'name'], through: { attributes: [] } }, // Exclude circular `users` relation
                    { model: entity_1.default, attributes: ['id', 'name'], through: { attributes: [] } }
                ],
                attributes: { exclude: ['password', "googleId"] }
            });
            if (!user)
                return null;
            const userDTO = (0, user_mapper_1.toUserDTO)(user);
            const isInvestor = yield ((_a = user.roles) === null || _a === void 0 ? void 0 : _a.some((role) => role.name == "Investor"));
            if (isInvestor) {
                const investorDetails = yield investor_1.default.findOne({
                    where: { userId: id },
                    include: [
                        {
                            model: account_1.default
                        },
                        {
                            model: project_1.default,
                            through: { attributes: [] }
                        }
                    ],
                    attributes: { exclude: ['userId'] }
                });
                if (investorDetails) {
                    userDTO.investor = (0, investor_mapper_1.toInvestorDTO)(investorDetails);
                }
            }
            return userDTO;
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
    assignEntities(userId, entityIds) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!entityIds || entityIds.length === 0) {
                throw new Error('No entity IDs provided');
            }
            // Find the user
            const user = yield user_1.default.findByPk(userId);
            if (!user) {
                throw new Error('User not found');
            }
            // Loop through the provided entityIds and assign them
            for (const entityId of entityIds) {
                // Assign the entity to the user
                yield user_entities_1.default.create({
                    userId: userId,
                    entityId: entityId,
                });
            }
            return this.getUserById(userId);
        });
    }
    storeBiometricToken(userId, biometricToken) {
        return __awaiter(this, void 0, void 0, function* () {
            this.biometricTokens[userId] = biometricToken;
        });
    }
    validateBiometricToken(biometricToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Verify the biometric token using the stored secret
                const decoded = jsonwebtoken_1.default.verify(biometricToken, 'your_biometric_secret');
                console.log(decoded);
                // Ensure the token belongs to the correct user
                const storedToken = this.biometricTokens[decoded === null || decoded === void 0 ? void 0 : decoded.userId];
                if (!storedToken) {
                    return false; // No biometric token stored
                }
                return decoded;
            }
            catch (error) {
                return false; // Invalid or expired token
            }
        });
    }
}
const userService = new UserService();
exports.default = userService;
