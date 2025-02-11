import { Get, Route, Post, Body, Path, Put } from 'tsoa';
import entityService, { EntityDTO, EntityRespDTO } from '../services/entity.service';


@Route('entities')
export class EntityController {

    @Get('/')
    public async getAllEntities(): Promise<EntityRespDTO[]> {
        return entityService.getAllEntitys();
    }

    @Get('{id}')
    public async getEntityById(@Path() id: number): Promise<EntityRespDTO | null> {
        return entityService.getEntityById(id);
    }

    @Post('/')
    public async createEntity(@Body() entity: EntityDTO): Promise<EntityRespDTO | null> {
        return entityService.createEntity(entity);
    }

    @Put('{id}')
    public async updateEntity(
        @Path() id: number,
        @Body() updateData: {
            address: string,
            country: string,
            regId: string,
            ownerId?: string,
            caId?: string,
            settings?: { [key: string]: any };
        }
    ): Promise<EntityRespDTO | null> {
        const updatedProjectDetails = entityService.updateEntity(id, updateData);

        if (updatedProjectDetails) {
            return updatedProjectDetails;
        } else {
            throw new Error('Role not found or update failed');
        }
    }
}