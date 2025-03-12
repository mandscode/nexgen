import { Body, Get, Path, Post, Put, Route } from 'tsoa';
import userService, { UserReqDTO, UserRespDTO } from '../services/user.service';

import jwt from 'jsonwebtoken';

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

    @Post('/login')
    public async login(@Body() body: { email: string, password: string }): Promise<{ token: string, message?:string, userId:any, isMasterAdmin:any, isFirstLogin:boolean } | null> {
        const user = await userService.findUserByEmail(body.email);

        if (!user || !user.id) {
            throw new Error('User not found');
        }

        const isPasswordValid = await userService.validatePassword(user.id, body.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user.id, email: user.email, isMasterAdmin: user.isMasterAdmin, isFirstLogin:user.isFirstLogin }, 'your_jwt_secret', {
            expiresIn: '1h', // Token expires in 1 hour
        });

        const message = 'Login successful';

        return { token, message, userId: user.id, isMasterAdmin:user.isMasterAdmin, isFirstLogin:user.isFirstLogin };
    }
}