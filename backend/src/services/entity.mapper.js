"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toEntityDTO = toEntityDTO;
exports.toEntitiesDTO = toEntitiesDTO;
const class_transformer_1 = require("class-transformer");
const entity_service_1 = require("./entity.service");
const project_mapper_1 = require("./project.mapper");
function toEntityDTO(entity) {
    const projects = entity.projects;
    delete entity.projects;
    const entityDTO = (0, class_transformer_1.plainToInstance)(entity_service_1.EntityRespDTO, entity.dataValues);
    if (projects) {
        entityDTO.projects = (0, project_mapper_1.toProjectsDTO)(projects);
    }
    return (0, class_transformer_1.plainToInstance)(entity_service_1.EntityRespDTO, entity.dataValues);
}
function toEntitiesDTO(entitys) {
    return entitys.map(entity => toEntityDTO(entity));
}
