import { NavigateFunction } from "react-router-dom";
import { AssignProjectOption, User } from "./UserDetail";
import { assignProject, getInvestor, getProjects, getUser } from "../../api/apiEndpoints";

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

    async assignAccount (values: AssignProjectOption, setUserProjectListShow: any, projects:any, setProjects:any) {

        // Extract project IDs from values.projectId
        const selectedProjectIds = values.projectId.map((project: any) => project.value);

        // Extract project IDs from the projects array
        const allProjectIds = projects.map((project: any) => project.id);
        
        // Merge both arrays and remove duplicates
        const mergedProjectIds = Array.from(new Set([...selectedProjectIds, ...allProjectIds]));

        const filteredProjects = await getProjects();
        const allInputProjects = await filteredProjects.filter((e:any) => selectedProjectIds.includes(e.id))

        // Merge both arrays and deduplicate based on `id`
        const allProjects = [
            ...projects,
            ...allInputProjects,
        ].reduce((unique: any[], item: any) => {
            // Check if the `id` is already in the unique array
            if (!unique.some((proj) => proj.id === item.id)) {
                unique.push(item);
            }
            return unique;
        }, []);
        

        // Prepare the formatted values
        const formattedValues = {
            investorId: values.investorId,
            projectId: mergedProjectIds // Send only the array of project IDs
        };

        // Call the createUser function
        await assignProject(formattedValues.investorId, formattedValues.projectId);
        await setProjects(allProjects)

        setUserProjectListShow(true)

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