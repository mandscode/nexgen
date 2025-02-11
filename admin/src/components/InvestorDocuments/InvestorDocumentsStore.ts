import { makeAutoObservable } from "mobx"

export class InvestorDocumentsStore {
    
    constructor() {
        makeAutoObservable(this);
    }
}