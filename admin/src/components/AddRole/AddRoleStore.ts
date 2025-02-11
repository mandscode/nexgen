import { makeAutoObservable } from "mobx"
import { RolesStore } from "../Roles/RolesStore";
import { AddRoleForm } from "./AddRole";
import { NavigateFunction } from "react-router-dom";
import { createRole } from "../../api/apiEndpoints";

export class AddRoleStore {
    
    constructor() {
        makeAutoObservable(this);
    }

    async addRole(values: AddRoleForm, usersStore: RolesStore, navigate: NavigateFunction) {
        // usersStore.addUser({...values, roles: values.roles.split(",").map((role: string) => role.trim())});
        try {
            // Prepare roles as an array
            const formattedValues = {
                name: values.name
            };


            // Call the createUser function
            const createdUser = await createRole(formattedValues);

            // Add the new user to the local store
            usersStore.addRole(createdUser);

            // Navigate to the users list after successful creation
            navigate("/roles");

            console.log('Roles created successfully:', createdUser);
        } catch (error) {
            console.error('Error adding user:', error);
        }
    }
}