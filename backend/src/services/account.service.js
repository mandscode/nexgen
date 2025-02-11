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
exports.AccountRespDTO = exports.AccountReqDTO = void 0;
const account_1 = __importDefault(require("../models/account"));
const transaction_1 = __importDefault(require("../models/transaction"));
const account_mapper_1 = require("./account.mapper");
class AccountReqDTO {
}
exports.AccountReqDTO = AccountReqDTO;
class AccountRespDTO {
}
exports.AccountRespDTO = AccountRespDTO;
class AccountService {
    getAccountsByInvestorId(investorId) {
        return __awaiter(this, void 0, void 0, function* () {
            return account_1.default.findAll({ where: { investorId }, include: [transaction_1.default] }).then(accounts => (0, account_mapper_1.toAccountsDTO)(accounts));
        });
    }
    createAccount(account) {
        return __awaiter(this, void 0, void 0, function* () {
            return account_1.default.create(account).then(account => (0, account_mapper_1.toAccountDTO)(account));
        });
    }
    getAllAccounts() {
        return __awaiter(this, void 0, void 0, function* () {
            return account_1.default.findAll().then(accounts => (0, account_mapper_1.toAccountsDTO)(accounts));
        });
    }
    getAccountId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return account_1.default.findByPk(id, { include: [transaction_1.default] }).then(account => account ? (0, account_mapper_1.toAccountDTO)(account) : null);
        });
    }
    removeInvestorFromAccount(accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield account_1.default.findByPk(accountId);
            if (!account) {
                throw new Error('Account not found');
            }
            // Set investorId to null
            account.investorId = null;
            yield account.save();
            return (0, account_mapper_1.toAccountDTO)(account);
        });
    }
}
const accountService = new AccountService();
exports.default = accountService;
