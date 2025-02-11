import Investment from '../models/investment';
import { toInvestmentDTO, toInvestmentsDTO } from './investment.mapper';

export class InvestmentDTO {
    id?: number;
    investmentType!: string;
    amount!: number;
    accountId!: number;
    modifiedBy?: string;
}

class InvestmentService {
    async createInvestment(investment: InvestmentDTO): Promise<InvestmentDTO> {
        return Investment.create(investment).then(investment => toInvestmentDTO(investment));
    }

    async getAllInvestments(): Promise<InvestmentDTO[]> {
        return Investment.findAll().then(investments => toInvestmentsDTO(investments));
    }

    async getInvestmentId(id: number): Promise<InvestmentDTO | null> {
        return Investment.findByPk(id).then(investment => investment ? toInvestmentDTO(investment) : null);
    }
}

const investmentService = new InvestmentService();

export default investmentService;