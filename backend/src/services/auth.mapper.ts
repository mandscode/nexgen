import { plainToInstance } from 'class-transformer';
import User from '../models/user';
import { GoogleLoginRespDTO } from './auth.service';

export function toGoogleLoginDTO(user: User): GoogleLoginRespDTO {
    return plainToInstance(GoogleLoginRespDTO, {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        picture: user.picture,
    });
}
