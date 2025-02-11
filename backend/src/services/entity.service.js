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
exports.EntityRespDTO = exports.EntityDTO = void 0;
const entity_1 = __importDefault(require("../models/entity"));
const project_1 = __importDefault(require("../models/project"));
const entity_mapper_1 = require("./entity.mapper");
class EntityDTO {
}
exports.EntityDTO = EntityDTO;
class EntityRespDTO {
}
exports.EntityRespDTO = EntityRespDTO;
class EntityService {
    createEntity(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            return entity_1.default.create(Object.assign({}, entity)).then(entity => entity ? (0, entity_mapper_1.toEntityDTO)(entity) : null);
        });
    }
    getAllEntitys() {
        return __awaiter(this, void 0, void 0, function* () {
            return entity_1.default.findAll({ include: [project_1.default] }).then(entitys => (0, entity_mapper_1.toEntitiesDTO)(entitys));
        });
    }
    getEntityById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return entity_1.default.findByPk(id, { include: [project_1.default] }).then(entity => entity ? (0, entity_mapper_1.toEntityDTO)(entity) : null);
        });
    }
    updateEntity(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity = yield entity_1.default.findByPk(id);
            if (entity) {
                if (updateData.address)
                    entity.address = updateData.address;
                if (updateData.country)
                    entity.country = updateData.country;
                if (updateData.regId)
                    entity.regId = updateData.regId;
                if (updateData.ownerId)
                    entity.ownerId = updateData.ownerId;
                if (updateData.caId)
                    entity.caId = updateData.caId;
                if (updateData.caId)
                    entity.caId = updateData.caId;
                if (updateData.settings)
                    entity.settings = updateData.settings;
                yield entity.save(); // Save the updated entity
                return (0, entity_mapper_1.toEntityDTO)(entity);
            }
            return null;
        });
    }
}
const entityService = new EntityService();
exports.default = entityService;
