import { makeAutoObservable } from "mobx"
import { TransactionDTO } from "./AddTransactions";
import { TransactionHistoryStore } from "../TransactionHistory/TransactionHistoryStore";
import { NavigateFunction } from "react-router-dom";
import { createEarning, createTransactions } from "../../api/apiEndpoints";
// import { createTransactions } from "../../api/apiEndpoints";

export class AddTransactionsStore {
    
    constructor() {
        makeAutoObservable(this);
    }

    async addTransaction(values: TransactionDTO, _: TransactionHistoryStore, navigate: NavigateFunction, transactionList:any, investrId:number) {

        let formattedValue = {
            details:values.details,
            projectId: values.projectId,
            accountId: values.accountId,
            amount: values.amount,
            credited: values.credited,
            intrestRate: 0,
            transactionDate:values.transactionDate
        };
        
        // Handle bonus (earning)
        if (values.credited.toLowerCase() === 'bonus') {
            // 1. Update earning
            const earningValue = {
                amount: values.amount,
                investorId: investrId,
                projectId: values.projectId
            };
            await createEarning(earningValue); // ✅ API to update ProjectInvestor.earning

            // 2. Create bonus transaction
            formattedValue = {
                ...formattedValue,
                details: 'bonus',
                credited: 'true', // Make sure it's a string if your API expects that
            };
        }

        await createTransactions(formattedValue);

        transactionList(false);

        navigate("/investors");

    }
}