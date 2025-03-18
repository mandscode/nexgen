import { Get, Path, Route, Tags } from "tsoa";
import profileDetailsService, { ProfileDetailsRespDTO } from "../services/profile.service";



@Route("profile/details")
@Tags("Users")
export class ProfileDetailsController {

    @Get("{id}")
    public async getProfileDetails(@Path() id: number): Promise<ProfileDetailsRespDTO | null> {
        return profileDetailsService.getProfileDetails(id);
    }
}
