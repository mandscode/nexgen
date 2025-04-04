"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.UserDetailsController = void 0;
const tsoa_1 = require("tsoa");
const UserDetails_service_1 = __importDefault(require("../services/UserDetails.service"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let UserDetailsController = class UserDetailsController {
    getUserDetails(id, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const authHeader = req.headers.authorization;
            if (!(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith('Bearer '))) {
                throw new Error('Unauthorized: No valid token provided');
            }
            const token = authHeader.split(' ')[1];
            try {
                let decodedToken;
                try {
                    decodedToken = jsonwebtoken_1.default.verify(token, 'your_jwt_secret');
                }
                catch (firstError) {
                    try {
                        decodedToken = jsonwebtoken_1.default.verify(token, 'your_biometric_secret');
                    }
                    catch (secondError) {
                        throw new Error('Unauthorized: Invalid token');
                    }
                }
                if (decodedToken.userShare) {
                    return UserDetails_service_1.default.getUserDetails(id, decodedToken.userShare);
                }
                else {
                    throw new Error('Unauthorized: Invalid token');
                }
            }
            catch (error) {
                if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
                    throw new Error('TokenExpired: Please log in again');
                }
                else if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
                    throw new Error('Unauthorized: Invalid token');
                }
                else {
                    throw new Error('Unauthorized: Invalid token');
                }
            }
        });
    }
};
exports.UserDetailsController = UserDetailsController;
__decorate([
    (0, tsoa_1.Get)("{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserDetailsController.prototype, "getUserDetails", null);
exports.UserDetailsController = UserDetailsController = __decorate([
    (0, tsoa_1.Route)("users/details"),
    (0, tsoa_1.Tags)("Users")
], UserDetailsController);
