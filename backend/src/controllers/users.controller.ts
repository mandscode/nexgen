import { Body, Get, Path, Post, Put, Route } from 'tsoa';
import userService, { UserReqDTO, UserRespDTO } from '../services/user.service';

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

    @Put('/')
    public async updateUser(@Body() user: UserReqDTO): Promise<UserRespDTO | null> {
        return userService.updateUser(user);
    }

    @Put('/{id}/roles')
    public async updateUserRoles(@Path() id: number, @Body() roleIds: number[]): Promise<UserRespDTO | null> {
        return userService.updateUserRoles(id, roleIds);
    }
}