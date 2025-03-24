import { NavigateFunction } from "react-router-dom";
import { AssignProjectOption, User } from "./UserDetail";
import { assignEntity, assignProject, getInvestor, getProjects, getUser } from "../../api/apiEndpoints";

import { makeAutoObservable, runInAction } from "mobx"

export class UserDetailStore {
    data: User = {
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
        status:'',
        personalDetails: '', // Assuming personalDetails could be a ' or null
        googleId: '',
        picture: '',
        createdAt: '', // ISO date '
        updatedAt: '', // ISO date string
        roles: [], // Assuming roles is an array of objects
    }; // Initialize as empty array
   
    constructor() {
        makeAutoObservable(this);
    }

    async assignAccount (values: AssignProjectOption, setUserProjectListShow: any, projects:any, setProjects:any, invId:number) {

        if (values.entityType == 1) {
            if(values.lockInPeriod) {

                // Prepare the formatted values
                const formattedValues = {
                    investorId: invId,
                    projectId: values.projectId,
                    lockInPeriod:values.lockInPeriod
                };
        
                // Call the createUser function
                await assignProject(formattedValues);
                setUserProjectListShow(true)
            } else {
                alert('Lock in Period required field')
            }
    
            // await setProjects([...projects, ])
    
        }
        else if(values.entityType == 0) {
            // Prepare the formatted values

            const investor = await getInvestor(Number(invId));
            const formattedValues = {
                entityIds: [values.projectId],
                userId: investor.userId,
            };
    
            // Call the createUser function
            await assignEntity(formattedValues);
    
            setUserProjectListShow(true)
        }

    }

    async fetchAccountData(id:number) {
        try {

        const user = await getUser(Number(id));
            // const investors = await getInvestors();
            // Use runInAction to modify observable data inside async functions
            runInAction(() => {
                this.data = user
            });
            
        } catch (error) {
            console.error("Failed to fetch users:", error);
        }
    }
}