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
exports.ContentDTO = void 0;
const content_1 = __importDefault(require("../models/content"));
const content_mapper_1 = require("./content.mapper");
class ContentDTO {
}
exports.ContentDTO = ContentDTO;
class ContentService {
    createContent(content) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = Object.assign(Object.assign({}, content), { imageUrl: content.imageUrl });
            return content_1.default.create(content).then(content => (0, content_mapper_1.toContentDTO)(content));
        });
    }
    getAllContents() {
        return __awaiter(this, void 0, void 0, function* () {
            return content_1.default.findAll().then(contents => (0, content_mapper_1.toContentsDTO)(contents));
        });
    }
    getContentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return content_1.default.findByPk(id).then(content => (content ? (0, content_mapper_1.toContentDTO)(content) : null));
        });
    }
    deleteContent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const content = yield content_1.default.findByPk(id);
            if (content) {
                yield content.destroy();
                return true;
            }
            return false;
        });
    }
    updateContent(id, contentData) {
        return __awaiter(this, void 0, void 0, function* () {
            const content = yield content_1.default.findByPk(id);
            if (content) {
                yield content.update(contentData);
                return (0, content_mapper_1.toContentDTO)(content);
            }
            return null;
        });
    }
}
const contentService = new ContentService();
exports.default = contentService;
