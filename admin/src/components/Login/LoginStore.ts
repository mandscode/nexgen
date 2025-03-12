import { makeAutoObservable } from "mobx";
import { AppStore } from "../../AppStore";
import { NavigateFunction } from "react-router-dom";
import api from "../../api/api";
import { getUser } from "../../api/apiEndpoints";


export interface LoginForm {
    email: string;
    password: string;
  }

export class LoginStore {

    
    
    constructor() {
        makeAutoObservable(this);
    }

    async login(data: LoginForm, appStore: AppStore, navigate: NavigateFunction, setShowModal:any, setUserId:any) {
        try {
            const response = await api.post('/users/login', data);
            const { token, message, userId, isMasterAdmin, isFirstLogin } = response.data;

            const user = await getUser(userId);
            if(user.roles) {
                let isAdmin = user.roles.find((role:any) => role.name === "Admin");
                let isMasterdmin = user.roles.find((role:any) => role.name === "Master Admin");

                if (isMasterdmin || isAdmin) {
        
                    if (isFirstLogin) {
                        setUserId(userId);
                        setShowModal(true);
                            // Use consistent key name 'userId'
                            await Promise.resolve(localStorage.removeItem('userIds'));
                            await Promise.resolve(localStorage.setItem('userIds', String(userId)));
                            } else if (token && response.data.userId) {
                            // Store token and userId in localStorage
                            await Promise.resolve(localStorage.setItem('token', token));
                            await Promise.resolve(localStorage.removeItem('userIds'));
                            await Promise.resolve(localStorage.setItem('userIds', String(userId))); // Use consistent key name 'userId'
                            await Promise.resolve(localStorage.setItem('isMasterAdmin', isMasterAdmin));
                            
                            if(localStorage.getItem('userIds')) {
                                appStore.setAuthenticated(true);
                                navigate("/dashboard");
                            }
                            // Update app state and navigate
                    }

                } else {
                    alert("You have not permission to login")
                    
                }
                }

            // Redirect to the dashboard or home page
        } catch (err) {
            alert('Invalid email or password'); // Handle errors
        }
    }
}