import Account from '../models/account';
import Investor from '../models/investor';
import Project from '../models/project';
import Resource from '../models/resource';
import { AccountRespDTO } from './account.service';
import { toInvestorDTO, toInvestorsDTO } from './investor.mapper';
import { ProjectRespDTO } from './project.service';
import { ResourceDTO } from './resource.service';

import { v4 as uuidv4 } from 'uuid';



export class InvestorReqDTO {
    id?: number;
    nomineeDetails?: { [key: string]: any };
    emergencyContact!: { [key: string]: any };
    personalDetails?: { [key: string]: any };
    userId!: number;
    settings?: { [key: string]: any };
    ownerId?: string;
    caId?: string;
    projectIds!: number[];
    resourceIds?: number[];
    documents?: { id: string; docName: string; docUrl: string; status: boolean }[]; // Added documents field
}

export class InvestorRespDTO {
    id?: number;
    nomineeDetails?: { [key: string]: any };
    emergencyContact!: { [key: string]: any };
    personalDetails?: { [key: string]: any };
    userId!: number;
    ownerId?: string;
    caId?: string;
    settings?: { [key: string]: any };
    accounts?: AccountRespDTO[];
    projects?: ProjectRespDTO[];
    resources?: ResourceDTO[];
    documents?: { id: string; docName: string; docUrl: string; status: boolean }[]; // Added documents field
}

class InvestorService {
    async updateInvestorNomineeDetails(investorId: number, nomineeDetails: { [id: string]: any; }): Promise<InvestorRespDTO | null> {
        await Investor.update({ nomineeDetails }, { where: { id: investorId } });
        return this.getInvestorById(investorId);
    }

    async updateInvestorEmergencyContact(investorId: number, emergencyContact: { [id: string]: any; }): Promise<InvestorRespDTO | null> {
        await Investor.update({ emergencyContact }, { where: { id: investorId } });
        return this.getInvestorById(investorId);
    }

    async updateInvestorPersonalDetails(investorId: number, personalDetails: { [id: string]: any; }): Promise<InvestorRespDTO | null> {
        await Investor.update({ personalDetails }, { where: { id: investorId } });
        return this.getInvestorById(investorId);
    }

    async assignProjects(investorId: number, projectIds: number[]): Promise<InvestorRespDTO | null> {


        if (projectIds) {
            await (await Investor.findByPk(investorId))?.setProjects(projectIds);
            return this.getInvestorById(investorId);
        }
        return null;
    }
    async updateInvestor(investor: InvestorReqDTO): Promise<InvestorRespDTO | null> {
        if (investor.id) {
            await Investor.update(investor, { where: { id: investor.id } });
            return this.getInvestorById(investor.id);
        }
        return null;
    }
    async createInvestor(investor: InvestorReqDTO): Promise<InvestorRespDTO | null> {
        const projectIds = investor.projectIds;
        const resourceIds = investor.resourceIds;
        const createdInvestor = await Investor.create({ ...investor });
        let projects: Project[] = [];
        let resources: Resource[] = [];
        if (createdInvestor) {

            if (projectIds) {
                projects = (await Promise.all(projectIds.map((id) => Project.findByPk(id)))).filter(project => !!project);
            }
            if (projects.length) {
                await createdInvestor.addProjects(projects);
            }
            if (resourceIds) {
                resources = (await Promise.all(resourceIds.map((id) => Resource.findByPk(id)))).filter(resource => !!resource);
            }
            if (resources.length) {
                await createdInvestor.addResources(resources);
            }
            return this.getInvestorById(createdInvestor.id);
        }

        return null;
    }

    async getAllInvestors(): Promise<InvestorRespDTO[]> {
        return Investor.findAll().then(investors => toInvestorsDTO(investors));
    }

    async getInvestorById(id: number): Promise<InvestorRespDTO | null> {
        return Investor.findByPk(id, { include: [Account, Project] }).then(investor => investor ? toInvestorDTO(investor) : null);
    }

    async addDocumentDetails(id: number, docDetails: { id?: string; docName: string; docUrl: string; status: boolean }): Promise<InvestorRespDTO | null> {
        const investor = await Investor.findByPk(id);
        if (!investor) {
            throw new Error('Investor not found');
        }

        // Add a unique ID to the document
        const documentWithId = {
            ...docDetails,
            id: docDetails.id || uuidv4(),
        };

        // Assuming `documents` is a relation or JSON field in the `Investor` model
        const updatedDocuments = [...(investor.documents || []), documentWithId];
        investor.documents = updatedDocuments;
        await investor.save();
        return toInvestorDTO(investor);
    }

    async updateDocumentById(investorId: number, documentId: string, updates: Partial<{ docName: string; docUrl: string; status: boolean }>): Promise<InvestorRespDTO | null> {
        const investor = await Investor.findByPk(investorId);
        if (!investor) {
            throw new Error('Investor not found');
        }

        let documentsArray = typeof investor.documents === 'string' 
        ? JSON.parse(investor.documents) 
        : investor.documents;

          if (!Array.isArray(documentsArray)) {
                throw new Error('Documents is not an array');
            }

            const documentIndex = documentsArray?.findIndex((doc: any) => doc.id === documentId);

            if (documentIndex === undefined || documentIndex < 0) {
                throw new Error('Document not found');
            }
            
            // Update the document
            documentsArray[documentIndex] = {
                ...documentsArray[documentIndex],
                ...updates
            };
            
            investor.documents = documentsArray; // Ensure correct format before saving
        // Explicitly mark the 'documents' field as changed
        investor.changed('documents', true);

        // Save the changes
        await investor.save();

        // Return updated investor data
        return toInvestorDTO(investor);
    }

    async deleteDocumentById(investorId: number, documentId: string): Promise<InvestorRespDTO | null> {
        const investor = await Investor.findByPk(investorId);
        if (!investor) {
            throw new Error('Investor not found');
        }

        const updatedDocuments = investor.documents?.filter((doc) => doc.id !== documentId);
        if (updatedDocuments?.length === investor.documents?.length) {
            throw new Error('Document not found');
        }

        investor.documents = updatedDocuments;
        await investor.save();
        return toInvestorDTO(investor);
    }


    async getDocumentsByInvestorId(id: number): Promise<{ docName: string; docUrl: string }[]> {
        const investor = await Investor.findByPk(id);
        if (!investor) {
            throw new Error('Investor not found');
        }
        return investor.documents || [];
    }
}

const investorService = new InvestorService();

export default investorService;