import { makeAutoObservable } from "mobx"
import { TransactionDTO } from "./AddTransactions";
import { TransactionHistoryStore } from "../TransactionHistory/TransactionHistoryStore";
import { NavigateFunction } from "react-router-dom";
import { createTransactions } from "../../api/apiEndpoints";
// import { createTransactions } from "../../api/apiEndpoints";

export class AddTransactionsStore {
    
    constructor() {
        makeAutoObservable(this);
    }

    async addTransaction(values: TransactionDTO, _: TransactionHistoryStore, navigate: NavigateFunction, transactionList:any) {
        
        const formattedValue = {
            details: {
                [String(values.details)]: values.amount // Using values.details as the key and values.amount as the value
            },
            projectId: values.projectId,
            accountId: values.accountId,
            amount: values.amount,
            credited: values.credited,
            intrestRate: values.intrestRate,
            transactionDate:values.transactionDate
        };


        await createTransactions(formattedValue);

        transactionList(false);
        // transactionHistoryStore.addUser(createdUser);

        // Navigate to the users list after successful creation
        navigate("/investors");
    }
}