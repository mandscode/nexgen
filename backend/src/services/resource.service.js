"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceDTO = void 0;
const resource_1 = __importDefault(require("../models/resource"));
const resource_mapper_1 = require("./resource.mapper");
class ResourceDTO {
}
exports.ResourceDTO = ResourceDTO;
class ResourceService {
    createResource(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            return resource_1.default.create(Object.assign({}, resource)).then(resource => resource ? (0, resource_mapper_1.toResourceDTO)(resource) : null);
        });
    }
    getAllResources() {
        return __awaiter(this, void 0, void 0, function* () {
            return resource_1.default.findAll().then(resources => (0, resource_mapper_1.toResourcesDTO)(resources));
        });
    }
    getResourceById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return resource_1.default.findByPk(id).then(resource => resource ? (0, resource_mapper_1.toResourceDTO)(resource) : null);
        });
    }
}
const resourceService = new ResourceService();
exports.default = resourceService;
