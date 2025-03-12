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
exports.ProjectRespDTO = exports.ProjectReqDTO = void 0;
const date_fns_1 = require("date-fns");
const entity_1 = __importDefault(require("../models/entity"));
const project_1 = __importDefault(require("../models/project"));
const project_mapper_1 = require("./project.mapper");
const resource_1 = __importDefault(require("../models/resource"));
const investor_1 = __importDefault(require("../models/investor"));
class ProjectReqDTO {
}
exports.ProjectReqDTO = ProjectReqDTO;
class ProjectRespDTO {
}
exports.ProjectRespDTO = ProjectRespDTO;
class ProjectService {
    createProject(project) {
        return __awaiter(this, void 0, void 0, function* () {
            let resources = [];
            if (project.resourceIds) {
                resources = (yield Promise.all(project.resourceIds.map((resourceId) => resource_1.default.findByPk(resourceId)))).filter(resource => !!resource);
            }
            const entity = yield entity_1.default.findByPk(project.entityID);
            if (entity) {
                const createdProject = yield project_1.default.create(Object.assign(Object.assign({}, project), { startDate: (0, date_fns_1.parse)(project.startDate, "dd/MM/yyyy", new Date()), actualMaturityDate: (0, date_fns_1.parse)(project.startDate, "dd/MM/yyyy", new Date()), settings: project.settings }));
                if (resources.length) {
                    yield createdProject.addResources(resources);
                }
                return this.getProjectById(createdProject.id);
            }
            return null;
        });
    }
    getAllProjects() {
        return __awaiter(this, void 0, void 0, function* () {
            return project_1.default.findAll().then(projects => (0, project_mapper_1.toProjectsDTO)(projects));
        });
    }
    getProjectById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return project_1.default.findByPk(id, { include: [entity_1.default, resource_1.default, investor_1.default] }).then(project => project ? (0, project_mapper_1.toProjectDTO)(project) : null);
        });
    }
    updateProject(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = yield project_1.default.findByPk(id);
            if (project) {
                if (updateData.address)
                    project.address = updateData.address;
                if (updateData.description)
                    project.description = updateData.description;
                if (updateData.overallCost !== undefined)
                    project.overallCost = updateData.overallCost;
                if (updateData.maturityLockingPeriod !== undefined)
                    project.maturityLockingPeriod = updateData.maturityLockingPeriod;
                if (updateData.ownerName)
                    project.ownerName = updateData.ownerName;
                if (updateData.settings)
                    project.settings = updateData.settings;
                yield project.save(); // Save the updated project
                return (0, project_mapper_1.toProjectDTO)(project);
            }
            return null;
        });
    }
}
const projectService = new ProjectService();
exports.default = projectService;
