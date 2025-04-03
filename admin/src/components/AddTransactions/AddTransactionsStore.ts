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
        
        if(values.credited.toLowerCase() == "bonus") {
            const formattedValue = {
                amount: values.amount,
                investorId:investrId,
                projectId: values.projectId
            };

            await createEarning(formattedValue);
    
            transactionList(false);
    
            navigate("/investors");
        }
        else {
            const formattedValue = {
                details:values.details,
                projectId: values.projectId,
                accountId: values.accountId,
                amount: values.amount,
                credited: values.credited,
                intrestRate: 0,
                transactionDate:values.transactionDate
            };
            await createTransactions(formattedValue);
    
            transactionList(false);
    
            navigate("/investors");

        }

    }
}