import { makeAutoObservable } from "mobx"

export class NexGenTableStore {
    
    constructor() {
        makeAutoObservable(this);
    }
}