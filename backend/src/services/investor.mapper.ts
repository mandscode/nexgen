import { plainToInstance } from 'class-transformer';
import Investor from '../models/investor';
import { InvestorRespDTO } from './investor.service';
import { toAccountsDTO } from './account.mapper';
import { toProjectsDTO } from './project.mapper';
import { toResourcesDTO } from './resource.mapper';

export function toInvestorDTO(investor: Investor): InvestorRespDTO {
    const accounts = investor.dataValues.accounts;
    const projects = investor.dataValues.projects;
    const resources = investor.dataValues.resources;
    const documents = investor.dataValues.documents; // Assuming documents are stored in a JSON/array field
    delete investor.dataValues.accounts;
    delete investor.dataValues.projects;
    delete investor.dataValues.resources;
    delete investor.dataValues.documents;

    const investorDTO = plainToInstance(InvestorRespDTO, investor.dataValues);
    if (accounts) {
        const accountDTOs = toAccountsDTO(accounts);
        investorDTO.accounts = accountDTOs;
    }
    if (projects) {
        const projectDTOs = toProjectsDTO(projects);
        investorDTO.projects = projectDTOs;
    }
    if (resources) {
        const resourceDTOs = toResourcesDTO(resources);
        investorDTO.resources = resourceDTOs;
    }
    if (documents) {
        investorDTO.documents = documents; // Add documents to DTO
    }
    return investorDTO;
}

export function toInvestorsDTO(investors: Investor[]): InvestorRespDTO[] {
    return investors.map(investor => toInvestorDTO(investor))
}