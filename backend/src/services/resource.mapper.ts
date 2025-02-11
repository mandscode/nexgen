import { plainToInstance } from 'class-transformer';
import Resource from '../models/resource';
import { ResourceDTO } from './resource.service';

export function toResourceDTO(resource: Resource): ResourceDTO {
    return plainToInstance(ResourceDTO, resource.dataValues);
}

export function toResourcesDTO(resources: Resource[]): ResourceDTO[] {
    return resources.map(resource => plainToInstance(ResourceDTO, resource.dataValues))
}