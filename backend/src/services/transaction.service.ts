import Transaction from '../models/transaction';
import { toTransactionDTO, toTransactionsDTO } from './transaction.mapper';

export class TransactionDTO {
    id?: number;
    details!: { [key: string]: any };
    projectId!: number;
    accountId!: number;
    amount!: number;
    credited!: boolean;
    modifiedBy?: string;
    intrestRate!: number;
    transactionDate?: Date; // New field
}

class TransactionService {
    async createTransaction(transaction: TransactionDTO): Promise<TransactionDTO> {
        return Transaction.create(transaction).then(transaction => toTransactionDTO(transaction));
    }

    async getAllTransactions(): Promise<TransactionDTO[]> {
        return Transaction.findAll().then(transactions => toTransactionsDTO(transactions));
    }

    async getTransactionId(id: number): Promise<TransactionDTO | null> {
        return Transaction.findByPk(id).then(transaction => transaction ? toTransactionDTO(transaction) : null);
    }
}

const transactionService = new TransactionService();

export default transactionService;