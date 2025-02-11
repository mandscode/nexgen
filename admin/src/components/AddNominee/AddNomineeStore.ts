import { makeAutoObservable } from "mobx"
import { NavigateFunction } from "react-router-dom";
import { NomineeDetails } from "../UserDetail/UserDetail";
import { updateNomineeDetails } from "../../api/apiEndpoints";
// import { updateNomineeDetails } from "../../api/apiEndpoints";

export class AddNomineeStore {
    
    constructor() {
        makeAutoObservable(this);
    }

    async addNominee(values: NomineeDetails, navigate: NavigateFunction, id:number, nomineeList:any, setNominee:any) {
        const formattedValue = {
            ...values
        };

        const response = await updateNomineeDetails(formattedValue, id);

        if (response.nomineeDetails) {
            const parsedDataNominee = response.nomineeDetails;
            setNominee([parsedDataNominee]); // Wrap in an array
          }
        // Navigate to the users list after successful creation
        nomineeList(false)
    }
}