"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toResourceDTO = toResourceDTO;
exports.toResourcesDTO = toResourcesDTO;
const class_transformer_1 = require("class-transformer");
const resource_service_1 = require("./resource.service");
function toResourceDTO(resource) {
    return (0, class_transformer_1.plainToInstance)(resource_service_1.ResourceDTO, resource.dataValues);
}
function toResourcesDTO(resources) {
    return resources.map(resource => (0, class_transformer_1.plainToInstance)(resource_service_1.ResourceDTO, resource.dataValues));
}
