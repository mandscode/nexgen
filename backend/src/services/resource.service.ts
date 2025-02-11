
import Resource from '../models/resource';
import { toResourceDTO, toResourcesDTO } from './resource.mapper';

export class ResourceDTO {
    id?: number;
    location!: string;
    sourceId?: string;
    type!: string;
    group!: string;
}

class ResourceService {
    async createResource(resource: ResourceDTO): Promise<ResourceDTO | null> {
        return Resource.create({ ...resource }).then(resource => resource ? toResourceDTO(resource) : null);
    }

    async getAllResources(): Promise<ResourceDTO[]> {
        return Resource.findAll().then(resources => toResourcesDTO(resources));
    }

    async getResourceById(id: number): Promise<ResourceDTO | null> {
        return Resource.findByPk(id).then(resource => resource ? toResourceDTO(resource) : null);
    }
}

const resourceService = new ResourceService();

export default resourceService;