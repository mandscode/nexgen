import { Get, Route, Post, Body, Path } from 'tsoa';
import investmentService, { InvestmentDTO } from '../services/investment.service';


@Route('investments')
export class InvestmentController {

    @Get('/')
    public async getAllInvestments(): Promise<InvestmentDTO[]> {
        return investmentService.getAllInvestments();
    }

    @Get('{id}')
    public async getInvestmentById(@Path() id: number): Promise<InvestmentDTO | null> {
        return investmentService.getInvestmentId(id);
    }

    @Post('/')
    public async createInvestment(@Body() investment: InvestmentDTO): Promise<InvestmentDTO | null> {
        return investmentService.createInvestment(investment);
    }
}