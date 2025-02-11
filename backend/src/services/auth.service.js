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
exports.GoogleLoginRespDTO = exports.GoogleLoginReqDTO = void 0;
const role_1 = __importDefault(require("../models/role"));
const user_1 = __importDefault(require("../models/user"));
const google_auth_library_1 = require("google-auth-library");
class GoogleLoginReqDTO {
}
exports.GoogleLoginReqDTO = GoogleLoginReqDTO;
class GoogleLoginRespDTO {
}
exports.GoogleLoginRespDTO = GoogleLoginRespDTO;
const client = new google_auth_library_1.OAuth2Client('799373350915-tjcsjie1ph3kgboco6fha7lcg5b0dn6u.apps.googleusercontent.com');
class AuthService {
    googleLogin(loginData) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            // Verify Google token
            const ticket = yield client.verifyIdToken({
                idToken: loginData.token,
                audience: '799373350915-tjcsjie1ph3kgboco6fha7lcg5b0dn6u.apps.googleusercontent.com',
            });
            const payload = ticket.getPayload();
            if (!payload || !payload.email) {
                throw new Error('Invalid token');
            }
            const [firstName, lastName] = (payload.name || 'Unknown').split(' ', 2);
            // Check if user already exists
            let user = yield user_1.default.findOne({ where: { email: payload.email } });
            if (!user) {
                // Create new user
                user = yield user_1.default.create({
                    firstName,
                    lastName,
                    email: payload.email,
                    googleId: payload.sub,
                    picture: payload.picture,
                    status: 'active',
                    personalDetails: payload.locale ? { locale: payload.locale } : undefined,
                });
                const roles = yield role_1.default.findAll({ where: { name: ['Viewer'] } }); // Can include more roles
                if (roles.length) {
                    yield user.addRoles(roles); // Assign multiple roles
                }
            }
            // Return user details
            return {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                picture: user.picture,
                roles: ((_a = user.roles) === null || _a === void 0 ? void 0 : _a.map(role => role.name)) || [], // Map roles to their names
            };
        });
    }
}
const authService = new AuthService();
exports.default = authService;
