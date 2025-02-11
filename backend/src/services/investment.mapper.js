"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toInvestmentDTO = toInvestmentDTO;
exports.toInvestmentsDTO = toInvestmentsDTO;
const class_transformer_1 = require("class-transformer");
const investment_service_1 = require("./investment.service");
function toInvestmentDTO(investment) {
    return (0, class_transformer_1.plainToInstance)(investment_service_1.InvestmentDTO, investment.dataValues);
}
function toInvestmentsDTO(investments) {
    return investments.map(investment => toInvestmentDTO(investment));
}
