import { makeAutoObservable, runInAction } from "mobx"

import { getInvestor, getInvestors, getUser } from "../../api/apiEndpoints";

import { InvestorInterface } from "./Investor";

export class InvestorStore {
    data: InvestorInterface[] = []; // Initialize as empty array

    constructor() {
        makeAutoObservable(this);
        this.fetchInvestments();
    }

    async fetchInvestments() {
        try {
            const investors = await getInvestors();

            const investorData = await Promise.all(investors.map(async (investor: any) => {
                // Fetch user details asynchronously
                const userDetails = await getUser(Number(investor.userId));
                const investorDetail = await getInvestor(Number(investor.id));
                // Return the transformed data
                return {
                    firstName: userDetails.firstName,
                    lastName: userDetails.lastName,
                    email: userDetails.email,
                    accountInfo:investorDetail?.accounts?.length > 0 ? investor.id : investor.id,
                    details:investor.id,
                };
            }));
    
            // Use runInAction to update MobX state
            runInAction(() => {
                this.data = investorData;
            });

        } catch (error) {
            console.error("Failed to fetch users:", error);
        }
    }
}