import { Body, Get, Path, Post, Put, Route } from 'tsoa';
import userService, { UserReqDTO, UserRespDTO } from '../services/user.service';

import jwt, { JwtPayload } from 'jsonwebtoken';

@Route('users')
export class UserController {

    @Get('/')
    public async getAllUsers(): Promise<UserRespDTO[]> {
        return userService.getAllUsers();
    }

    @Get('{id}')
    public async getUserById(@Path() id: number): Promise<UserRespDTO | null> {
        return userService.getUserById(id);
    }

    @Post('/')
    public async createUser(@Body() user: UserReqDTO): Promise<UserRespDTO | null> {
        return userService.createUser(user);
    }

    @Post('/with-password')
    public async createUserUsingPassword(@Body() user: UserReqDTO): Promise<UserRespDTO | null> {
        return userService.createUserUsingPassword(user);
    }

    @Put('/')
    public async updateUser(@Body() user: UserReqDTO): Promise<UserRespDTO | null> {
        return userService.updateUser(user);
    }

    @Put('/{id}/roles')
    public async updateUserRoles(@Path() id: number, @Body() roleIds: number[]): Promise<UserRespDTO | null> {
        return userService.updateUserRoles(id, roleIds);
    }

    @Put('/{id}/change-password')
    public async changePassword(
        @Path('id') id: number,
        @Body() body: { oldPassword: string; newPassword: string; isFirstLogin?: boolean }
    ): Promise<{ message: string }> {
        await userService.changePassword(id, body.oldPassword, body.newPassword, body.isFirstLogin || false);
        return { message: "Password changed successfully." };
    }

    @Put('/{id}/entity/assign')
    public async assignEntity(@Path() id: number, @Body() body:{entityIds: number[]}): Promise<UserRespDTO | null> {
        return userService.assignEntities(id, body.entityIds);
    }

    @Post('/login')
    public async login(@Body() body: { email?: string, password?: string; entity?:number; biometricToken?: string, generateBiometricToken?:boolean,token?: string, haveBiometricTokenLogin?:boolean}): Promise<{ token: string, message?:string, biometricToken?: string, userId:any, isMasterAdmin:any, isFirstLogin:boolean } | null> {

        const generateBiometricToken = body.generateBiometricToken ?? false;

        let user: UserRespDTO | null = null;
        
        let biometricToken: string | undefined;

        if (body.biometricToken) {
            // 🔹 Biometric Login
            let decoded = await userService.validateBiometricToken(body.biometricToken);
            user = decoded.user
            
            if (!decoded.token) {
                throw new Error('Invalid biometric authentication');
            } else {
                biometricToken = body.biometricToken
            }
        }
        else if (body.token) {
            try {
                console.log(body, "body>>>>>>>>>>>>>>>>>>>>>>>>>")
                const decoded = jwt.verify(body.token, 'your_jwt_secret') as JwtPayload;

                if (typeof decoded !== 'string' && decoded.id) {
                    user = await userService.getUserById(decoded.id);
                } else {
                    throw new Error('Invalid token');
                }
            } catch (error) {
                throw new Error('Invalid token');
            }
        }  
        else {
            if (!body.email || !body.password) {
                throw new Error('Email and password are required');
            }
    
            user = await userService.findUserByEmail(body.email);
            
            if (!user) {
                throw new Error('User not found');
            }
    
            const isPasswordValid = await userService.validatePassword(Number(user.id), body.password);
            if (!isPasswordValid) {
                throw new Error('Invalid password');
            }
            
        }

        const userShare = body.entity !== undefined ? body.entity : null;

        if (!user) {
            throw new Error('User not found'); // Final safety check
        }
        
        const payload: JwtPayload = {
            id: user.id,
            email: user.email,
            isMasterAdmin: user.isMasterAdmin,
            isFirstLogin: user.isFirstLogin
        };

        
        if (userShare !== null) {
            payload.userShare = userShare;
        }


        if (generateBiometricToken) {
            biometricToken = jwt.sign(payload, 'your_biometric_secret', { expiresIn: '7d' });
            if(user.id) {
                await userService.storeBiometricToken(user.id, biometricToken);
            }
        } else if (body.biometricToken && body.haveBiometricTokenLogin) {
            biometricToken = body.biometricToken
        } else if (body.biometricToken && !body.haveBiometricTokenLogin) {
            if(user.id) {
                await userService.removeBiometricToken(user.id, body.biometricToken);
            }
        }

        const token = jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' });

        const message = 'Login successful';

        const response: any = {  
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
        
    }
}