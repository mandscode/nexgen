import Content from "../models/content";
import { toContentDTO, toContentsDTO } from "./content.mapper";


export class ContentDTO {
    id?: number;
    title!: string;
    imageUrl?: string;
    description!: string;
}

class ContentService {
    async createContent(content: ContentDTO): Promise<ContentDTO> {
        const payload = {
            ...content,
            imageUrl: content.imageUrl, // Convert `undefined` to `null`
        };
        return Content.create(content).then(content => toContentDTO(content));
    }    

    async getAllContents(): Promise<ContentDTO[]> {
        return Content.findAll().then(contents => toContentsDTO(contents));
    }

    async getContentById(id: number): Promise<ContentDTO | null> {
        return Content.findByPk(id).then(content => (content ? toContentDTO(content) : null));
    }

    async deleteContent(id: number): Promise<boolean> {
        const content = await Content.findByPk(id);
        if (content) {
            await content.destroy();
            return true;
        }
        return false;
    }

    async updateContent(id: number, contentData: Partial<ContentDTO>): Promise<ContentDTO | null> {
        const content = await Content.findByPk(id);
        if (content) {
            await content.update(contentData);
            return toContentDTO(content);
        }
        return null;
    }
}

const contentService = new ContentService();

export default contentService;