"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCurrencyDTO = toCurrencyDTO;
exports.toCurrenciesDTO = toCurrenciesDTO;
const class_transformer_1 = require("class-transformer");
const currency_service_1 = require("./currency.service");
function toCurrencyDTO(currency) {
    return (0, class_transformer_1.plainToInstance)(currency_service_1.CurrencyDTO, currency.dataValues);
}
function toCurrenciesDTO(currencies) {
    return currencies.map(currency => (0, class_transformer_1.plainToInstance)(currency_service_1.CurrencyDTO, currency.dataValues));
}
