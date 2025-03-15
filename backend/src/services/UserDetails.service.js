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
exports.UserDetailsRespDTO = void 0;
const account_1 = __importDefault(require("../models/account"));
const transaction_1 = __importDefault(require("../models/transaction"));
const entity_1 = __importDefault(require("../models/entity"));
const investor_1 = __importDefault(require("../models/investor"));
const project_1 = __importDefault(require("../models/project"));
const role_1 = __importDefault(require("../models/role"));
const user_1 = __importDefault(require("../models/user"));
const investor_mapper_1 = require("./investor.mapper");
const UserDetails_mapper_1 = require("./UserDetails.mapper");
const currency_1 = __importDefault(require("../models/currency"));
class UserDetailsRespDTO {
}
exports.UserDetailsRespDTO = UserDetailsRespDTO;
class UserDetailsService {
    getUserDetails(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            // Fetch user with roles and entities (excluding sensitive fields)
            const user = yield user_1.default.findByPk(id, {
                include: [
                    { model: role_1.default, attributes: ["id", "name"], through: { attributes: [] } },
                    { model: entity_1.default, attributes: ["id", "name"], through: { attributes: [] } }
                ],
                attributes: { exclude: ["password", "googleId", "isMasterAdmin"] }
            });
            if (!user)
                return null;
            // Convert to DTO
            const userDTO = (0, UserDetails_mapper_1.toUserDetailsDTO)(user);
            // Check if user is an investor
            const isInvestor = (_a = user.roles) === null || _a === void 0 ? void 0 : _a.some(role => role.name === "Investor");
            if (isInvestor) {
                const investorDetails = yield investor_1.default.findOne({
                    where: { userId: id },
                    include: [
                        {
                            model: account_1.default,
                            include: [
                                {
                                    model: transaction_1.default,
                                    attributes: { exclude: ["accountId", "modifiedBy"] } // Exclude unwanted fields
                                },
                                {
                                    model: currency_1.default
                                }
                            ]
                        },
                        { model: project_1.default, through: { attributes: [] } }
                    ],
                    attributes: { exclude: ["userId"] }
                });
                if (investorDetails) {
                    userDTO.investor = (0, investor_mapper_1.toInvestorDTO)(investorDetails); // Convert to DTO if needed
                    userDTO.dashboard = {
                        accounts: [],
                        projectSummary: {
                            projects: []
                        }
                    };
                    const accountsMap = new Map();
                    const projectsMap = new Map();
                    if (investorDetails.accounts) {
                        investorDetails.accounts.forEach(account => {
                            var _a;
                            // Initialize account data
                            if (!accountsMap.has(account.id)) {
                                if (!account.currencyDetails) {
                                    throw new Error(`Currency details are missing for account ID ${account.id}`);
                                }
                                accountsMap.set(account.id, {
                                    id: account.id,
                                    currency: {
                                        id: account.currencyDetails.id,
                                        name: account.currencyDetails.name
                                    },
                                    totalProjects: ((_a = investorDetails.projects) === null || _a === void 0 ? void 0 : _a.length) || 0,
                                    transactionsTotal: 0
                                });
                            }
                            const accountData = accountsMap.get(account.id);
                            // Process transactions
                            if (account.transactions) {
                                accountData.transactionsTotal += account.transactions.length;
                                account.transactions.forEach(transaction => {
                                    var _a;
                                    if (!projectsMap.has(transaction.projectId)) {
                                        const project = (_a = investorDetails.projects) === null || _a === void 0 ? void 0 : _a.find(p => p.id === transaction.projectId);
                                        if (project) {
                                            projectsMap.set(transaction.projectId, {
                                                projectId: project.id,
                                                projectName: project.name,
                                                totalTransactionAmount: 0
                                            });
                                        }
                                    }
                                    // Safely access projectData
                                    const projectData = projectsMap.get(transaction.projectId);
                                    if (projectData) {
                                        projectData.totalTransactionAmount += transaction.amount;
                                    }
                                });
                            }
                        });
                        // Convert maps to arrays
                        userDTO.dashboard.accounts = Array.from(accountsMap.values());
                        userDTO.dashboard.projectSummary.projects = Array.from(projectsMap.values());
                    }
                }
            }
            return userDTO;
        });
    }
}
const userDetailsService = new UserDetailsService();
exports.default = userDetailsService;
