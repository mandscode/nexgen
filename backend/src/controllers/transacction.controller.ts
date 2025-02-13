import { Get, Route, Post, Body, Path } from 'tsoa';
import transactionService, { TransactionDTO } from '../services/transaction.service';


@Route('transactions')
export class TransactionController {

    @Get('/')
    public async getAllTransactions(): Promise<TransactionDTO[]> {
        return transactionService.getAllTransactions();
    }

    @Get('{id}')
    public async getTransactionById(@Path() id: number): Promise<TransactionDTO | null> {
        return transactionService.getTransactionId(id);
    }

    @Post('/')
    public async createTransaction(@Body() transaction: TransactionDTO): Promise<TransactionDTO | null> {
        return transactionService.createTransaction(transaction);
    }
}