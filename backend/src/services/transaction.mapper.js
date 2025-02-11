"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toTransactionDTO = toTransactionDTO;
exports.toTransactionsDTO = toTransactionsDTO;
const class_transformer_1 = require("class-transformer");
const transaction_service_1 = require("./transaction.service");
function toTransactionDTO(transaction) {
    return (0, class_transformer_1.plainToInstance)(transaction_service_1.TransactionDTO, transaction.dataValues);
}
function toTransactionsDTO(transactions) {
    return transactions.map(transaction => toTransactionDTO(transaction));
}
