import { makeAutoObservable, runInAction  } from "mobx";
import { Entity } from "./Entity";
import { getEntities } from "../../api/apiEndpoints";

export class EntityStore {
    data: Entity[] = []; // Initialize as empty array

    constructor() {
        makeAutoObservable(this);
        this.fetchEntities();
    }

    async fetchEntities() {
        try {
          const entities = await getEntities();
          // Use runInAction to modify observable data inside async functions
          runInAction(() => {
            this.data = entities.map((entity: any) => ({
                id: entity.id,
                name: entity.name,
                address: entity.address,
                country: entity.country,
                regId: entity.regId,
                ownerId: entity.ownerId,
                caId: entity.caId
            }));
          });
        } catch (error) {
          console.error("Failed to fetch users:", error);
        }
    }

    addEntity(entity: Entity) {
        this.data.push(entity);
    }
}