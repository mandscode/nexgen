import { makeAutoObservable } from "mobx";
import { NavigateFunction } from "react-router-dom";
import { UsersStore } from "../Users/UsersStore";
import { AddUserForm } from "./AddUser";
import { createUser } from "../../api/apiEndpoints";
import { sendEmail } from "../Utilities/emailService";

export class AddUserStore {
    
    constructor() {
        makeAutoObservable(this);
    }

    async addUser(values: AddUserForm, usersStore: UsersStore, navigate: NavigateFunction) {

        try {
            let data: { 
                firstName: string; 
                lastName: string; 
                email: string; 
                roleIds: number[]; 
                password?: string; 
                isMasterAdmin: boolean;
                entityIds:any;
                isFirstLogin:boolean
            };            

            data = {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                roleIds: [values.roles], // Extract role IDs
                password:values.password,
                entityIds:values.entityIds.map((role: { value: number }) => role.value),
                // roleIds: values.roles.map((role: { value: number }) => role.value), // Extract role IDs
                isMasterAdmin:false,
                isFirstLogin:true
            }
            const endpoint = '/users/with-password';

            // Call the createUser function
            let res = await createUser(endpoint, data);

            await sendEmail(
                values.email,
                "Welcome to Our Platform!",
                `Hi ${values.firstName},\n\nWelcome to our platform! Your account has been successfully created.\n\nEmail: ${values.email}\nPassword: ${values.password}\n\nThank you,\nThe Team`
            );
              

            // Add the new user to the local store
            await usersStore.fetchUsers();

            // Navigate to the users list after successful creation
            navigate("/users");
        } catch (error:any) {
            let errorMessage = error?.response?.data?.message || "Failed to add user.";
            alert(errorMessage);
            console.error('Error adding user:', error);
        }

        // navigate("/users");
    }
}