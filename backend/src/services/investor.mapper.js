"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toInvestorDTO = toInvestorDTO;
exports.toInvestorsDTO = toInvestorsDTO;
const class_transformer_1 = require("class-transformer");
const investor_service_1 = require("./investor.service");
const account_mapper_1 = require("./account.mapper");
const project_mapper_1 = require("./project.mapper");
const resource_mapper_1 = require("./resource.mapper");
function toInvestorDTO(investor) {
    const accounts = investor.dataValues.accounts;
    const projects = investor.dataValues.projects;
    const resources = investor.dataValues.resources;
    const documents = investor.dataValues.documents; // Assuming documents are stored in a JSON/array field
    delete investor.dataValues.accounts;
    delete investor.dataValues.projects;
    delete investor.dataValues.resources;
    delete investor.dataValues.documents;
    const investorDTO = (0, class_transformer_1.plainToInstance)(investor_service_1.InvestorRespDTO, investor.dataValues);
    if (accounts) {
        const accountDTOs = (0, account_mapper_1.toAccountsDTO)(accounts);
        investorDTO.accounts = accountDTOs;
    }
    if (projects) {
        const projectDTOs = (0, project_mapper_1.toProjectsDTO)(projects);
        investorDTO.projects = projectDTOs;
    }
    if (resources) {
        const resourceDTOs = (0, resource_mapper_1.toResourcesDTO)(resources);
        investorDTO.resources = resourceDTOs;
    }
    if (documents) {
        investorDTO.documents = documents; // Add documents to DTO
    }
    return investorDTO;
}
function toInvestorsDTO(investors) {
    return investors.map(investor => toInvestorDTO(investor));
}
