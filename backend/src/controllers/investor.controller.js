"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvestorController = void 0;
const tsoa_1 = require("tsoa");
const investor_service_1 = __importStar(require("../services/investor.service"));
let InvestorController = class InvestorController {
    getAllInvestors() {
        return __awaiter(this, void 0, void 0, function* () {
            return investor_service_1.default.getAllInvestors();
        });
    }
    getInvestorById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return investor_service_1.default.getInvestorById(id);
        });
    }
    createInvestor(investor) {
        return __awaiter(this, void 0, void 0, function* () {
            return investor_service_1.default.createInvestor(investor);
        });
    }
    updateInvestorNomineeDetails(id, nomitneeDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            return investor_service_1.default.updateInvestorNomineeDetails(id, nomitneeDetails);
        });
    }
    updateEmergencyContact(id, emergencyContact) {
        return __awaiter(this, void 0, void 0, function* () {
            return investor_service_1.default.updateInvestorEmergencyContact(id, emergencyContact);
        });
    }
    updateInvestorPersonalDetails(id, personalDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            return investor_service_1.default.updateInvestorPersonalDetails(id, personalDetails);
        });
    }
    updateInvestor(investor) {
        return __awaiter(this, void 0, void 0, function* () {
            return investor_service_1.default.updateInvestor(investor);
        });
    }
    assignProject(id, projectData) {
        return __awaiter(this, void 0, void 0, function* () {
            return investor_service_1.default.assignProjects(id, projectData.projects);
        });
    }
    addDocumentDetails(id, docDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            return investor_service_1.default.addDocumentDetails(id, docDetails);
        });
    }
    updateDocumentById(id, documentId, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            return investor_service_1.default.updateDocumentById(id, documentId, updates);
        });
    }
    getDocumentsByInvestorId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return investor_service_1.default.getDocumentsByInvestorId(id);
        });
    }
    deleteDocumentById(id, documentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return investor_service_1.default.deleteDocumentById(id, documentId);
        });
    }
};
exports.InvestorController = InvestorController;
__decorate([
    (0, tsoa_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InvestorController.prototype, "getAllInvestors", null);
__decorate([
    (0, tsoa_1.Get)('{id}'),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], InvestorController.prototype, "getInvestorById", null);
__decorate([
    (0, tsoa_1.Post)('/'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [investor_service_1.InvestorReqDTO]),
    __metadata("design:returntype", Promise)
], InvestorController.prototype, "createInvestor", null);
__decorate([
    (0, tsoa_1.Put)('/{id}/nomineeDetails'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], InvestorController.prototype, "updateInvestorNomineeDetails", null);
__decorate([
    (0, tsoa_1.Put)('/{id}/emergencyContact'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], InvestorController.prototype, "updateEmergencyContact", null);
__decorate([
    (0, tsoa_1.Put)('/{id}/personalDetails'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], InvestorController.prototype, "updateInvestorPersonalDetails", null);
__decorate([
    (0, tsoa_1.Put)('/'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [investor_service_1.InvestorReqDTO]),
    __metadata("design:returntype", Promise)
], InvestorController.prototype, "updateInvestor", null);
__decorate([
    (0, tsoa_1.Put)('/{id}/projects/assign'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], InvestorController.prototype, "assignProject", null);
__decorate([
    (0, tsoa_1.Put)('/{id}/documents'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], InvestorController.prototype, "addDocumentDetails", null);
__decorate([
    (0, tsoa_1.Put)('/{id}/documents/{documentId}'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Path)()),
    __param(2, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", Promise)
], InvestorController.prototype, "updateDocumentById", null);
__decorate([
    (0, tsoa_1.Get)('/{id}/documents'),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], InvestorController.prototype, "getDocumentsByInvestorId", null);
__decorate([
    (0, tsoa_1.Delete)('/{id}/documents/{documentId}'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], InvestorController.prototype, "deleteDocumentById", null);
exports.InvestorController = InvestorController = __decorate([
    (0, tsoa_1.Route)('investors')
], InvestorController);
