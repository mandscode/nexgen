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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDetailsRespDTO = exports.UserDetailsDTO = void 0;
const account_1 = __importDefault(require("../models/account"));
const transaction_1 = __importDefault(require("../models/transaction"));
const entity_1 = __importDefault(require("../models/entity"));
const investor_1 = __importDefault(require("../models/investor"));
const project_1 = __importDefault(require("../models/project"));
const role_1 = __importDefault(require("../models/role"));
const user_1 = __importDefault(require("../models/user"));
const UserDetails_mapper_1 = require("./UserDetails.mapper");
const currency_1 = __importDefault(require("../models/currency"));
class UserDetailsDTO {
}
exports.UserDetailsDTO = UserDetailsDTO;
class UserDetailsRespDTO {
}
exports.UserDetailsRespDTO = UserDetailsRespDTO;
class UserDetailsService {
    getUserDetails(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g;
            // Fetch user with roles and entities (excluding sensitive fields)
            const user = yield user_1.default.findByPk(id, {
                include: [
                    { model: role_1.default, attributes: ["id", "name"], through: { attributes: [] } },
                    { model: entity_1.default, attributes: ["id", "name"], through: { attributes: [] } }
                ],
                attributes: { exclude: ["password", "googleId", "isMasterAdmin", "email", "personalDetails", "picture", "isFirstLogin", "updatedAt"] }
            });
            if (!user)
                return null;
            // Convert to DTO
            const userDTO = (0, UserDetails_mapper_1.toUserDetailsDTO)(user);
            const { roles, entities } = userDTO, filteredUserDTO = __rest(userDTO, ["roles", "entities"]);
            // Check if user is an investor
            const isInvestor = (_a = user.roles) === null || _a === void 0 ? void 0 : _a.some(role => role.name === "Investor");
            const isViewer = (_b = user.roles) === null || _b === void 0 ? void 0 : _b.some(role => role.name === "Viewer");
            let userJSON = Object.assign(Object.assign({}, filteredUserDTO), { status: filteredUserDTO.status && filteredUserDTO.status == "active" ? 1 : 0, message: '', InvestedCurrencies: [], Investments: [], projects: [], Currencies: [] });
            if (isViewer) {
                userJSON.projects = undefined;
                userJSON.Investments = undefined;
                userJSON.InvestedCurrencies = undefined;
                userJSON.Currencies = undefined;
                userJSON.message = "You dont have any active investments now, please contact 93232345 to start your investment journey";
            }
            else if (isInvestor) {
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
                const groupedInvestments = new Map();
                (_c = investorDetails === null || investorDetails === void 0 ? void 0 : investorDetails.accounts) === null || _c === void 0 ? void 0 : _c.forEach((account) => {
                    account.transactions.forEach((transaction) => {
                        var _a, _b;
                        const projectId = transaction.projectId;
                        const currencyId = account.currencyDetails.id;
                        const key = `${projectId}-${currencyId}`; // Unique key for investments per project & currency
                        if (!groupedInvestments.has(key)) {
                            groupedInvestments.set(key, {
                                id: transaction.id, // First transaction ID, can be adjusted
                                ProjectId: projectId,
                                currencyId: currencyId,
                                maturityLockingPeriod: ((_b = (_a = investorDetails.projects) === null || _a === void 0 ? void 0 : _a.find(p => p.id === projectId)) === null || _b === void 0 ? void 0 : _b.maturityLockingPeriod) || 0,
                                investedAmount: transaction.amount.toString(),
                                intrestGenerated: ((transaction.amount * transaction.intrestRate) / 100).toFixed(2),
                                totalValue: (transaction.amount + (transaction.amount * transaction.intrestRate) / 100).toFixed(2),
                                transactions: [] // Will collect transactions below
                            });
                        }
                        else {
                            const existingInvestment = groupedInvestments.get(key);
                            existingInvestment.investedAmount = (parseFloat(existingInvestment.investedAmount) + transaction.amount).toString();
                            existingInvestment.intrestGenerated = (parseFloat(existingInvestment.intrestGenerated) + (transaction.amount * transaction.intrestRate) / 100).toFixed(2);
                            existingInvestment.totalValue = (parseFloat(existingInvestment.totalValue) + transaction.amount + (transaction.amount * transaction.intrestRate) / 100).toFixed(2);
                        }
                        // Add transaction to the existing project investment
                        groupedInvestments.get(key).transactions.push({
                            id: transaction.id,
                            title: transaction.details, // Assuming `details` contains the transaction title
                            date: transaction.transactionDate,
                            credited: transaction.credited ? true : false,
                            amount: transaction.amount.toString(),
                        });
                    });
                });
                // Convert the grouped investments into an array
                const Investments = Array.from(groupedInvestments.values());
                userJSON = Object.assign(Object.assign({}, filteredUserDTO), { status: filteredUserDTO.status && filteredUserDTO.status == "active" ? 1 : 0, "message": 'You dont have any active investments now, please contact 93232345 to start your investment journey', Currencies: ((_d = investorDetails === null || investorDetails === void 0 ? void 0 : investorDetails.accounts) === null || _d === void 0 ? void 0 : _d.map((account) => ({
                        id: (account === null || account === void 0 ? void 0 : account.currencyDetails.id) || 0,
                        name: (account === null || account === void 0 ? void 0 : account.currencyDetails.code) || '',
                        symbol: (account === null || account === void 0 ? void 0 : account.currencyDetails.symbol) || ''
                    }))) || [], Investments: Investments || [], projects: ((_e = investorDetails === null || investorDetails === void 0 ? void 0 : investorDetails.projects) === null || _e === void 0 ? void 0 : _e.map((project) => {
                        var _a, _b, _c;
                        return ({
                            id: project.id,
                            name: project.name,
                            address: project.address,
                            country: (_a = project.country) !== null && _a !== void 0 ? _a : "Unknown", // Ensure 'country' is always provided
                            latitude: (_b = project.latitude) !== null && _b !== void 0 ? _b : null,
                            longitude: (_c = project.longitude) !== null && _c !== void 0 ? _c : null,
                            startDate: project.startDate,
                            actualMaturityDate: project.actualMaturityDate,
                            overallCost: project.overallCost,
                            description: project.description,
                            ownerName: project.ownerName,
                            legalId: project.legalId
                        });
                    })) || [] });
                if (((_f = investorDetails === null || investorDetails === void 0 ? void 0 : investorDetails.accounts) === null || _f === void 0 ? void 0 : _f.length) == 0) {
                    userJSON.InvestedCurrencies = undefined;
                    userJSON.Currencies = [];
                }
                else if (Investments.length === 0) {
                    userJSON.InvestedCurrencies = undefined;
                    userJSON.Currencies = ((_g = investorDetails === null || investorDetails === void 0 ? void 0 : investorDetails.accounts) === null || _g === void 0 ? void 0 : _g.map((account) => ({
                        id: (account === null || account === void 0 ? void 0 : account.currencyDetails.id) || 0,
                        name: (account === null || account === void 0 ? void 0 : account.currencyDetails.name) || '',
                        symbol: (account === null || account === void 0 ? void 0 : account.currencyDetails.symbol) || ''
                    }))) || [];
                }
                // ✅ If no projects, set it as `undefined`
                if (investorDetails && !investorDetails.projects || (investorDetails === null || investorDetails === void 0 ? void 0 : investorDetails.projects) && investorDetails.projects.length === 0) {
                    userJSON.projects = undefined;
                }
                // ✅ If no investments, set it as `undefined`
                if (Investments.length === 0) {
                    userJSON.Investments = undefined;
                }
                else {
                    userJSON.Investments = Investments;
                }
            }
            return userJSON;
        });
    }
}
const userDetailsService = new UserDetailsService();
exports.default = userDetailsService;
