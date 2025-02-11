import { Body, Delete, Get, Path, Post, Put, Route } from "tsoa";
import contentService, { ContentDTO } from "../services/content.service";


@Route('contents')
export class ContentController {
    
    @Get('/')
    public async getAllContents(): Promise<ContentDTO[]> {
        return contentService.getAllContents();
    }

    @Get('{id}')
    public async getContentById(@Path() id: number): Promise<ContentDTO | null> {
        return contentService.getContentById(id);
    }

    @Post('/')
    public async createContent(@Body() content: ContentDTO): Promise<ContentDTO> {
        return contentService.createContent(content);
    }

    @Delete('{id}')
    public async deleteContent(@Path() id: number): Promise<{ message: string }> {
        const isDeleted = await contentService.deleteContent(id);
        if (isDeleted) {
            return { message: 'Content deleted successfully' };
        } else {
            throw new Error('Content not found');
        }
    }

    @Put('{id}')
    public async updateContent(
        @Path() id: number,
        @Body() contentData: Partial<ContentDTO>
    ): Promise<ContentDTO | null> {
        return contentService.updateContent(id, contentData);
    }
}
