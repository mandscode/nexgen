import { Get, Path, Route, Tags } from "tsoa";
import userDetailsService, { UserDetailsRespDTO } from "../services/UserDetails.service";


@Route("users/details")
@Tags("Users")
export class UserDetailsController {

    @Get("{id}")
    public async getUserDetails(@Path() id: number): Promise<UserDetailsRespDTO | null> {
        return userDetailsService.getUserDetails(id);
    }
}
