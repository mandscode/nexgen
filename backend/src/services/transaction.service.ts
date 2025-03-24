import ProjectInvestor from '../models/project-investor';
import Transaction from '../models/transaction';
import { toTransactionDTO, toTransactionsDTO } from './transaction.mapper';

export class TransactionDTO {
    id?: number;
    details!: string;
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

    async addEarning(projectId: number, investorId: number, earning: number): Promise<{ message: string } | null> {
        if (!projectId || !investorId || earning === undefined) {
            return null; // Return null if any required input is missing
        }
    
        // Find the specific ProjectInvestor entry
        const projectInvestor = await ProjectInvestor.findOne({
            where: { projectId, investorId }
        });
    
        if (!projectInvestor) {
            throw new Error('ProjectInvestor record not found');
        }
    
        // Update the earning field
        await ProjectInvestor.update(
            { earning: (projectInvestor.earning || 0) + earning }, // Add earning to existing amount
            { where: { projectId, investorId } }
        );
    
        return { message: 'Successfully updated earning' };
    }
    
}

const transactionService = new TransactionService();

export default transactionService;