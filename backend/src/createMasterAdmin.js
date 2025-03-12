"use strict";
// scripts/createMasterAdmin.ts
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
const currency_service_1 = __importDefault(require("./services/currency.service"));
const role_service_1 = __importDefault(require("./services/role.service"));
const user_service_1 = __importDefault(require("./services/user.service"));
function createMasterAdmin() {
    return __awaiter(this, void 0, void 0, function* () {
        yield role_service_1.default.ensureRolesExist();
        yield currency_service_1.default.ensureCurrenciesExist();
        const adminRole = yield role_service_1.default.getRoleByName("Master Admin");
        if (!adminRole) {
            console.error("Admin role not found. Cannot create master admin.");
            return;
        }
        const masterAdmin = {
            email: 'vinay@evolvevcap.com',
            password: 'admin@0001',
            isMasterAdmin: true,
            status: "active",
            roleIds: [adminRole.id],
            firstName: "Vinay",
            lastName: "",
            entityIds: [],
            isFirstLogin: true
        };
        const existingAdmin = yield user_service_1.default.findUserByEmail(masterAdmin.email);
        if (!existingAdmin) {
            yield user_service_1.default.createUserUsingPassword(masterAdmin);
            console.log('Master admin created successfully.');
        }
        else {
            console.log('Master admin already exists.');
        }
    });
}
createMasterAdmin();
