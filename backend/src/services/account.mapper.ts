import { plainToInstance } from 'class-transformer';
import Account from '../models/account';
import { AccountRespDTO } from './account.service';
import { toInvestmentsDTO } from './investment.mapper';

export function toAccountDTO(account: Account): AccountRespDTO {
    const investments = account.dataValues.investments;
    delete account.dataValues.investments;
    const accountDTO = plainToInstance(AccountRespDTO, account.dataValues);
    if (investments) {
        const investmentDTOs = toInvestmentsDTO(investments);
        accountDTO.investments = investmentDTOs;
    }
    return accountDTO;
}

export function toAccountsDTO(accounts: Account[]): AccountRespDTO[] {
    return accounts.map(account => toAccountDTO(account))
}