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
const role_1 = __importDefault(require("../models/role"));
const user_1 = __importDefault(require("../models/user"));
const user_mapper_1 = require("./user.mapper");
class UserReqDTO {
}
exports.UserReqDTO = UserReqDTO;
class UserRespDTO {
}
exports.UserRespDTO = UserRespDTO;
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
            const rolesReqs = user.roleIds.map(roleId => role_1.default.findByPk(roleId));
            const roles = (yield Promise.all(rolesReqs)).filter(role => !!role);
            // Set default status if not provided
            const userData = Object.assign(Object.assign({}, user), { status: user.status || 'active' });
            return user_1.default.create(Object.assign({}, userData)).then((createdUser) => {
                return createdUser.addRoles(roles).then(() => this.getUserById(createdUser.id));
            });
        });
    }
    updateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (user.id) {
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
            return user_1.default.findByPk(id, {
                include: [
                    {
                        model: role_1.default
                    }
                ]
            }).then(user => user ? (0, user_mapper_1.toUserDTO)(user) : null);
        });
    }
}
const userService = new UserService();
exports.default = userService;
