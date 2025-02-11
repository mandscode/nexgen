import { makeAutoObservable, runInAction } from "mobx"
import { NavigateFunction } from "react-router-dom";
import { UpdateUserAccount } from "./UpdateUserAccountDetails";
import { getUser, uploadUserAccount } from "../../api/apiEndpoints";
import { UserDetailStore } from "../UserDetail/UserDetailStore";

export class UpdateUserAccountDetailsStore {
    
    constructor() {
        makeAutoObservable(this);
    }

    async updateDetails (data:UpdateUserAccount, navigate:NavigateFunction, id:number, user:UpdateUserAccount, rolesStore:UserDetailStore, setUserAccountlistShow:any) {

        try {
            if(user?.roleIds) {
                // Prepare roles as an array
                const formattedValues = {
                    ...data,
                    id:id,
                    roleIds: user?.roleIds.map((role) => role.id), // Map roleIds to their actual IDs
                    status:user.status
                };

                await uploadUserAccount(formattedValues);

                const uniqueUser = await getUser(Number(id));

                // Update the observable accountdata property directly
                await runInAction(() => {
                    rolesStore.data = uniqueUser;
                });

                setUserAccountlistShow(false)
                alert('Account details updated')

            }
            

            // Navigate to the users list after successful creation
            // navigate("/projects");
        } catch (error) {
            console.error('Error adding user:', error);
        }
    }
}