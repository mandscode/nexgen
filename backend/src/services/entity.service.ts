
import Entity from '../models/entity';
import Project from '../models/project';
import { toEntityDTO, toEntitiesDTO } from './entity.mapper';
import { ProjectRespDTO } from './project.service';

export class EntityDTO {
    id?: number;
    name!: string;
    address!: string;
    country!: string;
    regId!: string;
    ownerId?: string;
    caId?: string;
    settings?: { [key: string]: any };
}

export class EntityRespDTO {
    id?: number;
    name!: string;
    address!: string;
    country!: string;
    regId!: string;
    ownerId?: string;
    caId?: string;
    settings?: { [key: string]: any };
    projects?: ProjectRespDTO[];
}

class EntityService {
    async createEntity(entity: EntityDTO): Promise<EntityDTO | null> {
        return Entity.create({ ...entity }).then(entity => entity ? toEntityDTO(entity) : null);
    }

    async getAllEntitys(): Promise<EntityRespDTO[]> {
        return Entity.findAll({ include: [Project] }).then(entitys => toEntitiesDTO(entitys));
    }

    async getEntityById(id: number): Promise<EntityRespDTO | null> {
        return Entity.findByPk(id, { include: [Project] }).then(entity => entity ? toEntityDTO(entity) : null);
    }

    async updateEntity(
        id: number,
        updateData: {
            address: string,
            country: string,
            regId: string,
            ownerId?: string,
            caId?: string,
            settings?: { [key: string]: any }
        }
    ): Promise<EntityRespDTO | null> {
        const entity = await Entity.findByPk(id);
        if (entity) {
            if (updateData.address) entity.address = updateData.address;
            if (updateData.country) entity.country = updateData.country;
            if (updateData.regId) entity.regId = updateData.regId;
            if (updateData.ownerId) entity.ownerId = updateData.ownerId;
            if (updateData.caId) entity.caId = updateData.caId;
            if (updateData.caId) entity.caId = updateData.caId;
            if (updateData.settings) entity.settings = updateData.settings;

            await entity.save(); // Save the updated entity

            return toEntityDTO(entity);
        }
        return null;
    }
}

const entityService = new EntityService();

export default entityService;