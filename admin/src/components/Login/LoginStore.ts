import { makeAutoObservable } from "mobx";
import { AppStore } from "../../AppStore";
import { NavigateFunction } from "react-router-dom";


export interface LoginForm {
    email: string;
    password: string;
  }

export class LoginStore {

    
    
    constructor() {
        makeAutoObservable(this);
    }

    login(_: LoginForm, appStore: AppStore, navigate: NavigateFunction) {
        appStore.setAuthenticated(true);
        navigate("/");
    }
}