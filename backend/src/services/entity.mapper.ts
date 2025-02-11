import { plainToInstance } from 'class-transformer';
import Entity from '../models/entity';
import { EntityRespDTO } from './entity.service';
import { toProjectsDTO } from './project.mapper';

export function toEntityDTO(entity: Entity): EntityRespDTO {
    const projects = entity.projects;
    delete entity.projects;
    const entityDTO = plainToInstance(EntityRespDTO, entity.dataValues);
    if (projects) {
        entityDTO.projects = toProjectsDTO(projects);
    }
    return plainToInstance(EntityRespDTO, entity.dataValues);
}

export function toEntitiesDTO(entitys: Entity[]): EntityRespDTO[] {
    return entitys.map(entity => toEntityDTO(entity));
}