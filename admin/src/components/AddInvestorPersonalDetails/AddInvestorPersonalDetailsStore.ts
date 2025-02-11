import { makeAutoObservable } from "mobx"
import { AddInvestorPersonalDetails } from "./AddInvestorPersonalDetails";
import { NavigateFunction } from "react-router-dom";
import { updatePersonalDetails } from "../../api/apiEndpoints";


export class AddInvestorPersonalDetailsStore {
    static addPersonalDetails: any;
    
    constructor() {
        makeAutoObservable(this);
    }

    async addPersonalDetails(data: AddInvestorPersonalDetails,navigate:NavigateFunction, id:number) {
        const formattedValue = {
            ...data
        };

        await updatePersonalDetails(formattedValue, id);

        // transactionList(false);
        // transactionHistoryStore.addUser(createdUser);

        // Navigate to the users list after successful creation
        navigate("/investors");
    }
}