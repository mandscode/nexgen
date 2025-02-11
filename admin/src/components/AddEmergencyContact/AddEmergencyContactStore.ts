import { makeAutoObservable } from "mobx"
import { InvestorEmergencyDetailsForm } from "../UserDetail/UserDetail";
import { NavigateFunction } from "react-router-dom";
import { updateEmergencyDetails } from "../../api/apiEndpoints";

export class AddEmergencyContactStore {
    
    constructor() {
        makeAutoObservable(this);
    }

    async addDetails(values: InvestorEmergencyDetailsForm, navigate: NavigateFunction, id:number) {
        const formattedValue = {
            ...values
        };

        await updateEmergencyDetails(formattedValue, id);

        // transactionList(false);
        // transactionHistoryStore.addUser(createdUser);

        // Navigate to the users list after successful creation
        navigate("/investors");
    }
}