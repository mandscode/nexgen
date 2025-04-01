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

        if(values.lockInPeriod) {

            const formattedValues = {
                investorId: invId,
                projectId: values.projectId,
                lockInPeriod:values.lockInPeriod
            };
            
            const investor = await getInvestor(Number(invId));
            const user = await getUser(Number(investor?.userId));

            const formattedValues1 = {
                entityIds: [values.entityType],
                userId: investor.userId
            };
            
            const haveEntity = !!user?.entities?.some((e: any) => e.id === values.entityType);
            await assignProject(formattedValues);
            if(!haveEntity){
                await assignEntity(formattedValues1);
            }
    
            setUserProjectListShow(true)
        } else {
            alert('Lock in Period required field')
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