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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRoutes = RegisterRoutes;
const runtime_1 = require("@tsoa/runtime");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const users_controller_1 = require("./../controllers/users.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const userDetails_controller_1 = require("./../controllers/userDetails.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const transacction_controller_1 = require("./../controllers/transacction.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const roles_controller_1 = require("./../controllers/roles.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const resouce_controller_1 = require("./../controllers/resouce.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const project_controller_1 = require("./../controllers/project.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const profile_controller_1 = require("./../controllers/profile.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const investor_controller_1 = require("./../controllers/investor.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const investment_controller_1 = require("./../controllers/investment.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const entity_controller_1 = require("./../controllers/entity.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const currency_controller_1 = require("./../controllers/currency.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const contents_controller_1 = require("./../controllers/contents.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const auth_controller_1 = require("./../controllers/auth.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const account_controller_1 = require("./../controllers/account.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const models = {
    "RoleDTO": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double" },
            "name": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CurrencyDTO": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double" },
            "code": { "dataType": "string", "required": true },
            "name": { "dataType": "string", "required": true },
            "symbol": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TransactionDTO": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double" },
            "details": { "dataType": "string", "required": true },
            "projectId": { "dataType": "double", "required": true },
            "accountId": { "dataType": "double", "required": true },
            "amount": { "dataType": "double", "required": true },
            "credited": { "dataType": "boolean", "required": true },
            "modifiedBy": { "dataType": "string" },
            "intrestRate": { "dataType": "double", "required": true },
            "transactionDate": { "dataType": "datetime" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "InvestmentDTO": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double" },
            "investmentType": { "dataType": "string", "required": true },
            "amount": { "dataType": "double", "required": true },
            "accountId": { "dataType": "double", "required": true },
            "modifiedBy": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AccountRespDTO": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double" },
            "currency": { "dataType": "double", "required": true },
            "currencyDetails": { "ref": "CurrencyDTO" },
            "investorId": { "dataType": "double", "required": true },
            "transactions": { "dataType": "array", "array": { "dataType": "refObject", "ref": "TransactionDTO" } },
            "investments": { "dataType": "array", "array": { "dataType": "refObject", "ref": "InvestmentDTO" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EntityDTO": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double" },
            "name": { "dataType": "string", "required": true },
            "address": { "dataType": "string", "required": true },
            "country": { "dataType": "string", "required": true },
            "regId": { "dataType": "string", "required": true },
            "ownerId": { "dataType": "string" },
            "caId": { "dataType": "string" },
            "settings": { "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResourceDTO": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double" },
            "location": { "dataType": "string", "required": true },
            "sourceId": { "dataType": "string" },
            "type": { "dataType": "string", "required": true },
            "group": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "InvestorRespDTO": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double" },
            "nomineeDetails": { "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } },
            "emergencyContact": { "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" }, "required": true },
            "personalDetails": { "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } },
            "userId": { "dataType": "double", "required": true },
            "ownerId": { "dataType": "string" },
            "caId": { "dataType": "string" },
            "settings": { "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } },
            "lockInPeriod": { "dataType": "string", "required": true },
            "accounts": { "dataType": "array", "array": { "dataType": "refObject", "ref": "AccountRespDTO" } },
            "projects": { "dataType": "array", "array": { "dataType": "refObject", "ref": "ProjectRespDTO" } },
            "resources": { "dataType": "array", "array": { "dataType": "refObject", "ref": "ResourceDTO" } },
            "documents": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "status": { "dataType": "boolean", "required": true }, "docUrl": { "dataType": "string", "required": true }, "docName": { "dataType": "string", "required": true }, "id": { "dataType": "string", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProjectRespDTO": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double" },
            "name": { "dataType": "string", "required": true },
            "address": { "dataType": "string", "required": true },
            "countryName": { "dataType": "string", "required": true },
            "latitude": { "dataType": "double" },
            "longitude": { "dataType": "double" },
            "startDate": { "dataType": "datetime", "required": true },
            "actualMaturityDate": { "dataType": "datetime" },
            "overallCost": { "dataType": "double" },
            "description": { "dataType": "string" },
            "ownerName": { "dataType": "string" },
            "legalId": { "dataType": "string" },
            "maturityLockingPeriod": { "dataType": "double" },
            "settings": { "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } },
            "entity": { "ref": "EntityDTO", "required": true },
            "resources": { "dataType": "array", "array": { "dataType": "refObject", "ref": "ResourceDTO" } },
            "investors": { "dataType": "array", "array": { "dataType": "refObject", "ref": "InvestorRespDTO" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserRespDTO": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double" },
            "firstName": { "dataType": "string", "required": true },
            "lastName": { "dataType": "string", "required": true },
            "email": { "dataType": "string", "required": true },
            "roles": { "dataType": "array", "array": { "dataType": "refObject", "ref": "RoleDTO" } },
            "investor": { "ref": "InvestorRespDTO" },
            "isMasterAdmin": { "dataType": "boolean", "required": true },
            "personalDetails": { "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } },
            "status": { "dataType": "string" },
            "entities": { "dataType": "array", "array": { "dataType": "refObject", "ref": "EntityDTO" } },
            "isFirstLogin": { "dataType": "boolean", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserReqDTO": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double" },
            "firstName": { "dataType": "string", "required": true },
            "lastName": { "dataType": "string", "required": true },
            "email": { "dataType": "string", "required": true },
            "password": { "dataType": "string" },
            "roleIds": { "dataType": "array", "array": { "dataType": "double" }, "required": true },
            "entityIds": { "dataType": "array", "array": { "dataType": "double" } },
            "isMasterAdmin": { "dataType": "boolean", "required": true },
            "isFirstLogin": { "dataType": "boolean", "required": true },
            "status": { "dataType": "string" },
            "personalDetails": { "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserDetailsRespDTO": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double", "required": true },
            "investorId": { "dataType": "double" },
            "firstName": { "dataType": "string", "required": true },
            "lastName": { "dataType": "string", "required": true },
            "status": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "string" }], "required": true },
            "message": { "dataType": "string", "required": true },
            "roles": { "dataType": "array", "array": { "dataType": "refObject", "ref": "RoleDTO" } },
            "entities": { "dataType": "array", "array": { "dataType": "refObject", "ref": "EntityDTO" } },
            "InvestedCurrencies": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "symbol": { "dataType": "string", "required": true }, "name": { "dataType": "string", "required": true }, "id": { "dataType": "double", "required": true } } } },
            "Investments": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "transactions": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "amount": { "dataType": "string", "required": true }, "credited": { "dataType": "boolean", "required": true }, "date": { "dataType": "string", "required": true }, "title": { "dataType": "string", "required": true }, "id": { "dataType": "double", "required": true } } }, "required": true }, "totalValue": { "dataType": "string", "required": true }, "earning": { "dataType": "string", "required": true }, "investedAmount": { "dataType": "string", "required": true }, "maturityLockingPeriod": { "dataType": "double", "required": true }, "status": { "dataType": "double", "required": true }, "currencyId": { "dataType": "string", "required": true }, "ProjectId": { "dataType": "string", "required": true }, "id": { "dataType": "double", "required": true } } } },
            "projects": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "resource": { "dataType": "union", "subSchemas": [{ "dataType": "any" }, { "dataType": "enum", "enums": [null] }], "required": true }, "lockInPeriod": { "dataType": "any", "required": true }, "legalId": { "dataType": "string", "required": true }, "ownerName": { "dataType": "string", "required": true }, "description": { "dataType": "string", "required": true }, "overallCost": { "dataType": "double", "required": true }, "actualMaturityDate": { "dataType": "string", "required": true }, "startDate": { "dataType": "string", "required": true }, "longitude": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }], "required": true }, "latitude": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }], "required": true }, "country": { "dataType": "string", "required": true }, "address": { "dataType": "string", "required": true }, "name": { "dataType": "string", "required": true }, "id": { "dataType": "double", "required": true } } } },
            "Currencies": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "symbol": { "dataType": "string", "required": true }, "name": { "dataType": "string", "required": true }, "id": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProjectReqDTO": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double" },
            "name": { "dataType": "string", "required": true },
            "address": { "dataType": "string", "required": true },
            "latitude": { "dataType": "double" },
            "countryName": { "dataType": "string", "required": true },
            "longitude": { "dataType": "double" },
            "startDate": { "dataType": "string", "required": true },
            "actualMaturityDate": { "dataType": "string" },
            "overallCost": { "dataType": "double" },
            "description": { "dataType": "string" },
            "ownerName": { "dataType": "string" },
            "legalId": { "dataType": "string" },
            "maturityLockingPeriod": { "dataType": "double" },
            "settings": { "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } },
            "entityID": { "dataType": "double", "required": true },
            "resourceIds": { "dataType": "array", "array": { "dataType": "double" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProfileDetailsRespDTO": {
        "dataType": "refObject",
        "properties": {
            "userId": { "dataType": "double", "required": true },
            "investorId": { "dataType": "double" },
            "FirstName": { "dataType": "string", "required": true },
            "LastName": { "dataType": "string", "required": true },
            "PersonalDetails": { "dataType": "nestedObjectLiteral", "nestedProperties": { "MailingAdress": { "dataType": "string", "required": true }, "ResidentailAddress": { "dataType": "string", "required": true }, "DOB": { "dataType": "string", "required": true }, "Mobile": { "dataType": "string", "required": true }, "Email": { "dataType": "string", "required": true } } },
            "NomineeDetails": { "dataType": "nestedObjectLiteral", "nestedProperties": { "Relation": { "dataType": "string", "required": true }, "Name": { "dataType": "string", "required": true }, "Mobile": { "dataType": "string", "required": true }, "Email": { "dataType": "string", "required": true } } },
            "EmergencyContactDetails": { "dataType": "nestedObjectLiteral", "nestedProperties": { "Relation": { "dataType": "string", "required": true }, "Name": { "dataType": "string", "required": true }, "Mobile": { "dataType": "string", "required": true }, "Email": { "dataType": "string", "required": true } } },
            "Documents": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "Status": { "dataType": "double", "required": true }, "URL": { "dataType": "string", "required": true }, "Name": { "dataType": "string", "required": true }, "id": { "dataType": "double", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "InvestorReqDTO": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double" },
            "nomineeDetails": { "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } },
            "emergencyContact": { "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" }, "required": true },
            "personalDetails": { "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } },
            "userId": { "dataType": "double", "required": true },
            "settings": { "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } },
            "ownerId": { "dataType": "string" },
            "caId": { "dataType": "string" },
            "projectIds": { "dataType": "array", "array": { "dataType": "double" }, "required": true },
            "lockInPeriod": { "dataType": "string", "required": true },
            "resourceIds": { "dataType": "array", "array": { "dataType": "double" } },
            "documents": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "status": { "dataType": "boolean", "required": true }, "docUrl": { "dataType": "string", "required": true }, "docName": { "dataType": "string", "required": true }, "id": { "dataType": "string", "required": true } } } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial__docName-string--docUrl-string--status-boolean__": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "docName": { "dataType": "string" }, "docUrl": { "dataType": "string" }, "status": { "dataType": "boolean" } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EntityRespDTO": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double" },
            "name": { "dataType": "string", "required": true },
            "address": { "dataType": "string", "required": true },
            "country": { "dataType": "string", "required": true },
            "regId": { "dataType": "string", "required": true },
            "ownerId": { "dataType": "string" },
            "caId": { "dataType": "string" },
            "settings": { "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } },
            "projects": { "dataType": "array", "array": { "dataType": "refObject", "ref": "ProjectRespDTO" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_CurrencyDTO_": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "id": { "dataType": "double" }, "code": { "dataType": "string" }, "name": { "dataType": "string" }, "symbol": { "dataType": "string" } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ContentDTO": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double" },
            "title": { "dataType": "string", "required": true },
            "imageUrl": { "dataType": "string" },
            "description": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_ContentDTO_": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "id": { "dataType": "double" }, "title": { "dataType": "string" }, "imageUrl": { "dataType": "string" }, "description": { "dataType": "string" } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GoogleLoginRespDTO": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double", "required": true },
            "firstName": { "dataType": "string" },
            "lastName": { "dataType": "string" },
            "email": { "dataType": "string", "required": true },
            "picture": { "dataType": "string" },
            "roles": { "dataType": "array", "array": { "dataType": "any" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GoogleLoginReqDTO": {
        "dataType": "refObject",
        "properties": {
            "token": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AccountReqDTO": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double" },
            "currency": { "dataType": "double", "required": true },
            "investorId": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new runtime_1.ExpressTemplateService(models, { "noImplicitAdditionalProperties": "throw-on-extras", "bodyCoercion": true });
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
function RegisterRoutes(app) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
    const argsUserController_getAllUsers = {};
    app.get('/users', ...((0, runtime_1.fetchMiddlewares)(users_controller_1.UserController)), ...((0, runtime_1.fetchMiddlewares)(users_controller_1.UserController.prototype.getAllUsers)), function UserController_getAllUsers(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_getAllUsers, request, response });
                const controller = new users_controller_1.UserController();
                yield templateService.apiHandler({
                    methodName: 'getAllUsers',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsUserController_getUserById = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
    };
    app.get('/users/:id', ...((0, runtime_1.fetchMiddlewares)(users_controller_1.UserController)), ...((0, runtime_1.fetchMiddlewares)(users_controller_1.UserController.prototype.getUserById)), function UserController_getUserById(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_getUserById, request, response });
                const controller = new users_controller_1.UserController();
                yield templateService.apiHandler({
                    methodName: 'getUserById',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsUserController_createUser = {
        user: { "in": "body", "name": "user", "required": true, "ref": "UserReqDTO" },
    };
    app.post('/users', ...((0, runtime_1.fetchMiddlewares)(users_controller_1.UserController)), ...((0, runtime_1.fetchMiddlewares)(users_controller_1.UserController.prototype.createUser)), function UserController_createUser(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_createUser, request, response });
                const controller = new users_controller_1.UserController();
                yield templateService.apiHandler({
                    methodName: 'createUser',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsUserController_createUserUsingPassword = {
        user: { "in": "body", "name": "user", "required": true, "ref": "UserReqDTO" },
    };
    app.post('/users/with-password', ...((0, runtime_1.fetchMiddlewares)(users_controller_1.UserController)), ...((0, runtime_1.fetchMiddlewares)(users_controller_1.UserController.prototype.createUserUsingPassword)), function UserController_createUserUsingPassword(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_createUserUsingPassword, request, response });
                const controller = new users_controller_1.UserController();
                yield templateService.apiHandler({
                    methodName: 'createUserUsingPassword',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsUserController_updateUser = {
        user: { "in": "body", "name": "user", "required": true, "ref": "UserReqDTO" },
    };
    app.put('/users', ...((0, runtime_1.fetchMiddlewares)(users_controller_1.UserController)), ...((0, runtime_1.fetchMiddlewares)(users_controller_1.UserController.prototype.updateUser)), function UserController_updateUser(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_updateUser, request, response });
                const controller = new users_controller_1.UserController();
                yield templateService.apiHandler({
                    methodName: 'updateUser',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsUserController_updateUserRoles = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        roleIds: { "in": "body", "name": "roleIds", "required": true, "dataType": "array", "array": { "dataType": "double" } },
    };
    app.put('/users/:id/roles', ...((0, runtime_1.fetchMiddlewares)(users_controller_1.UserController)), ...((0, runtime_1.fetchMiddlewares)(users_controller_1.UserController.prototype.updateUserRoles)), function UserController_updateUserRoles(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_updateUserRoles, request, response });
                const controller = new users_controller_1.UserController();
                yield templateService.apiHandler({
                    methodName: 'updateUserRoles',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsUserController_changePassword = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        body: { "in": "body", "name": "body", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "isFirstLogin": { "dataType": "boolean" }, "newPassword": { "dataType": "string", "required": true }, "oldPassword": { "dataType": "string", "required": true } } },
    };
    app.put('/users/:id/change-password', ...((0, runtime_1.fetchMiddlewares)(users_controller_1.UserController)), ...((0, runtime_1.fetchMiddlewares)(users_controller_1.UserController.prototype.changePassword)), function UserController_changePassword(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_changePassword, request, response });
                const controller = new users_controller_1.UserController();
                yield templateService.apiHandler({
                    methodName: 'changePassword',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsUserController_assignEntity = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        body: { "in": "body", "name": "body", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "entityIds": { "dataType": "array", "array": { "dataType": "double" }, "required": true } } },
    };
    app.put('/users/:id/entity/assign', ...((0, runtime_1.fetchMiddlewares)(users_controller_1.UserController)), ...((0, runtime_1.fetchMiddlewares)(users_controller_1.UserController.prototype.assignEntity)), function UserController_assignEntity(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_assignEntity, request, response });
                const controller = new users_controller_1.UserController();
                yield templateService.apiHandler({
                    methodName: 'assignEntity',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsUserController_login = {
        body: { "in": "body", "name": "body", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "generateBiometricToken": { "dataType": "boolean" }, "biometricToken": { "dataType": "string" }, "entity": { "dataType": "double" }, "password": { "dataType": "string", "required": true }, "email": { "dataType": "string", "required": true } } },
    };
    app.post('/users/login', ...((0, runtime_1.fetchMiddlewares)(users_controller_1.UserController)), ...((0, runtime_1.fetchMiddlewares)(users_controller_1.UserController.prototype.login)), function UserController_login(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_login, request, response });
                const controller = new users_controller_1.UserController();
                yield templateService.apiHandler({
                    methodName: 'login',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsUserDetailsController_getUserDetails = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
    };
    app.get('/users/details/:id', ...((0, runtime_1.fetchMiddlewares)(userDetails_controller_1.UserDetailsController)), ...((0, runtime_1.fetchMiddlewares)(userDetails_controller_1.UserDetailsController.prototype.getUserDetails)), function UserDetailsController_getUserDetails(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserDetailsController_getUserDetails, request, response });
                const controller = new userDetails_controller_1.UserDetailsController();
                yield templateService.apiHandler({
                    methodName: 'getUserDetails',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsTransactionController_getAllTransactions = {};
    app.get('/transactions', ...((0, runtime_1.fetchMiddlewares)(transacction_controller_1.TransactionController)), ...((0, runtime_1.fetchMiddlewares)(transacction_controller_1.TransactionController.prototype.getAllTransactions)), function TransactionController_getAllTransactions(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsTransactionController_getAllTransactions, request, response });
                const controller = new transacction_controller_1.TransactionController();
                yield templateService.apiHandler({
                    methodName: 'getAllTransactions',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsTransactionController_getTransactionById = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
    };
    app.get('/transactions/:id', ...((0, runtime_1.fetchMiddlewares)(transacction_controller_1.TransactionController)), ...((0, runtime_1.fetchMiddlewares)(transacction_controller_1.TransactionController.prototype.getTransactionById)), function TransactionController_getTransactionById(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsTransactionController_getTransactionById, request, response });
                const controller = new transacction_controller_1.TransactionController();
                yield templateService.apiHandler({
                    methodName: 'getTransactionById',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsTransactionController_createTransaction = {
        transaction: { "in": "body", "name": "transaction", "required": true, "ref": "TransactionDTO" },
    };
    app.post('/transactions', ...((0, runtime_1.fetchMiddlewares)(transacction_controller_1.TransactionController)), ...((0, runtime_1.fetchMiddlewares)(transacction_controller_1.TransactionController.prototype.createTransaction)), function TransactionController_createTransaction(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsTransactionController_createTransaction, request, response });
                const controller = new transacction_controller_1.TransactionController();
                yield templateService.apiHandler({
                    methodName: 'createTransaction',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsTransactionController_addEarning = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        body: { "in": "body", "name": "body", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "earning": { "dataType": "double", "required": true }, "investorId": { "dataType": "double", "required": true } } },
    };
    app.put('/transactions/:id/earning', ...((0, runtime_1.fetchMiddlewares)(transacction_controller_1.TransactionController)), ...((0, runtime_1.fetchMiddlewares)(transacction_controller_1.TransactionController.prototype.addEarning)), function TransactionController_addEarning(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsTransactionController_addEarning, request, response });
                const controller = new transacction_controller_1.TransactionController();
                yield templateService.apiHandler({
                    methodName: 'addEarning',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsRoleController_getAllRoles = {};
    app.get('/roles', ...((0, runtime_1.fetchMiddlewares)(roles_controller_1.RoleController)), ...((0, runtime_1.fetchMiddlewares)(roles_controller_1.RoleController.prototype.getAllRoles)), function RoleController_getAllRoles(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRoleController_getAllRoles, request, response });
                const controller = new roles_controller_1.RoleController();
                yield templateService.apiHandler({
                    methodName: 'getAllRoles',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsRoleController_getRoleById = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
    };
    app.get('/roles/:id', ...((0, runtime_1.fetchMiddlewares)(roles_controller_1.RoleController)), ...((0, runtime_1.fetchMiddlewares)(roles_controller_1.RoleController.prototype.getRoleById)), function RoleController_getRoleById(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRoleController_getRoleById, request, response });
                const controller = new roles_controller_1.RoleController();
                yield templateService.apiHandler({
                    methodName: 'getRoleById',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsRoleController_createRole = {
        role: { "in": "body", "name": "role", "required": true, "ref": "RoleDTO" },
    };
    app.post('/roles', ...((0, runtime_1.fetchMiddlewares)(roles_controller_1.RoleController)), ...((0, runtime_1.fetchMiddlewares)(roles_controller_1.RoleController.prototype.createRole)), function RoleController_createRole(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRoleController_createRole, request, response });
                const controller = new roles_controller_1.RoleController();
                yield templateService.apiHandler({
                    methodName: 'createRole',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsRoleController_deleteRole = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
    };
    app.delete('/roles/:id', ...((0, runtime_1.fetchMiddlewares)(roles_controller_1.RoleController)), ...((0, runtime_1.fetchMiddlewares)(roles_controller_1.RoleController.prototype.deleteRole)), function RoleController_deleteRole(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRoleController_deleteRole, request, response });
                const controller = new roles_controller_1.RoleController();
                yield templateService.apiHandler({
                    methodName: 'deleteRole',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsRoleController_updateRoleName = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        roleData: { "in": "body", "name": "roleData", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "name": { "dataType": "string", "required": true } } },
    };
    app.put('/roles/:id', ...((0, runtime_1.fetchMiddlewares)(roles_controller_1.RoleController)), ...((0, runtime_1.fetchMiddlewares)(roles_controller_1.RoleController.prototype.updateRoleName)), function RoleController_updateRoleName(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRoleController_updateRoleName, request, response });
                const controller = new roles_controller_1.RoleController();
                yield templateService.apiHandler({
                    methodName: 'updateRoleName',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsResourceController_getAllEntities = {};
    app.get('/resources', ...((0, runtime_1.fetchMiddlewares)(resouce_controller_1.ResourceController)), ...((0, runtime_1.fetchMiddlewares)(resouce_controller_1.ResourceController.prototype.getAllEntities)), function ResourceController_getAllEntities(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsResourceController_getAllEntities, request, response });
                const controller = new resouce_controller_1.ResourceController();
                yield templateService.apiHandler({
                    methodName: 'getAllEntities',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsResourceController_getResourceById = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
    };
    app.get('/resources/:id', ...((0, runtime_1.fetchMiddlewares)(resouce_controller_1.ResourceController)), ...((0, runtime_1.fetchMiddlewares)(resouce_controller_1.ResourceController.prototype.getResourceById)), function ResourceController_getResourceById(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsResourceController_getResourceById, request, response });
                const controller = new resouce_controller_1.ResourceController();
                yield templateService.apiHandler({
                    methodName: 'getResourceById',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsResourceController_createResource = {
        resource: { "in": "body", "name": "resource", "required": true, "ref": "ResourceDTO" },
    };
    app.post('/resources', ...((0, runtime_1.fetchMiddlewares)(resouce_controller_1.ResourceController)), ...((0, runtime_1.fetchMiddlewares)(resouce_controller_1.ResourceController.prototype.createResource)), function ResourceController_createResource(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsResourceController_createResource, request, response });
                const controller = new resouce_controller_1.ResourceController();
                yield templateService.apiHandler({
                    methodName: 'createResource',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsProjectController_getAllProjects = {
        req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
    };
    app.get('/projects', ...((0, runtime_1.fetchMiddlewares)(project_controller_1.ProjectController)), ...((0, runtime_1.fetchMiddlewares)(project_controller_1.ProjectController.prototype.getAllProjects)), function ProjectController_getAllProjects(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsProjectController_getAllProjects, request, response });
                const controller = new project_controller_1.ProjectController();
                yield templateService.apiHandler({
                    methodName: 'getAllProjects',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsProjectController_getProjectById = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
    };
    app.get('/projects/:id', ...((0, runtime_1.fetchMiddlewares)(project_controller_1.ProjectController)), ...((0, runtime_1.fetchMiddlewares)(project_controller_1.ProjectController.prototype.getProjectById)), function ProjectController_getProjectById(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsProjectController_getProjectById, request, response });
                const controller = new project_controller_1.ProjectController();
                yield templateService.apiHandler({
                    methodName: 'getProjectById',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsProjectController_getProjectsByEntityId = {
        entityIds: { "in": "query", "name": "entityIds", "required": true, "dataType": "string" },
    };
    app.get('/projects/Entity', ...((0, runtime_1.fetchMiddlewares)(project_controller_1.ProjectController)), ...((0, runtime_1.fetchMiddlewares)(project_controller_1.ProjectController.prototype.getProjectsByEntityId)), function ProjectController_getProjectsByEntityId(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsProjectController_getProjectsByEntityId, request, response });
                const controller = new project_controller_1.ProjectController();
                yield templateService.apiHandler({
                    methodName: 'getProjectsByEntityId',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsProjectController_createProject = {
        project: { "in": "body", "name": "project", "required": true, "ref": "ProjectReqDTO" },
    };
    app.post('/projects', ...((0, runtime_1.fetchMiddlewares)(project_controller_1.ProjectController)), ...((0, runtime_1.fetchMiddlewares)(project_controller_1.ProjectController.prototype.createProject)), function ProjectController_createProject(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsProjectController_createProject, request, response });
                const controller = new project_controller_1.ProjectController();
                yield templateService.apiHandler({
                    methodName: 'createProject',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsProjectController_updateProject = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        updateData: { "in": "body", "name": "updateData", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "file": { "dataType": "string" }, "settings": { "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } }, "ownerName": { "dataType": "string" }, "maturityLockingPeriod": { "dataType": "double" }, "overallCost": { "dataType": "double" }, "description": { "dataType": "string" }, "address": { "dataType": "string" } } },
    };
    app.put('/projects/:id', ...((0, runtime_1.fetchMiddlewares)(project_controller_1.ProjectController)), ...((0, runtime_1.fetchMiddlewares)(project_controller_1.ProjectController.prototype.updateProject)), function ProjectController_updateProject(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsProjectController_updateProject, request, response });
                const controller = new project_controller_1.ProjectController();
                yield templateService.apiHandler({
                    methodName: 'updateProject',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsProfileDetailsController_getProfileDetails = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
    };
    app.get('/profile/details/:id', ...((0, runtime_1.fetchMiddlewares)(profile_controller_1.ProfileDetailsController)), ...((0, runtime_1.fetchMiddlewares)(profile_controller_1.ProfileDetailsController.prototype.getProfileDetails)), function ProfileDetailsController_getProfileDetails(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsProfileDetailsController_getProfileDetails, request, response });
                const controller = new profile_controller_1.ProfileDetailsController();
                yield templateService.apiHandler({
                    methodName: 'getProfileDetails',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsInvestorController_getAllInvestors = {};
    app.get('/investors', ...((0, runtime_1.fetchMiddlewares)(investor_controller_1.InvestorController)), ...((0, runtime_1.fetchMiddlewares)(investor_controller_1.InvestorController.prototype.getAllInvestors)), function InvestorController_getAllInvestors(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsInvestorController_getAllInvestors, request, response });
                const controller = new investor_controller_1.InvestorController();
                yield templateService.apiHandler({
                    methodName: 'getAllInvestors',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsInvestorController_getInvestorById = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
    };
    app.get('/investors/:id', ...((0, runtime_1.fetchMiddlewares)(investor_controller_1.InvestorController)), ...((0, runtime_1.fetchMiddlewares)(investor_controller_1.InvestorController.prototype.getInvestorById)), function InvestorController_getInvestorById(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsInvestorController_getInvestorById, request, response });
                const controller = new investor_controller_1.InvestorController();
                yield templateService.apiHandler({
                    methodName: 'getInvestorById',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsInvestorController_createInvestor = {
        investor: { "in": "body", "name": "investor", "required": true, "ref": "InvestorReqDTO" },
    };
    app.post('/investors', ...((0, runtime_1.fetchMiddlewares)(investor_controller_1.InvestorController)), ...((0, runtime_1.fetchMiddlewares)(investor_controller_1.InvestorController.prototype.createInvestor)), function InvestorController_createInvestor(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsInvestorController_createInvestor, request, response });
                const controller = new investor_controller_1.InvestorController();
                yield templateService.apiHandler({
                    methodName: 'createInvestor',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsInvestorController_updateInvestorNomineeDetails = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        nomitneeDetails: { "in": "body", "name": "nomitneeDetails", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } },
    };
    app.put('/investors/:id/nomineeDetails', ...((0, runtime_1.fetchMiddlewares)(investor_controller_1.InvestorController)), ...((0, runtime_1.fetchMiddlewares)(investor_controller_1.InvestorController.prototype.updateInvestorNomineeDetails)), function InvestorController_updateInvestorNomineeDetails(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsInvestorController_updateInvestorNomineeDetails, request, response });
                const controller = new investor_controller_1.InvestorController();
                yield templateService.apiHandler({
                    methodName: 'updateInvestorNomineeDetails',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsInvestorController_updateEmergencyContact = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        emergencyContact: { "in": "body", "name": "emergencyContact", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } },
    };
    app.put('/investors/:id/emergencyContact', ...((0, runtime_1.fetchMiddlewares)(investor_controller_1.InvestorController)), ...((0, runtime_1.fetchMiddlewares)(investor_controller_1.InvestorController.prototype.updateEmergencyContact)), function InvestorController_updateEmergencyContact(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsInvestorController_updateEmergencyContact, request, response });
                const controller = new investor_controller_1.InvestorController();
                yield templateService.apiHandler({
                    methodName: 'updateEmergencyContact',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsInvestorController_updateInvestorPersonalDetails = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        personalDetails: { "in": "body", "name": "personalDetails", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } },
    };
    app.put('/investors/:id/personalDetails', ...((0, runtime_1.fetchMiddlewares)(investor_controller_1.InvestorController)), ...((0, runtime_1.fetchMiddlewares)(investor_controller_1.InvestorController.prototype.updateInvestorPersonalDetails)), function InvestorController_updateInvestorPersonalDetails(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsInvestorController_updateInvestorPersonalDetails, request, response });
                const controller = new investor_controller_1.InvestorController();
                yield templateService.apiHandler({
                    methodName: 'updateInvestorPersonalDetails',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsInvestorController_updateInvestor = {
        investor: { "in": "body", "name": "investor", "required": true, "ref": "InvestorReqDTO" },
    };
    app.put('/investors', ...((0, runtime_1.fetchMiddlewares)(investor_controller_1.InvestorController)), ...((0, runtime_1.fetchMiddlewares)(investor_controller_1.InvestorController.prototype.updateInvestor)), function InvestorController_updateInvestor(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsInvestorController_updateInvestor, request, response });
                const controller = new investor_controller_1.InvestorController();
                yield templateService.apiHandler({
                    methodName: 'updateInvestor',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsInvestorController_assignProject = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        projectData: { "in": "body", "name": "projectData", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "projects": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "lockInPeriod": { "dataType": "string", "required": true }, "projectId": { "dataType": "double", "required": true } } }, "required": true } } },
    };
    app.put('/investors/:id/projects/assign', ...((0, runtime_1.fetchMiddlewares)(investor_controller_1.InvestorController)), ...((0, runtime_1.fetchMiddlewares)(investor_controller_1.InvestorController.prototype.assignProject)), function InvestorController_assignProject(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsInvestorController_assignProject, request, response });
                const controller = new investor_controller_1.InvestorController();
                yield templateService.apiHandler({
                    methodName: 'assignProject',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsInvestorController_addDocumentDetails = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        docDetails: { "in": "body", "name": "docDetails", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "status": { "dataType": "boolean", "required": true }, "docUrl": { "dataType": "string", "required": true }, "docName": { "dataType": "string", "required": true }, "id": { "dataType": "string" } } },
    };
    app.put('/investors/:id/documents', ...((0, runtime_1.fetchMiddlewares)(investor_controller_1.InvestorController)), ...((0, runtime_1.fetchMiddlewares)(investor_controller_1.InvestorController.prototype.addDocumentDetails)), function InvestorController_addDocumentDetails(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsInvestorController_addDocumentDetails, request, response });
                const controller = new investor_controller_1.InvestorController();
                yield templateService.apiHandler({
                    methodName: 'addDocumentDetails',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsInvestorController_updateDocumentById = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        documentId: { "in": "path", "name": "documentId", "required": true, "dataType": "string" },
        updates: { "in": "body", "name": "updates", "required": true, "ref": "Partial__docName-string--docUrl-string--status-boolean__" },
    };
    app.put('/investors/:id/documents/:documentId', ...((0, runtime_1.fetchMiddlewares)(investor_controller_1.InvestorController)), ...((0, runtime_1.fetchMiddlewares)(investor_controller_1.InvestorController.prototype.updateDocumentById)), function InvestorController_updateDocumentById(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsInvestorController_updateDocumentById, request, response });
                const controller = new investor_controller_1.InvestorController();
                yield templateService.apiHandler({
                    methodName: 'updateDocumentById',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsInvestorController_getDocumentsByInvestorId = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
    };
    app.get('/investors/:id/documents', ...((0, runtime_1.fetchMiddlewares)(investor_controller_1.InvestorController)), ...((0, runtime_1.fetchMiddlewares)(investor_controller_1.InvestorController.prototype.getDocumentsByInvestorId)), function InvestorController_getDocumentsByInvestorId(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsInvestorController_getDocumentsByInvestorId, request, response });
                const controller = new investor_controller_1.InvestorController();
                yield templateService.apiHandler({
                    methodName: 'getDocumentsByInvestorId',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsInvestorController_deleteDocumentById = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        documentId: { "in": "path", "name": "documentId", "required": true, "dataType": "string" },
    };
    app.delete('/investors/:id/documents/:documentId', ...((0, runtime_1.fetchMiddlewares)(investor_controller_1.InvestorController)), ...((0, runtime_1.fetchMiddlewares)(investor_controller_1.InvestorController.prototype.deleteDocumentById)), function InvestorController_deleteDocumentById(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsInvestorController_deleteDocumentById, request, response });
                const controller = new investor_controller_1.InvestorController();
                yield templateService.apiHandler({
                    methodName: 'deleteDocumentById',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsInvestmentController_getAllInvestments = {};
    app.get('/investments', ...((0, runtime_1.fetchMiddlewares)(investment_controller_1.InvestmentController)), ...((0, runtime_1.fetchMiddlewares)(investment_controller_1.InvestmentController.prototype.getAllInvestments)), function InvestmentController_getAllInvestments(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsInvestmentController_getAllInvestments, request, response });
                const controller = new investment_controller_1.InvestmentController();
                yield templateService.apiHandler({
                    methodName: 'getAllInvestments',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsInvestmentController_getInvestmentById = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
    };
    app.get('/investments/:id', ...((0, runtime_1.fetchMiddlewares)(investment_controller_1.InvestmentController)), ...((0, runtime_1.fetchMiddlewares)(investment_controller_1.InvestmentController.prototype.getInvestmentById)), function InvestmentController_getInvestmentById(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsInvestmentController_getInvestmentById, request, response });
                const controller = new investment_controller_1.InvestmentController();
                yield templateService.apiHandler({
                    methodName: 'getInvestmentById',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsInvestmentController_createInvestment = {
        investment: { "in": "body", "name": "investment", "required": true, "ref": "InvestmentDTO" },
    };
    app.post('/investments', ...((0, runtime_1.fetchMiddlewares)(investment_controller_1.InvestmentController)), ...((0, runtime_1.fetchMiddlewares)(investment_controller_1.InvestmentController.prototype.createInvestment)), function InvestmentController_createInvestment(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsInvestmentController_createInvestment, request, response });
                const controller = new investment_controller_1.InvestmentController();
                yield templateService.apiHandler({
                    methodName: 'createInvestment',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsEntityController_getAllEntities = {};
    app.get('/entities', ...((0, runtime_1.fetchMiddlewares)(entity_controller_1.EntityController)), ...((0, runtime_1.fetchMiddlewares)(entity_controller_1.EntityController.prototype.getAllEntities)), function EntityController_getAllEntities(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEntityController_getAllEntities, request, response });
                const controller = new entity_controller_1.EntityController();
                yield templateService.apiHandler({
                    methodName: 'getAllEntities',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsEntityController_getEntityById = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
    };
    app.get('/entities/:id', ...((0, runtime_1.fetchMiddlewares)(entity_controller_1.EntityController)), ...((0, runtime_1.fetchMiddlewares)(entity_controller_1.EntityController.prototype.getEntityById)), function EntityController_getEntityById(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEntityController_getEntityById, request, response });
                const controller = new entity_controller_1.EntityController();
                yield templateService.apiHandler({
                    methodName: 'getEntityById',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsEntityController_createEntity = {
        entity: { "in": "body", "name": "entity", "required": true, "ref": "EntityDTO" },
    };
    app.post('/entities', ...((0, runtime_1.fetchMiddlewares)(entity_controller_1.EntityController)), ...((0, runtime_1.fetchMiddlewares)(entity_controller_1.EntityController.prototype.createEntity)), function EntityController_createEntity(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEntityController_createEntity, request, response });
                const controller = new entity_controller_1.EntityController();
                yield templateService.apiHandler({
                    methodName: 'createEntity',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsEntityController_updateEntity = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        updateData: { "in": "body", "name": "updateData", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "settings": { "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" } }, "caId": { "dataType": "string" }, "ownerId": { "dataType": "string" }, "regId": { "dataType": "string", "required": true }, "country": { "dataType": "string", "required": true }, "address": { "dataType": "string", "required": true } } },
    };
    app.put('/entities/:id', ...((0, runtime_1.fetchMiddlewares)(entity_controller_1.EntityController)), ...((0, runtime_1.fetchMiddlewares)(entity_controller_1.EntityController.prototype.updateEntity)), function EntityController_updateEntity(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEntityController_updateEntity, request, response });
                const controller = new entity_controller_1.EntityController();
                yield templateService.apiHandler({
                    methodName: 'updateEntity',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsCurrencyController_getAllCurrencies = {};
    app.get('/currencies', ...((0, runtime_1.fetchMiddlewares)(currency_controller_1.CurrencyController)), ...((0, runtime_1.fetchMiddlewares)(currency_controller_1.CurrencyController.prototype.getAllCurrencies)), function CurrencyController_getAllCurrencies(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCurrencyController_getAllCurrencies, request, response });
                const controller = new currency_controller_1.CurrencyController();
                yield templateService.apiHandler({
                    methodName: 'getAllCurrencies',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsCurrencyController_getCurrencyById = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
    };
    app.get('/currencies/:id', ...((0, runtime_1.fetchMiddlewares)(currency_controller_1.CurrencyController)), ...((0, runtime_1.fetchMiddlewares)(currency_controller_1.CurrencyController.prototype.getCurrencyById)), function CurrencyController_getCurrencyById(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCurrencyController_getCurrencyById, request, response });
                const controller = new currency_controller_1.CurrencyController();
                yield templateService.apiHandler({
                    methodName: 'getCurrencyById',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsCurrencyController_createCurrency = {
        currency: { "in": "body", "name": "currency", "required": true, "ref": "CurrencyDTO" },
    };
    app.post('/currencies', ...((0, runtime_1.fetchMiddlewares)(currency_controller_1.CurrencyController)), ...((0, runtime_1.fetchMiddlewares)(currency_controller_1.CurrencyController.prototype.createCurrency)), function CurrencyController_createCurrency(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCurrencyController_createCurrency, request, response });
                const controller = new currency_controller_1.CurrencyController();
                yield templateService.apiHandler({
                    methodName: 'createCurrency',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsCurrencyController_deleteCurrency = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
    };
    app.delete('/currencies/:id', ...((0, runtime_1.fetchMiddlewares)(currency_controller_1.CurrencyController)), ...((0, runtime_1.fetchMiddlewares)(currency_controller_1.CurrencyController.prototype.deleteCurrency)), function CurrencyController_deleteCurrency(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCurrencyController_deleteCurrency, request, response });
                const controller = new currency_controller_1.CurrencyController();
                yield templateService.apiHandler({
                    methodName: 'deleteCurrency',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsCurrencyController_updateCurrency = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        currencyData: { "in": "body", "name": "currencyData", "required": true, "ref": "Partial_CurrencyDTO_" },
    };
    app.put('/currencies/:id', ...((0, runtime_1.fetchMiddlewares)(currency_controller_1.CurrencyController)), ...((0, runtime_1.fetchMiddlewares)(currency_controller_1.CurrencyController.prototype.updateCurrency)), function CurrencyController_updateCurrency(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCurrencyController_updateCurrency, request, response });
                const controller = new currency_controller_1.CurrencyController();
                yield templateService.apiHandler({
                    methodName: 'updateCurrency',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsContentController_getAllContents = {};
    app.get('/contents', ...((0, runtime_1.fetchMiddlewares)(contents_controller_1.ContentController)), ...((0, runtime_1.fetchMiddlewares)(contents_controller_1.ContentController.prototype.getAllContents)), function ContentController_getAllContents(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsContentController_getAllContents, request, response });
                const controller = new contents_controller_1.ContentController();
                yield templateService.apiHandler({
                    methodName: 'getAllContents',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsContentController_getContentById = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
    };
    app.get('/contents/:id', ...((0, runtime_1.fetchMiddlewares)(contents_controller_1.ContentController)), ...((0, runtime_1.fetchMiddlewares)(contents_controller_1.ContentController.prototype.getContentById)), function ContentController_getContentById(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsContentController_getContentById, request, response });
                const controller = new contents_controller_1.ContentController();
                yield templateService.apiHandler({
                    methodName: 'getContentById',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsContentController_createContent = {
        content: { "in": "body", "name": "content", "required": true, "ref": "ContentDTO" },
    };
    app.post('/contents', ...((0, runtime_1.fetchMiddlewares)(contents_controller_1.ContentController)), ...((0, runtime_1.fetchMiddlewares)(contents_controller_1.ContentController.prototype.createContent)), function ContentController_createContent(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsContentController_createContent, request, response });
                const controller = new contents_controller_1.ContentController();
                yield templateService.apiHandler({
                    methodName: 'createContent',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsContentController_deleteContent = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
    };
    app.delete('/contents/:id', ...((0, runtime_1.fetchMiddlewares)(contents_controller_1.ContentController)), ...((0, runtime_1.fetchMiddlewares)(contents_controller_1.ContentController.prototype.deleteContent)), function ContentController_deleteContent(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsContentController_deleteContent, request, response });
                const controller = new contents_controller_1.ContentController();
                yield templateService.apiHandler({
                    methodName: 'deleteContent',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsContentController_updateContent = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        contentData: { "in": "body", "name": "contentData", "required": true, "ref": "Partial_ContentDTO_" },
    };
    app.put('/contents/:id', ...((0, runtime_1.fetchMiddlewares)(contents_controller_1.ContentController)), ...((0, runtime_1.fetchMiddlewares)(contents_controller_1.ContentController.prototype.updateContent)), function ContentController_updateContent(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsContentController_updateContent, request, response });
                const controller = new contents_controller_1.ContentController();
                yield templateService.apiHandler({
                    methodName: 'updateContent',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsAuthController_googleLogin = {
        loginData: { "in": "body", "name": "loginData", "required": true, "ref": "GoogleLoginReqDTO" },
    };
    app.post('/auth/google-login', ...((0, runtime_1.fetchMiddlewares)(auth_controller_1.AuthController)), ...((0, runtime_1.fetchMiddlewares)(auth_controller_1.AuthController.prototype.googleLogin)), function AuthController_googleLogin(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_googleLogin, request, response });
                const controller = new auth_controller_1.AuthController();
                yield templateService.apiHandler({
                    methodName: 'googleLogin',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsAccountController_getAllAccounts = {};
    app.get('/accounts', ...((0, runtime_1.fetchMiddlewares)(account_controller_1.AccountController)), ...((0, runtime_1.fetchMiddlewares)(account_controller_1.AccountController.prototype.getAllAccounts)), function AccountController_getAllAccounts(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAccountController_getAllAccounts, request, response });
                const controller = new account_controller_1.AccountController();
                yield templateService.apiHandler({
                    methodName: 'getAllAccounts',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsAccountController_getAccountById = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
    };
    app.get('/accounts/:id', ...((0, runtime_1.fetchMiddlewares)(account_controller_1.AccountController)), ...((0, runtime_1.fetchMiddlewares)(account_controller_1.AccountController.prototype.getAccountById)), function AccountController_getAccountById(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAccountController_getAccountById, request, response });
                const controller = new account_controller_1.AccountController();
                yield templateService.apiHandler({
                    methodName: 'getAccountById',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsAccountController_getAccountsByInvestorId = {
        investorId: { "in": "path", "name": "investorId", "required": true, "dataType": "double" },
    };
    app.get('/accounts/investor/:investorId', ...((0, runtime_1.fetchMiddlewares)(account_controller_1.AccountController)), ...((0, runtime_1.fetchMiddlewares)(account_controller_1.AccountController.prototype.getAccountsByInvestorId)), function AccountController_getAccountsByInvestorId(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAccountController_getAccountsByInvestorId, request, response });
                const controller = new account_controller_1.AccountController();
                yield templateService.apiHandler({
                    methodName: 'getAccountsByInvestorId',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsAccountController_createAccount = {
        account: { "in": "body", "name": "account", "required": true, "ref": "AccountReqDTO" },
    };
    app.post('/accounts', ...((0, runtime_1.fetchMiddlewares)(account_controller_1.AccountController)), ...((0, runtime_1.fetchMiddlewares)(account_controller_1.AccountController.prototype.createAccount)), function AccountController_createAccount(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAccountController_createAccount, request, response });
                const controller = new account_controller_1.AccountController();
                yield templateService.apiHandler({
                    methodName: 'createAccount',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsAccountController_removeInvestorFromAccount = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
    };
    app.patch('/accounts/:id/remove-investor', ...((0, runtime_1.fetchMiddlewares)(account_controller_1.AccountController)), ...((0, runtime_1.fetchMiddlewares)(account_controller_1.AccountController.prototype.removeInvestorFromAccount)), function AccountController_removeInvestorFromAccount(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAccountController_removeInvestorFromAccount, request, response });
                const controller = new account_controller_1.AccountController();
                yield templateService.apiHandler({
                    methodName: 'removeInvestorFromAccount',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
