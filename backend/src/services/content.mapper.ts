import { plainToInstance } from 'class-transformer';
import Content from "../models/content";
import { ContentDTO } from "./content.service";


export function toContentDTO(content: Content): ContentDTO {
    return plainToInstance(ContentDTO, content.dataValues);
}

export function toContentsDTO(contents: Content[]): ContentDTO[] {
    return contents.map(content => plainToInstance(ContentDTO, content.dataValues));
}