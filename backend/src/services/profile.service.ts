import Entity from "../models/entity";
import Investor from "../models/investor";
import Role from "../models/role";
import User from "../models/user";


export class ProfileDetailsRespDTO {
    userId!: number;
    FirstName!: string;
    LastName!: string;

    PersonalDetails?: {
        Email: string;
        Mobile: string;
        DOB: string;
        ResidentailAddress: string;
        MailingAdress: string;
    };

    NomineeDetails?: {
        Email: string;
        Mobile: string;
        Name: string;
        Relation: string;
    };

    EmergencyContactDetails?: {
        Email: string;
        Mobile: string;
        Name: string;
        Relation: string;
    };

    Documents?: {
        id: number;
        Name: string;
        URL: string;
        Status: number;
    }[];
}


class ProfileDetailsService {
    async getProfileDetails(id: number): Promise<ProfileDetailsRespDTO | null> {
        // Fetch user details
        const user = await User.findByPk(id, {
            include: [
                { model: Role, attributes: ["id", "name"], through: { attributes: [] } },
                { model: Entity, attributes: ["id", "name"], through: { attributes: [] } }
            ],
            attributes: { exclude: ["password", "googleId", "isMasterAdmin", "updatedAt"] }
        });

        if (!user) return null;

        // Construct the response DTO
        let userDTO: ProfileDetailsRespDTO = {
            userId: user.id,
            FirstName: user.firstName,
            LastName: user.lastName
        };

        // Fetch personal details
        let email;
        if (user.email) {
            email = user.email
        }


        // Fetch investor details separately
        const investor = await Investor.findOne({
            where: { userId: id },
            attributes: { exclude: ["userId"] }
        });

        if (investor) {
            // Ensure personalDetails is an object
            let personalDetails = typeof investor.personalDetails === "string"
                ? JSON.parse(investor.personalDetails)
                : investor.personalDetails;

            if (personalDetails) {
                userDTO.PersonalDetails = {
                    Email: email || '',
                    Mobile: personalDetails.mobile || "",
                    DOB: personalDetails.dob || "",
                    ResidentailAddress: personalDetails.residentialAddress || "",
                    MailingAdress: personalDetails.mailingAddress || ""
                };
            }

            // Ensure nomineeDetails is an object
            let nomineeDetails = typeof investor.nomineeDetails === "string"
                ? JSON.parse(investor.nomineeDetails)
                : investor.nomineeDetails;

            if (nomineeDetails) {
                userDTO.NomineeDetails = {
                    Email: nomineeDetails.email || "",
                    Mobile: nomineeDetails.mobile || "",
                    Name: nomineeDetails.name || "",
                    Relation: nomineeDetails.relation || ""
                };
            }

            // Ensure emergencyContact is an object
            let emergencyContact = typeof investor.emergencyContact === "string"
                ? JSON.parse(investor.emergencyContact)
                : investor.emergencyContact;

            if (emergencyContact) {
                userDTO.EmergencyContactDetails = {
                    Email: emergencyContact.email || "",
                    Mobile: emergencyContact.mobile || "",
                    Name: emergencyContact.name || "",
                    Relation: emergencyContact.relation || ""
                };
            }

            // Ensure documents is an array
            let documents = typeof investor.documents === "string"
                ? JSON.parse(investor.documents)
                : investor.documents;

            if (Array.isArray(documents)) {
                userDTO.Documents = documents.map((doc: any) => ({
                    id: doc.id,
                    Name: doc.docName,
                    URL: doc.docUrl,
                    Status: doc.status ? 1 : 0
                }));
            }
        }

        return userDTO;
    }

}

const profileDetailsService = new ProfileDetailsService();

export default profileDetailsService;