"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toAccountDTO = toAccountDTO;
exports.toAccountsDTO = toAccountsDTO;
const class_transformer_1 = require("class-transformer");
const account_service_1 = require("./account.service");
const investment_mapper_1 = require("./investment.mapper");
function toAccountDTO(account) {
    const investments = account.dataValues.investments;
    delete account.dataValues.investments;
    const accountDTO = (0, class_transformer_1.plainToInstance)(account_service_1.AccountRespDTO, account.dataValues);
    if (investments) {
        const investmentDTOs = (0, investment_mapper_1.toInvestmentsDTO)(investments);
        accountDTO.investments = investmentDTOs;
    }
    return accountDTO;
}
function toAccountsDTO(accounts) {
    return accounts.map(account => toAccountDTO(account));
}
