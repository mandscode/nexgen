import { Get, Route, Post, Body, Path } from 'tsoa';
import resourceService, { ResourceDTO } from '../services/resource.service';


@Route('resources')
export class ResourceController {

    @Get('/')
    public async getAllEntities(): Promise<ResourceDTO[]> {
        return resourceService.getAllResources();
    }

    @Get('{id}')
    public async getResourceById(@Path() id: number): Promise<ResourceDTO | null> {
        return resourceService.getResourceById(id);
    }

    @Post('/')
    public async createResource(@Body() resource: ResourceDTO): Promise<ResourceDTO | null> {
        return resourceService.createResource(resource);
    }
}