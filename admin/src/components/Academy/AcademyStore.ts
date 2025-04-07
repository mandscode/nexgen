import { makeAutoObservable, runInAction } from "mobx";
import { getAcademies } from "../../api/apiEndpoints";
import { Academy } from "./Academy";


export class AcademyStore {
    data: Academy[] = []; // Initialize as empty array

    constructor() {
        makeAutoObservable(this);
        this.fetchAcademies();
    }

    // Fetch academies from the API
    async fetchAcademies() {
        try {
            const academies = await getAcademies();

            // Use runInAction to modify observable data inside async functions
            runInAction(() => {
                this.data = academies.map((academy: any) => ({
                    id: academy.id,
                    entityID:academy.entityID,
                    title: academy.title,
                    imageUrl: academy.imageUrl,
                    description: academy.description
                }));
            });
        } catch (error) {
            console.error("Failed to fetch academies:", error);
        }
    }

    addAcademy(academy: Academy) {
        this.data.push(academy);
    }
}
