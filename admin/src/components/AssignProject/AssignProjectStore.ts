import { makeAutoObservable } from "mobx"
import { Investor } from "../Utilities/interface/interface";
import { InvestorStore } from "../Investor/InvestorStore";
import { NavigateFunction } from "react-router-dom";
import { createInvestors, getRoles, getUser, updateUserRoles } from "../../api/apiEndpoints";

export class AssignProjectStore {
    
    constructor() {
        makeAutoObservable(this);
    }

    async assignProject(values: Investor, investorStore: InvestorStore, navigate: NavigateFunction) {
        // usersStore.addUser({...values, roles: values.roles.split(",").map((role: string) => role.trim())});
        try {
            // Prepare roles as an array
            let formattedValues = {
                ...values,
                projectIds:[values.projectIds]
            };
            
            const roles = await getRoles();
            const investorRole = roles.find((role: any) => role.name.includes("nve"));

            if (investorRole) {
                // Call the createUser function
                const user = await getUser(Number(formattedValues?.userId));
                
                let formattedValue = {
                    projectIds:[values.projectIds],
                    firstName:user.firstName,
                    lastName:user.lastName,
                    email:user.email,
                    accountInfo:"pending",
                    details:investorRole.id
                }            
                
                await createInvestors(formattedValues);
                await updateUserRoles(Number(formattedValues?.userId), { roles: [investorRole.id] } )
                // Add the new user to the local store
                investorStore.fetchInvestments();


                // Navigate to the users list after successful creation
                navigate("/investors");
            } else {
                alert('please create role first')
            }

            // console.log('User created successfully:', assignedInvestor);
        } catch (error) {
            console.error('Error adding user:', error);
        }
    }
}