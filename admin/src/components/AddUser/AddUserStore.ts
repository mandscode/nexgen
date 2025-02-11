import { makeAutoObservable } from "mobx";
import { NavigateFunction } from "react-router-dom";
import { UsersStore } from "../Users/UsersStore";
import { AddUserForm } from "./AddUser";
import { createUser } from "../../api/apiEndpoints";

export class AddUserStore {
    
    constructor() {
        makeAutoObservable(this);
    }

    async addUser(values: AddUserForm, usersStore: UsersStore, navigate: NavigateFunction) {
        // usersStore.addUser({...values, roles: values.roles.split(",").map((role: string) => role.trim())});
        try {
            // Prepare roles as an array
            const formattedValues = {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                roleIds: values.roles.map((role: { value: number }) => role.value), // Extract role IDs
            };

            // Call the createUser function
            await createUser(formattedValues);

            // Add the new user to the local store
            await usersStore.fetchUsers();

            // Navigate to the users list after successful creation
            navigate("/users");
        } catch (error) {
            console.error('Error adding user:', error);
        }

        // navigate("/users");
    }
}