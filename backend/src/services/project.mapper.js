"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toProjectDTO = toProjectDTO;
exports.toProjectsDTO = toProjectsDTO;
const class_transformer_1 = require("class-transformer");
const entity_mapper_1 = require("./entity.mapper");
const project_service_1 = require("./project.service");
const resource_mapper_1 = require("./resource.mapper");
const investor_mapper_1 = require("./investor.mapper");
function toProjectDTO(project) {
    const entity = project.dataValues.entity;
    const investors = project.dataValues.investors;
    const resources = project.dataValues.resources;
    delete project.dataValues.entity;
    delete project.dataValues.resources;
    delete project.dataValues.investors;
    const projectRespDTO = (0, class_transformer_1.plainToInstance)(project_service_1.ProjectRespDTO, project.dataValues);
    if (entity) {
        const entityDTO = (0, entity_mapper_1.toEntityDTO)(entity);
        projectRespDTO.entity = entityDTO;
    }
    if (resources) {
        const resourceDtos = (0, resource_mapper_1.toResourcesDTO)(resources);
        projectRespDTO.resources = resourceDtos;
    }
    if (investors) {
        const investorsDtos = (0, investor_mapper_1.toInvestorsDTO)(investors);
        projectRespDTO.investors = investorsDtos;
    }
    return projectRespDTO;
}
function toProjectsDTO(projects) {
    return projects.map(project => toProjectDTO(project));
}
