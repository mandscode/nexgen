
import Account from '../models/account';
import Transaction from '../models/transaction';
import { toAccountDTO, toAccountsDTO } from './account.mapper';
import { CurrencyDTO } from './currency.service';
import { InvestmentDTO } from './investment.service';
import { TransactionDTO } from './transaction.service';

export class AccountReqDTO {
    id?: number;
    currency!: number;
    investorId!: number;
}

export class AccountRespDTO {
    id?: number;
    currency!: number;
    currencyDetails?:CurrencyDTO;
    investorId!: number;
    transactions?: TransactionDTO[];
    investments?: InvestmentDTO[];
}

class AccountService {
    async getAccountsByInvestorId(investorId: number): Promise<AccountRespDTO[] | null> {
        return Account.findAll({ where: { investorId }, include: [Transaction] }).then(accounts => toAccountsDTO(accounts));
    }
    async createAccount(account: AccountReqDTO): Promise<AccountReqDTO> {
        return Account.create(account).then(account => toAccountDTO(account));
    }

    async getAllAccounts(): Promise<AccountReqDTO[]> {
        return Account.findAll().then(accounts => toAccountsDTO(accounts));
    }

    async getAccountId(id: number): Promise<AccountReqDTO | null> {
        return Account.findByPk(id, { include: [Transaction] }).then(account => account ? toAccountDTO(account) : null);
    }

    async removeInvestorFromAccount(accountId: number): Promise<AccountRespDTO | null> {
        const account = await Account.findByPk(accountId);
        if (!account) {
            throw new Error('Account not found');
        }
    
        // Set investorId to null
        account.investorId = null;
        await account.save();
    
        return toAccountDTO(account);
    }    
}

const accountService = new AccountService();

export default accountService;