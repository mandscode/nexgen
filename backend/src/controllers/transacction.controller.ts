import { Get, Route, Post, Body, Path, Put } from 'tsoa';
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

    @Put('/{id}/earning')
    public async addEarning(
        @Path('id') id: number,
        @Body() body: { investorId:number, earning: number; }
    ): Promise<{ message: string }> {
        await transactionService.addEarning(id, body.investorId, body.earning);
        return { message: "Earning updated successfully." };
    }
}