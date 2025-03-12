import { plainToInstance } from 'class-transformer';
import Currency from '../models/currency';
import { CurrencyDTO } from './currency.service';

export function toCurrencyDTO(currency: Currency): CurrencyDTO {
    return plainToInstance(CurrencyDTO, currency.dataValues);
}

export function toCurrenciesDTO(currencies: Currency[]): CurrencyDTO[] {
    return currencies.map(currency => plainToInstance(CurrencyDTO, currency.dataValues));
}
