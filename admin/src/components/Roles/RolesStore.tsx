import { makeAutoObservable, runInAction } from "mobx"
import { getRoles } from "../../api/apiEndpoints";

export interface Role {
    id:number;
    name: string;
}

export class RolesStore {
    data: Role[] = []; // Initialize as empty array
    roles: Role[] = [];
    
    constructor() {
        makeAutoObservable(this);
        this.fetchRoles();
    }

    // Fetch users from the API
    async fetchRoles() {
        try {
            const roles = await getRoles();

            // Use runInAction to modify observable data inside async functions
            runInAction(() => {
                this.data = roles.map((role: any) => ({
                    id:role.id,
                    name: role.name,
                }));
            });
        } catch (error) {
            console.error("Failed to fetch users:", error);
        }
    }

    addRole(role: Role) {
        this.data.push(role);
    }

}