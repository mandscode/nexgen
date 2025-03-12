import { makeAutoObservable } from "mobx"
import { AssignAccountInterface } from "./AssignAccount";
import { InvestorStore } from "../Investor/InvestorStore";
import { NavigateFunction } from "react-router-dom";
import { createAccounts, getInvestor, getUser } from "../../api/apiEndpoints";
import { Dispatch, SetStateAction } from "react";
// import { createAccounts } from "../../api/apiEndpoints";

export class AssignAccountStore {
    
    constructor() {
        makeAutoObservable(this);
    }

    async assignAccount(values: AssignAccountInterface, investorStore: InvestorStore, navigate: NavigateFunction, setShowAccounts?:Dispatch<SetStateAction<boolean>>) {
        // usersStore.addUser({...values, roles: values.roles.split(",").map((role: string) => role.trim())});
        try {
            // Prepare roles as an array
            let formattedValues = {
                ...values
            };

            // Call the createUser function
            const investor = await getInvestor(Number(formattedValues?.investorId));

            // Check if any account's id matches the investor's currency
            const isAccountAlreadyAssigned = investor?.accounts?.some((account:any) => account.currency === Number(formattedValues.currency));
            
            if (isAccountAlreadyAssigned) {
                // Show alert if the account is already assigned
                alert("This account is already assigned to the investor.");
                return; // Stop further execution, do not call the API
            }

            await createAccounts(formattedValues);

            await investorStore.fetchInvestments();

            if (setShowAccounts) {
                setShowAccounts(true); // Call the state updater function
              }

            // navigate(`/investors/assign/account/${investor.id}`);

            // console.log('User created successfully:', assignedInvestor);
        } catch (error) {
            console.error('Error adding user:', error);
        }
    }
}