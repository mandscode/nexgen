import { makeAutoObservable } from "mobx"

export class TransactionHistoryStore {
    
    constructor() {
        makeAutoObservable(this);
    }
}