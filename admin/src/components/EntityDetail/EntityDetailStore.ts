import { makeAutoObservable } from "mobx"

export class EntityDetailStore {
    
    constructor() {
        makeAutoObservable(this);
    }
}