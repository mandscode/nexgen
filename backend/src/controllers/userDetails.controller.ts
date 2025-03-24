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

            const decodedToken = jwt.verify(token, 'your_jwt_secret') as { userShare?: number };
            
            
            if (decodedToken.userShare) {
                return userDetailsService.getUserDetails(id, decodedToken.userShare);
            } else {
                throw new Error('Unauthorized: Invalid token');

            }
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                // Token is expired
                throw new Error('TokenExpired: Please log in again');
            } else if (error instanceof jwt.JsonWebTokenError) {
                // Token is invalid (e.g., malformed, not signed correctly)
                throw new Error('Unauthorized: Invalid token');
            } else {
                // Other errors (e.g., network issues, server errors)
                throw new Error('Unauthorized: Invalid token');
            }
        }
    }
}
