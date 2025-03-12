import Currency from '../models/currency';
import { toCurrencyDTO, toCurrenciesDTO } from './currency.mapper';

export class CurrencyDTO {
    id?: number;
    code!: string;
    name!: string;
    symbol!: string;
}

class CurrencyService {
    async createCurrency(currency: CurrencyDTO): Promise<CurrencyDTO> {
        return Currency.create(currency).then(currency => toCurrencyDTO(currency));
    }

    async getAllCurrencies(): Promise<CurrencyDTO[]> {
        return Currency.findAll().then(currencies => toCurrenciesDTO(currencies));
    }

    async getCurrencyById(id: number): Promise<CurrencyDTO | null> {
        return Currency.findByPk(id).then(currency => currency ? toCurrencyDTO(currency) : null);
    }

    async deleteCurrency(id: number): Promise<boolean> {
        const currency = await Currency.findByPk(id);
        if (currency) {
            await currency.destroy();  // Deletes the currency
            return true;
        }
        return false;
    }

    async updateCurrency(id: number, currencyData: Partial<CurrencyDTO>): Promise<CurrencyDTO | null> {
        const currency = await Currency.findByPk(id);

        if (currency) {
            await currency.update(currencyData);
            return toCurrencyDTO(currency);
        }
        return null;
    }

    async getCurrencyByCode(code: string): Promise<CurrencyDTO | null> {
        const currency = await Currency.findOne({ where: { code } });
        return currency ? toCurrencyDTO(currency) : null;
    }

    async ensureCurrenciesExist() {
        const currencies = [
            { code: "USD", name: "US Dollar", symbol: "$" },
            { code: "EUR", name: "Euro", symbol: "€" },
            { code: "GBP", name: "British Pound", symbol: "£" },
            { code: "INR", name: "Indian Rupee", symbol: "₹" },
            { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
            { code: "THB", name: "Thai Baht", symbol: "฿" }
        ];
        for (const currencyData of currencies) {
            const existingCurrency = await this.getCurrencyByCode(currencyData.code);
            if (!existingCurrency) {
                await this.createCurrency(currencyData);
                console.log(`Currency '${currencyData.name}' created.`);
            }
        }
    }
}

const currencyService = new CurrencyService();

export default currencyService;
