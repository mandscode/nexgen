"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.UserController = void 0;
const tsoa_1 = require("tsoa");
const user_service_1 = __importStar(require("../services/user.service"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let UserController = class UserController {
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return user_service_1.default.getAllUsers();
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_service_1.default.getUserById(id);
        });
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_service_1.default.createUser(user);
        });
    }
    createUserUsingPassword(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_service_1.default.createUserUsingPassword(user);
        });
    }
    updateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_service_1.default.updateUser(user);
        });
    }
    updateUserRoles(id, roleIds) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_service_1.default.updateUserRoles(id, roleIds);
        });
    }
    changePassword(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            yield user_service_1.default.changePassword(id, body.oldPassword, body.newPassword, body.isFirstLogin || false);
            return { message: "Password changed successfully." };
        });
    }
    assignEntity(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_service_1.default.assignEntities(id, body.entityIds);
        });
    }
    login(body) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const generateBiometricToken = (_a = body.generateBiometricToken) !== null && _a !== void 0 ? _a : false;
            let user = null;
            let biometricToken;
            if (body.biometricToken) {
                // 🔹 Biometric Login
                let decoded = yield user_service_1.default.validateBiometricToken(body.biometricToken);
                user = decoded.user;
                if (!decoded.token) {
                    throw new Error('Invalid biometric authentication');
                }
                else {
                    biometricToken = body.biometricToken;
                }
            }
            else if (body.token) {
                try {
                    const decoded = jsonwebtoken_1.default.verify(body.token, 'your_jwt_secret');
                    if (typeof decoded !== 'string' && decoded.id) {
                        user = yield user_service_1.default.getUserById(decoded.id);
                    }
                    else {
                        throw new Error('Invalid token');
                    }
                }
                catch (error) {
                    throw new Error('Invalid token');
                }
            }
            else {
                if (!body.email || !body.password) {
                    throw new Error('Email and password are required');
                }
                user = yield user_service_1.default.findUserByEmail(body.email);
                if (!user) {
                    throw new Error('User not found');
                }
                const isPasswordValid = yield user_service_1.default.validatePassword(Number(user.id), body.password);
                if (!isPasswordValid) {
                    throw new Error('Invalid password');
                }
            }
            const userShare = body.entity !== undefined ? body.entity : null;
            if (!user) {
                throw new Error('User not found'); // Final safety check
            }
            const payload = {
                id: user.id,
                email: user.email,
                isMasterAdmin: user.isMasterAdmin,
                isFirstLogin: user.isFirstLogin
            };
            if (userShare !== null) {
                payload.userShare = userShare;
            }
            if (generateBiometricToken) {
                biometricToken = jsonwebtoken_1.default.sign(payload, 'your_biometric_secret', { expiresIn: '7d' });
                if (user.id) {
                    yield user_service_1.default.storeBiometricToken(user.id, biometricToken);
                }
            }
            else if (body.disableBiometricLogin) {
                if (user.id) {
                    yield user_service_1.default.removeBiometricToken(user.id);
                }
                biometricToken = jsonwebtoken_1.default.sign(payload, 'your_biometric_secret', { expiresIn: '15m' });
            }
            else if (body.biometricToken) {
                biometricToken = body.biometricToken;
            }
            const token = jsonwebtoken_1.default.sign(payload, 'your_jwt_secret', { expiresIn: '15m' });
            const message = 'Login successful';
            const response = {
                token,
                message,
                userId: user.id,
                isMasterAdmin: user.isMasterAdmin,
                isFirstLogin: user.isFirstLogin
            };
            // Only include biometricToken if it was generated
            if (biometricToken) {
                response.biometricToken = biometricToken;
            }
            return response;
        });
    }
};
exports.UserController = UserController;
__decorate([
    (0, tsoa_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
__decorate([
    (0, tsoa_1.Get)('{id}'),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserById", null);
__decorate([
    (0, tsoa_1.Post)('/'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_service_1.UserReqDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, tsoa_1.Post)('/with-password'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_service_1.UserReqDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUserUsingPassword", null);
__decorate([
    (0, tsoa_1.Put)('/'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_service_1.UserReqDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, tsoa_1.Put)('/{id}/roles'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Array]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserRoles", null);
__decorate([
    (0, tsoa_1.Put)('/{id}/change-password'),
    __param(0, (0, tsoa_1.Path)('id')),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changePassword", null);
__decorate([
    (0, tsoa_1.Put)('/{id}/entity/assign'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "assignEntity", null);
__decorate([
    (0, tsoa_1.Post)('/login'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
exports.UserController = UserController = __decorate([
    (0, tsoa_1.Route)('users')
], UserController);
