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
import User from '../models/user';
import ProjectResource from '../models/project-resource';

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

    async getAllProjects(userShare?: number): Promise<ProjectRespDTO[]> {
        let whereClause = {};
    
        if (userShare !== undefined) {
            if (userShare === 1) {
                // NexGen Projects
                whereClause = { entityID : 1 };
            } else {
                // Evolve Projects
                whereClause = { entityID : 2 };
            }
        }
    
        // Fetch projects with filtering
        const projects = await Project.findAll({
            where: whereClause,
            include: [
                {
                    model: Resource, // Include related resources
                    attributes: ['id', 'location']
                }
            ]
        });
    
        // Convert projects to DTOs
        return projects.map(toProjectDTO);
    }
    
    async getProjectsByEntityIds(entityIds: number[]): Promise<ProjectRespDTO[] | null> {
        return Project.findAll({ where: { entityID: entityIds } })
            .then(projects => projects.length ? projects.map(toProjectDTO) : null);
    }

    async getProjectById(id: number): Promise<ProjectRespDTO | null> {
        return Project.findByPk(id, { include: [Entity, Resource, Investor] }).then(project => project ? toProjectDTO(project) : null);
    }

    async updateProject(
        id: number,
        updateData: {
            address?: string,
            description?: string,
            overallCost?: number,
            file?:string,
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

            if (updateData.file) {
                const resource = await Resource.create({
                    location: updateData.file, // File path (URL) from S3
                    sourceId: 'project', // Project ID
                    type: 'image', // Assuming the file is an image
                    group: 'misc', // Group for the resource
                });
    
                await ProjectResource.create({
                    projectId: Number(id),
                    resourceId: resource.id,
                });
            }

            return toProjectDTO(project);
        }
        return null;
    }
}

const projectService = new ProjectService();

export default projectService;