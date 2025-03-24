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
exports.TransactionDTO = void 0;
const project_investor_1 = __importDefault(require("../models/project-investor"));
const transaction_1 = __importDefault(require("../models/transaction"));
const transaction_mapper_1 = require("./transaction.mapper");
class TransactionDTO {
}
exports.TransactionDTO = TransactionDTO;
class TransactionService {
    createTransaction(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            return transaction_1.default.create(transaction).then(transaction => (0, transaction_mapper_1.toTransactionDTO)(transaction));
        });
    }
    getAllTransactions() {
        return __awaiter(this, void 0, void 0, function* () {
            return transaction_1.default.findAll().then(transactions => (0, transaction_mapper_1.toTransactionsDTO)(transactions));
        });
    }
    getTransactionId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return transaction_1.default.findByPk(id).then(transaction => transaction ? (0, transaction_mapper_1.toTransactionDTO)(transaction) : null);
        });
    }
    addEarning(projectId, investorId, earning) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!projectId || !investorId || earning === undefined) {
                return null; // Return null if any required input is missing
            }
            // Find the specific ProjectInvestor entry
            const projectInvestor = yield project_investor_1.default.findOne({
                where: { projectId, investorId }
            });
            if (!projectInvestor) {
                throw new Error('ProjectInvestor record not found');
            }
            // Update the earning field
            yield project_investor_1.default.update({ earning: (projectInvestor.earning || 0) + earning }, // Add earning to existing amount
            { where: { projectId, investorId } });
            return { message: 'Successfully updated earning' };
        });
    }
}
const transactionService = new TransactionService();
exports.default = transactionService;
