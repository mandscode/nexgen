import { makeAutoObservable, runInAction } from "mobx"
import { getEntities, getProjects } from "../../api/apiEndpoints";
import { Project } from "./Project";

export class ProjectStore {
    data: Project[] = []; // Initialize as empty array

    constructor() {
        makeAutoObservable(this);
        this.fetchProjects();
    }
    
    async fetchProjects() {
        try {
            const projects = await getProjects();
            const entities = await getEntities();
            // Use runInAction to modify observable data inside async functions
            runInAction(() => {
                this.data = projects.map((project: any) => {
                    const entity = entities.find((entity: any) => entity.id === project.entityID);
                    return {
                        ...project,
                        entityName: entity ? entity.name : "null", // Include the entity name
                    };
                });
            });
        } catch (error) {
            console.error("Failed to fetch users:", error);
        }
    }

    addEntity(project: Project) {
        this.data.push(project);
    }
}