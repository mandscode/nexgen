import Role from '../models/role';
import User from '../models/user';
import { OAuth2Client } from 'google-auth-library';
import { toUserDTO } from './user.mapper';

export class GoogleLoginReqDTO {
    token!: string; // Google ID token
}

export class GoogleLoginRespDTO {
    id!: number;
    firstName?: string;
    lastName?: string;
    email!: string;
    picture?: string;
    roles!:any[]
}


const client = new OAuth2Client('799373350915-tjcsjie1ph3kgboco6fha7lcg5b0dn6u.apps.googleusercontent.com');

class AuthService {
    async googleLogin(loginData: GoogleLoginReqDTO): Promise<GoogleLoginRespDTO> {
        // Verify Google token
        const ticket = await client.verifyIdToken({
            idToken: loginData.token,
            audience: '799373350915-tjcsjie1ph3kgboco6fha7lcg5b0dn6u.apps.googleusercontent.com',
        });
        const payload = ticket.getPayload();

        if (!payload || !payload.email) {
            throw new Error('Invalid token');
        }

        const [firstName, lastName] = (payload.name || 'Unknown').split(' ', 2);

        // Check if user already exists
        let user = await User.findOne({ where: { email: payload.email } });

        if (!user) {
            // Create new user
            user = await User.create({
                firstName,
                lastName,
                email: payload.email,
                googleId: payload.sub,
                picture: payload.picture,
                status:'active',
                personalDetails: payload.locale ? { locale: payload.locale } : undefined,
            });

            const roles = await Role.findAll({ where: { name: ['Viewer'] } }); // Can include more roles
            if (roles.length) {
                await user.addRoles(roles); // Assign multiple roles
            }
            
        }

        // Return user details
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            picture: user.picture,
            roles: user.roles?.map(role => role.name) || [], // Map roles to their names
        };
    }
}

const authService = new AuthService();

export default authService;
