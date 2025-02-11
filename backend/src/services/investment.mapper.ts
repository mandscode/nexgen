import { plainToInstance } from 'class-transformer';
import Investment from '../models/investment';
import { InvestmentDTO } from './investment.service';

export function toInvestmentDTO(investment: Investment): InvestmentDTO {
    return plainToInstance(InvestmentDTO, investment.dataValues);
}

export function toInvestmentsDTO(investments: Investment[]): InvestmentDTO[] {
    return investments.map(investment => toInvestmentDTO(investment))
}