import { Get, Route, Post, Body, Path, Patch } from 'tsoa';
import accountService, { AccountReqDTO, AccountRespDTO } from '../services/account.service';


@Route('accounts')
export class AccountController {

    @Get('/')
    public async getAllAccounts(): Promise<AccountRespDTO[]> {
        return accountService.getAllAccounts();
    }

    @Get('{id}')
    public async getAccountById(@Path() id: number): Promise<AccountRespDTO | null> {
        return accountService.getAccountId(id);
    }

    @Get('/investor/{investorId}')
    public async getAccountsByInvestorId(@Path() investorId: number): Promise<AccountRespDTO[] | null> {
        return accountService.getAccountsByInvestorId(investorId);
    }

    @Post('/')
    public async createAccount(@Body() account: AccountReqDTO): Promise<AccountRespDTO | null> {
        return accountService.createAccount(account);
    }

    @Patch('{id}/remove-investor')
    public async removeInvestorFromAccount(@Path() id: number): Promise<AccountRespDTO | null> {
        return accountService.removeInvestorFromAccount(id);
    }

}