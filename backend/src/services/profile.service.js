"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileDetailsRespDTO = void 0;
const entity_1 = __importDefault(require("../models/entity"));
const investor_1 = __importDefault(require("../models/investor"));
const role_1 = __importDefault(require("../models/role"));
const user_1 = __importDefault(require("../models/user"));
class ProfileDetailsRespDTO {
}
exports.ProfileDetailsRespDTO = ProfileDetailsRespDTO;
class ProfileDetailsService {
    getProfileDetails(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // Fetch user details
            const user = yield user_1.default.findByPk(id, {
                include: [
                    { model: role_1.default, attributes: ["id", "name"], through: { attributes: [] } },
                    { model: entity_1.default, attributes: ["id", "name"], through: { attributes: [] } }
                ],
                attributes: { exclude: ["password", "googleId", "isMasterAdmin", "updatedAt"] }
            });
            if (!user)
                return null;
            // Construct the response DTO
            let userDTO = {
                userId: user.id,
                FirstName: user.firstName,
                LastName: user.lastName
            };
            // Fetch personal details
            let email;
            if (user.email) {
                email = user.email;
            }
            // Fetch investor details separately
            const investor = yield investor_1.default.findOne({
                where: { userId: id },
                attributes: { exclude: ["userId"] }
            });
            if (investor) {
                userDTO.investorId = investor.id;
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
                    userDTO.Documents = documents.map((doc) => ({
                        id: doc.id,
                        Name: doc.docName,
                        URL: doc.docUrl,
                        Status: doc.status ? 1 : 0
                    }));
                }
            }
            return userDTO;
        });
    }
}
const profileDetailsService = new ProfileDetailsService();
exports.default = profileDetailsService;
