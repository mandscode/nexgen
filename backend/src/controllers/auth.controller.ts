import { Post, Route, Body } from 'tsoa';
import authService, { GoogleLoginReqDTO, GoogleLoginRespDTO } from '../services/auth.service';

@Route('auth')
export class AuthController {
    @Post('/google-login')
    public async googleLogin(@Body() loginData: GoogleLoginReqDTO): Promise<GoogleLoginRespDTO> {
        return authService.googleLogin(loginData);
    }
}
