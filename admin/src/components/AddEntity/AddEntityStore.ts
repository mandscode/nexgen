import { makeAutoObservable } from "mobx"
// import { AppStore } from "../../AppStore";
import { NavigateFunction } from "react-router-dom";
import { AddEntityForm } from "./AddEntity";
import { createEntity } from "../../api/apiEndpoints";
import { EntityStore } from "../Entity/EntityStore";

export class AddEntityStore {
    
    constructor() {
        makeAutoObservable(this);
    }

    async addEntity(values: AddEntityForm, entitiesStore: EntityStore, navigate: NavigateFunction) {

        try {
            // Prepare roles as an array
            const formattedValues = {
                ...values
            };
            
            // Remove 'id' from the formatted values
            const { 
                // id, 
                ...finalValues 
            } = formattedValues;

            // Call the createUser function
            const createdUser = await createEntity(finalValues);

            // Add the new user to the local store
            entitiesStore.addEntity(createdUser);

            // Navigate to the users list after successful creation
            navigate("/entities");

            console.log('User created successfully:', createdUser);
        } catch (error) {
            console.error('Error adding user:', error);
        }

    }
}