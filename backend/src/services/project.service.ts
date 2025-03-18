import { Transform } from 'class-transformer';
import { parse } from 'date-fns';
import Entity from '../models/entity';
import Project from '../models/project';
import { toProjectDTO, toProjectsDTO } from './project.mapper';
import { EntityDTO } from './entity.service';
import { ResourceDTO } from './resource.service';
import Resource from '../models/resource';
import Investor from '../models/investor';
import { InvestorRespDTO } from './investor.service';

export class ProjectReqDTO {
    id?: number;
    name!: string;
    address!: string;
    latitude?: number;
    countryName!: string;
    longitude?: number;
    startDate!: string;
    actualMaturityDate?: string;
    overallCost?: number;
    description?: string;
    ownerName?: string;
    legalId?: string;
    maturityLockingPeriod?: number;
    settings?: { [key: string]: any };
    entityID!: number;
    resourceIds?: number[];
}
export class ProjectRespDTO {
    id?: number;
    name!: string;
    address!: string;
    countryName!: string;
    latitude?: number;
    longitude?: number;
    startDate!: Date;
    actualMaturityDate?: Date;
    overallCost?: number;
    description?: string;
    ownerName?: string;
    legalId?: string;
    maturityLockingPeriod?: number;
    settings?: { [key: string]: any };
    entity!: EntityDTO;
    resources?: ResourceDTO[];
    investors?: InvestorRespDTO[];
}

class ProjectService {
    async createProject(project: ProjectReqDTO): Promise<ProjectRespDTO | null> {
        let resources: Resource[] = [];
        if (project.resourceIds) {
            resources = (await Promise.all(project.resourceIds.map((resourceId) => Resource.findByPk(resourceId)))).filter(resource => !!resource);
        }
        const entity = await Entity.findByPk(project.entityID)
        if (entity) {
            const createdProject = await Project.create({
                ...project,
                startDate: parse(project.startDate, "dd/MM/yyyy", new Date()),
                actualMaturityDate: parse(project.startDate, "dd/MM/yyyy", new Date()),
                settings: project.settings
            });

            if (resources.length) {
                await createdProject.addResources(resources);
            }

            return this.getProjectById(createdProject.id);
        }

        return null;

    }

    async getAllProjects(): Promise<ProjectRespDTO[]> {
        return Project.findAll().then(projects => toProjectsDTO(projects));
    }

    async getProjectById(id: number): Promise<ProjectRespDTO | null> {
        return Project.findByPk(id, { include: [Entity, Resource, Investor] }).then(project => project ? toProjectDTO(project) : null);
    }

    async getProjectsByEntityId(id: number): Promise<ProjectRespDTO[] | null> {
        return Project.findAll({ where: { entityID: id } })
            .then(projects => projects.length ? projects.map(toProjectDTO) : null);
    }


    async updateProject(
        id: number,
        updateData: {
            address?: string,
            description?: string,
            overallCost?: number,
            maturityLockingPeriod?: number,
            ownerName?: string,
            settings?: { [key: string]: any }
        }
    ): Promise<ProjectRespDTO | null> {
        const project = await Project.findByPk(id);
        if (project) {
            if (updateData.address) project.address = updateData.address;
            if (updateData.description) project.description = updateData.description;
            if (updateData.overallCost !== undefined) project.overallCost = updateData.overallCost;
            if (updateData.maturityLockingPeriod !== undefined) project.maturityLockingPeriod = updateData.maturityLockingPeriod;
            if (updateData.ownerName) project.ownerName = updateData.ownerName;
            if (updateData.settings) project.settings = updateData.settings;

            await project.save(); // Save the updated project

            return toProjectDTO(project);
        }
        return null;
    }
}

const projectService = new ProjectService();

export default projectService;