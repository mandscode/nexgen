"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toContentDTO = toContentDTO;
exports.toContentsDTO = toContentsDTO;
const class_transformer_1 = require("class-transformer");
const content_service_1 = require("./content.service");
function toContentDTO(content) {
    return (0, class_transformer_1.plainToInstance)(content_service_1.ContentDTO, content.dataValues);
}
function toContentsDTO(contents) {
    return contents.map(content => (0, class_transformer_1.plainToInstance)(content_service_1.ContentDTO, content.dataValues));
}
