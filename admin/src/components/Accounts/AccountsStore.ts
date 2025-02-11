import { makeAutoObservable } from "mobx"

export class AccountsStore {
    
    constructor() {
        makeAutoObservable(this);
    }
}