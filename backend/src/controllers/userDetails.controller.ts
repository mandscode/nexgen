import { Get, Path, Route, Tags, Request } from "tsoa";
import userDetailsService, { UserDetailsRespDTO } from "../services/UserDetails.service";
import { Request as ExpressRequest } from 'express';
import jwt from 'jsonwebtoken';

@Route("users/details")
@Tags("Users")
export class UserDetailsController {

    @Get("{id}")
    public async getUserDetails(@Path() id: number, @Request() req: ExpressRequest): Promise<UserDetailsRespDTO | null> {
        const authHeader = req.headers.authorization;

        if (!authHeader?.startsWith('Bearer ')) {
            throw new Error('Unauthorized: No valid token provided');
        }
        
        const token = authHeader.split(' ')[1];
        try {
            let decodedToken;
            
            try {
                decodedToken = jwt.verify(token, 'your_jwt_secret') as { userShare?: number };
            } catch (firstError) {
                try {
                    decodedToken = jwt.verify(token, 'your_biometric_secret') as { userShare?: number };
                } catch (secondError) {
                    throw new Error('Unauthorized: Invalid token');
                }
            }
        
            if (decodedToken.userShare) {
                return userDetailsService.getUserDetails(id, decodedToken.userShare);
            } else {
                throw new Error('Unauthorized: Invalid token');
            }
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                throw new Error('TokenExpired: Please log in again');
            } else if (error instanceof jwt.JsonWebTokenError) {
                throw new Error('Unauthorized: Invalid token');
            } else {
                throw new Error('Unauthorized: Invalid token');
            }
        }
    }
}
