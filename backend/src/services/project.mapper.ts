import { plainToInstance } from 'class-transformer';
import Project from '../models/project';
import { toEntityDTO } from './entity.mapper';
import { ProjectRespDTO } from './project.service';
import { toResourcesDTO } from './resource.mapper';
import { toInvestorDTO, toInvestorsDTO } from './investor.mapper';

export function toProjectDTO(project: Project): ProjectRespDTO {
    const entity = project.dataValues.entity;
    const investors = project.dataValues.investors;
    const resources = project.dataValues.resources;
    delete project.dataValues.entity;
    delete project.dataValues.resources;
    delete project.dataValues.investors;

    const projectRespDTO = plainToInstance(ProjectRespDTO, project.dataValues);
    if (entity) {
        const entityDTO = toEntityDTO(entity);
        projectRespDTO.entity = entityDTO;
    }
    if (resources) {
        const resourceDtos = toResourcesDTO(resources);
        projectRespDTO.resources = resourceDtos;

    }
    if (investors) {
        const investorsDtos = toInvestorsDTO(investors);
        projectRespDTO.investors = investorsDtos;

    }
    return projectRespDTO;
}

export function toProjectsDTO(projects: Project[]): ProjectRespDTO[] {
    return projects.map(project => toProjectDTO(project))
}