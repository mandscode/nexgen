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
exports.InvestorRespDTO = exports.InvestorReqDTO = void 0;
const account_1 = __importDefault(require("../models/account"));
const investor_1 = __importDefault(require("../models/investor"));
const project_1 = __importDefault(require("../models/project"));
const resource_1 = __importDefault(require("../models/resource"));
const investor_mapper_1 = require("./investor.mapper");
const uuid_1 = require("uuid");
class InvestorReqDTO {
}
exports.InvestorReqDTO = InvestorReqDTO;
class InvestorRespDTO {
}
exports.InvestorRespDTO = InvestorRespDTO;
class InvestorService {
    updateInvestorNomineeDetails(investorId, nomineeDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            yield investor_1.default.update({ nomineeDetails }, { where: { id: investorId } });
            return this.getInvestorById(investorId);
        });
    }
    updateInvestorEmergencyContact(investorId, emergencyContact) {
        return __awaiter(this, void 0, void 0, function* () {
            yield investor_1.default.update({ emergencyContact }, { where: { id: investorId } });
            return this.getInvestorById(investorId);
        });
    }
    updateInvestorPersonalDetails(investorId, personalDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            yield investor_1.default.update({ personalDetails }, { where: { id: investorId } });
            return this.getInvestorById(investorId);
        });
    }
    assignProjects(investorId, projectIds) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (projectIds) {
                yield ((_a = (yield investor_1.default.findByPk(investorId))) === null || _a === void 0 ? void 0 : _a.setProjects(projectIds));
                return this.getInvestorById(investorId);
            }
            return null;
        });
    }
    updateInvestor(investor) {
        return __awaiter(this, void 0, void 0, function* () {
            if (investor.id) {
                yield investor_1.default.update(investor, { where: { id: investor.id } });
                return this.getInvestorById(investor.id);
            }
            return null;
        });
    }
    createInvestor(investor) {
        return __awaiter(this, void 0, void 0, function* () {
            const projectIds = investor.projectIds;
            const resourceIds = investor.resourceIds;
            const createdInvestor = yield investor_1.default.create(Object.assign({}, investor));
            let projects = [];
            let resources = [];
            if (createdInvestor) {
                if (projectIds) {
                    projects = (yield Promise.all(projectIds.map((id) => project_1.default.findByPk(id)))).filter(project => !!project);
                }
                if (projects.length) {
                    yield createdInvestor.addProjects(projects);
                }
                if (resourceIds) {
                    resources = (yield Promise.all(resourceIds.map((id) => resource_1.default.findByPk(id)))).filter(resource => !!resource);
                }
                if (resources.length) {
                    yield createdInvestor.addResources(resources);
                }
                return this.getInvestorById(createdInvestor.id);
            }
            return null;
        });
    }
    getAllInvestors() {
        return __awaiter(this, void 0, void 0, function* () {
            return investor_1.default.findAll().then(investors => (0, investor_mapper_1.toInvestorsDTO)(investors));
        });
    }
    getInvestorById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return investor_1.default.findByPk(id, { include: [account_1.default, project_1.default] }).then(investor => investor ? (0, investor_mapper_1.toInvestorDTO)(investor) : null);
        });
    }
    addDocumentDetails(id, docDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            const investor = yield investor_1.default.findByPk(id);
            if (!investor) {
                throw new Error('Investor not found');
            }
            // Add a unique ID to the document
            const documentWithId = Object.assign(Object.assign({}, docDetails), { id: docDetails.id || (0, uuid_1.v4)() });
            // Assuming `documents` is a relation or JSON field in the `Investor` model
            const updatedDocuments = [...(investor.documents || []), documentWithId];
            investor.documents = updatedDocuments;
            yield investor.save();
            return (0, investor_mapper_1.toInvestorDTO)(investor);
        });
    }
    updateDocumentById(investorId, documentId, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            const investor = yield investor_1.default.findByPk(investorId);
            if (!investor) {
                throw new Error('Investor not found');
            }
            let documentsArray = typeof investor.documents === 'string'
                ? JSON.parse(investor.documents)
                : investor.documents;
            if (!Array.isArray(documentsArray)) {
                throw new Error('Documents is not an array');
            }
            const documentIndex = documentsArray === null || documentsArray === void 0 ? void 0 : documentsArray.findIndex((doc) => doc.id === documentId);
            if (documentIndex === undefined || documentIndex < 0) {
                throw new Error('Document not found');
            }
            // Update the document
            documentsArray[documentIndex] = Object.assign(Object.assign({}, documentsArray[documentIndex]), updates);
            investor.documents = documentsArray; // Ensure correct format before saving
            // Explicitly mark the 'documents' field as changed
            investor.changed('documents', true);
            // Save the changes
            yield investor.save();
            // Return updated investor data
            return (0, investor_mapper_1.toInvestorDTO)(investor);
        });
    }
    deleteDocumentById(investorId, documentId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const investor = yield investor_1.default.findByPk(investorId);
            if (!investor) {
                throw new Error('Investor not found');
            }
            const updatedDocuments = (_a = investor.documents) === null || _a === void 0 ? void 0 : _a.filter((doc) => doc.id !== documentId);
            if ((updatedDocuments === null || updatedDocuments === void 0 ? void 0 : updatedDocuments.length) === ((_b = investor.documents) === null || _b === void 0 ? void 0 : _b.length)) {
                throw new Error('Document not found');
            }
            investor.documents = updatedDocuments;
            yield investor.save();
            return (0, investor_mapper_1.toInvestorDTO)(investor);
        });
    }
    getDocumentsByInvestorId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const investor = yield investor_1.default.findByPk(id);
            if (!investor) {
                throw new Error('Investor not found');
            }
            return investor.documents || [];
        });
    }
}
const investorService = new InvestorService();
exports.default = investorService;
