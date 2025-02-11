import { plainToInstance } from 'class-transformer';
import Transaction from '../models/transaction';
import { TransactionDTO } from './transaction.service';

export function toTransactionDTO(transaction: Transaction): TransactionDTO {
    return plainToInstance(TransactionDTO, transaction.dataValues);
}

export function toTransactionsDTO(transactions: Transaction[]): TransactionDTO[] {
    return transactions.map(transaction => toTransactionDTO(transaction))
}