import { makeAutoObservable } from "mobx"
import { AddProjectForm } from "./AddProject";
import { AppStore } from "../../AppStore";
import { NavigateFunction } from "react-router-dom";
import { createProject } from "../../api/apiEndpoints";
import { ProjectStore } from "../Project/ProjectStore";
import { AcademyStore } from "../Academy/AcademyStore";

export class AddProjectStore {
    
    constructor() {
        makeAutoObservable(this);
    }

    async addProject(values: AddProjectForm, appStore: ProjectStore, navigate: NavigateFunction) {
        try {
            // Prepare roles as an array
            const formattedValues = {
                ...values
            };
            await createProject(formattedValues);

            // Add the new user to the local store
            appStore.fetchProjects();

            // Navigate to the users list after successful creation
            navigate("/projects");
        } catch (error) {
            console.error('Error adding user:', error);
        }
    }
}