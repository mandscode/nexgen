import { makeAutoObservable, runInAction } from "mobx"
import { getEntities, getProject, getProjects } from "../../api/apiEndpoints";
import { ProjectDetailInterface } from "../Utilities/interface/interface";

export class ProjectDetailStore {
    data: ProjectDetailInterface[] = []; // Initialize as empty array
    
    constructor() {
        makeAutoObservable(this);
        this.fetchProjects();
    }

    async fetchProjects() {
        try {
            const projects = await getProjects();
            const entities = await getEntities();
            // const investors = await getInvestors();
            // Use runInAction to modify observable data inside async functions
            runInAction(() => {
                this.data = projects.map((project: any) => {
                    const entity = entities.find((entity: any) => entity.id === project.entityID);
                    return {
                        ...project,
                        entityName: entity ? entity.name : null, // Include the entity name
                    };
                });
            });
        } catch (error) {
            console.error("Failed to fetch users:", error);
        }
    }

    addProjectDetail(project: ProjectDetailInterface) {
        this.data.push(project);
    }
}