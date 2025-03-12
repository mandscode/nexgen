"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyDTO = void 0;
const currency_1 = __importDefault(require("../models/currency"));
const currency_mapper_1 = require("./currency.mapper");
class CurrencyDTO {
}
exports.CurrencyDTO = CurrencyDTO;
class CurrencyService {
    createCurrency(currency) {
        return __awaiter(this, void 0, void 0, function* () {
            return currency_1.default.create(currency).then(currency => (0, currency_mapper_1.toCurrencyDTO)(currency));
        });
    }
    getAllCurrencies() {
        return __awaiter(this, void 0, void 0, function* () {
            return currency_1.default.findAll().then(currencies => (0, currency_mapper_1.toCurrenciesDTO)(currencies));
        });
    }
    getCurrencyById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return currency_1.default.findByPk(id).then(currency => currency ? (0, currency_mapper_1.toCurrencyDTO)(currency) : null);
        });
    }
    deleteCurrency(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const currency = yield currency_1.default.findByPk(id);
            if (currency) {
                yield currency.destroy(); // Deletes the currency
                return true;
            }
            return false;
        });
    }
    updateCurrency(id, currencyData) {
        return __awaiter(this, void 0, void 0, function* () {
            const currency = yield currency_1.default.findByPk(id);
            if (currency) {
                yield currency.update(currencyData);
                return (0, currency_mapper_1.toCurrencyDTO)(currency);
            }
            return null;
        });
    }
    getCurrencyByCode(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const currency = yield currency_1.default.findOne({ where: { code } });
            return currency ? (0, currency_mapper_1.toCurrencyDTO)(currency) : null;
        });
    }
    ensureCurrenciesExist() {
        return __awaiter(this, void 0, void 0, function* () {
            const currencies = [
                { code: "USD", name: "US Dollar", symbol: "$" },
                { code: "EUR", name: "Euro", symbol: "€" },
                { code: "GBP", name: "British Pound", symbol: "£" },
                { code: "INR", name: "Indian Rupee", symbol: "₹" },
                { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
                { code: "THB", name: "Thai Baht", symbol: "฿" }
            ];
            for (const currencyData of currencies) {
                const existingCurrency = yield this.getCurrencyByCode(currencyData.code);
                if (!existingCurrency) {
                    yield this.createCurrency(currencyData);
                    console.log(`Currency '${currencyData.name}' created.`);
                }
            }
        });
    }
}
const currencyService = new CurrencyService();
exports.default = currencyService;
