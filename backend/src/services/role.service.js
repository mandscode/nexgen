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
exports.RoleDTO = void 0;
const role_1 = __importDefault(require("../models/role"));
const role_mapper_1 = require("./role.mapper");
class RoleDTO {
}
exports.RoleDTO = RoleDTO;
class RoleService {
    createRole(role) {
        return __awaiter(this, void 0, void 0, function* () {
            return role_1.default.create(role).then(role => (0, role_mapper_1.toRoleDTO)(role));
        });
    }
    getAllRoles() {
        return __awaiter(this, void 0, void 0, function* () {
            return role_1.default.findAll().then(roles => (0, role_mapper_1.toRolesDTO)(roles));
        });
    }
    getRoleId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return role_1.default.findByPk(id).then(role => role ? (0, role_mapper_1.toRoleDTO)(role) : null);
        });
    }
    deleteRole(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = yield role_1.default.findByPk(id);
            if (role) {
                yield role.destroy(); // Deletes the role
                return true;
            }
            return false;
        });
    }
    updateRoleName(id, newName) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = yield role_1.default.findByPk(id);
            if (role) {
                role.name = newName;
                yield role.save();
                return (0, role_mapper_1.toRoleDTO)(role);
            }
            return null;
        });
    }
}
const roleService = new RoleService();
exports.default = roleService;
