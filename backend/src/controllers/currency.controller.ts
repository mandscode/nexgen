import { Get, Route, Post, Body, Path, Delete, Put } from 'tsoa';
import currencyService, { CurrencyDTO } from '../services/currency.service';

@Route('currencies')
export class CurrencyController {

    @Get('/')
    public async getAllCurrencies(): Promise<CurrencyDTO[]> {
        return currencyService.getAllCurrencies();
    }

    @Get('{id}')
    public async getCurrencyById(@Path() id: number): Promise<CurrencyDTO | null> {
        return currencyService.getCurrencyById(id);
    }

    @Post('/')
    public async createCurrency(@Body() currency: CurrencyDTO): Promise<CurrencyDTO> {
        return currencyService.createCurrency(currency);
    }

    @Delete('{id}')
    public async deleteCurrency(@Path() id: number): Promise<{ message: string }> {
        const isDeleted = await currencyService.deleteCurrency(id);
        if (isDeleted) {
            return { message: 'Currency deleted successfully' };
        } else {
            throw new Error('Currency not found');
        }
    }

    @Put('{id}')
    public async updateCurrency(@Path() id: number, @Body() currencyData: Partial<CurrencyDTO>): Promise<CurrencyDTO | null> {
        const updatedCurrency = currencyService.updateCurrency(id, currencyData);

        if (updatedCurrency) {
            return updatedCurrency;
        } else {
            throw new Error('Currency not found or update failed');
        }
    }
}