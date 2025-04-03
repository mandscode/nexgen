/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserController } from './../controllers/users.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserDetailsController } from './../controllers/userDetails.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TransactionController } from './../controllers/transacction.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { RoleController } from './../controllers/roles.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ResourceController } from './../controllers/resouce.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ProjectController } from './../controllers/project.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ProfileDetailsController } from './../controllers/profile.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { InvestorController } from './../controllers/investor.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { InvestmentController } from './../controllers/investment.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { EntityController } from './../controllers/entity.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CurrencyController } from './../controllers/currency.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ContentController } from './../controllers/contents.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AuthController } from './../controllers/auth.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AccountController } from './../controllers/account.controller';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "RoleDTO": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "name": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CurrencyDTO": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "code": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "symbol": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TransactionDTO": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "details": {"dataType":"string","required":true},
            "projectId": {"dataType":"double","required":true},
            "accountId": {"dataType":"double","required":true},
            "amount": {"dataType":"double","required":true},
            "credited": {"dataType":"boolean","required":true},
            "modifiedBy": {"dataType":"string"},
            "intrestRate": {"dataType":"double","required":true},
            "transactionDate": {"dataType":"datetime"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "InvestmentDTO": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "investmentType": {"dataType":"string","required":true},
            "amount": {"dataType":"double","required":true},
            "accountId": {"dataType":"double","required":true},
            "modifiedBy": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AccountRespDTO": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "currency": {"dataType":"double","required":true},
            "currencyDetails": {"ref":"CurrencyDTO"},
            "investorId": {"dataType":"double","required":true},
            "transactions": {"dataType":"array","array":{"dataType":"refObject","ref":"TransactionDTO"}},
            "investments": {"dataType":"array","array":{"dataType":"refObject","ref":"InvestmentDTO"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EntityDTO": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "name": {"dataType":"string","required":true},
            "address": {"dataType":"string","required":true},
            "country": {"dataType":"string","required":true},
            "regId": {"dataType":"string","required":true},
            "ownerId": {"dataType":"string"},
            "caId": {"dataType":"string"},
            "settings": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResourceDTO": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "location": {"dataType":"string","required":true},
            "sourceId": {"dataType":"string"},
            "type": {"dataType":"string","required":true},
            "group": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "InvestorRespDTO": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "nomineeDetails": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},
            "emergencyContact": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"},"required":true},
            "personalDetails": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},
            "userId": {"dataType":"double","required":true},
            "ownerId": {"dataType":"string"},
            "caId": {"dataType":"string"},
            "settings": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},
            "lockInPeriod": {"dataType":"string","required":true},
            "accounts": {"dataType":"array","array":{"dataType":"refObject","ref":"AccountRespDTO"}},
            "projects": {"dataType":"array","array":{"dataType":"refObject","ref":"ProjectRespDTO"}},
            "resources": {"dataType":"array","array":{"dataType":"refObject","ref":"ResourceDTO"}},
            "documents": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"status":{"dataType":"boolean","required":true},"docUrl":{"dataType":"string","required":true},"docName":{"dataType":"string","required":true},"id":{"dataType":"string","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProjectRespDTO": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "name": {"dataType":"string","required":true},
            "address": {"dataType":"string","required":true},
            "countryName": {"dataType":"string","required":true},
            "latitude": {"dataType":"double"},
            "longitude": {"dataType":"double"},
            "startDate": {"dataType":"datetime","required":true},
            "actualMaturityDate": {"dataType":"datetime"},
            "overallCost": {"dataType":"double"},
            "description": {"dataType":"string"},
            "ownerName": {"dataType":"string"},
            "legalId": {"dataType":"string"},
            "maturityLockingPeriod": {"dataType":"double"},
            "settings": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},
            "entity": {"ref":"EntityDTO","required":true},
            "resources": {"dataType":"array","array":{"dataType":"refObject","ref":"ResourceDTO"}},
            "investors": {"dataType":"array","array":{"dataType":"refObject","ref":"InvestorRespDTO"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserRespDTO": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "firstName": {"dataType":"string","required":true},
            "lastName": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "roles": {"dataType":"array","array":{"dataType":"refObject","ref":"RoleDTO"}},
            "investor": {"ref":"InvestorRespDTO"},
            "isMasterAdmin": {"dataType":"boolean","required":true},
            "personalDetails": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},
            "status": {"dataType":"string"},
            "entities": {"dataType":"array","array":{"dataType":"refObject","ref":"EntityDTO"}},
            "isFirstLogin": {"dataType":"boolean","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserReqDTO": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "firstName": {"dataType":"string","required":true},
            "lastName": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "password": {"dataType":"string"},
            "roleIds": {"dataType":"array","array":{"dataType":"double"},"required":true},
            "entityIds": {"dataType":"array","array":{"dataType":"double"}},
            "isMasterAdmin": {"dataType":"boolean","required":true},
            "isFirstLogin": {"dataType":"boolean","required":true},
            "status": {"dataType":"string"},
            "personalDetails": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserDetailsRespDTO": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "investorId": {"dataType":"double"},
            "firstName": {"dataType":"string","required":true},
            "lastName": {"dataType":"string","required":true},
            "status": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"string"}],"required":true},
            "message": {"dataType":"string","required":true},
            "roles": {"dataType":"array","array":{"dataType":"refObject","ref":"RoleDTO"}},
            "entities": {"dataType":"array","array":{"dataType":"refObject","ref":"EntityDTO"}},
            "InvestedCurrencies": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"symbol":{"dataType":"string","required":true},"name":{"dataType":"string","required":true},"id":{"dataType":"double","required":true}}}},
            "Investments": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"transactions":{"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"amount":{"dataType":"string","required":true},"credited":{"dataType":"boolean","required":true},"date":{"dataType":"string","required":true},"title":{"dataType":"string","required":true},"id":{"dataType":"double","required":true}}},"required":true},"totalValue":{"dataType":"string","required":true},"earning":{"dataType":"string","required":true},"investedAmount":{"dataType":"string","required":true},"maturityLockingPeriod":{"dataType":"double","required":true},"status":{"dataType":"double","required":true},"currencyId":{"dataType":"string","required":true},"ProjectId":{"dataType":"string","required":true},"id":{"dataType":"double","required":true}}}},
            "projects": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"resource":{"dataType":"union","subSchemas":[{"dataType":"any"},{"dataType":"enum","enums":[null]}],"required":true},"lockInPeriod":{"dataType":"any","required":true},"legalId":{"dataType":"string","required":true},"ownerName":{"dataType":"string","required":true},"description":{"dataType":"string","required":true},"overallCost":{"dataType":"double","required":true},"actualMaturityDate":{"dataType":"string","required":true},"startDate":{"dataType":"string","required":true},"longitude":{"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true},"latitude":{"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true},"country":{"dataType":"string","required":true},"address":{"dataType":"string","required":true},"name":{"dataType":"string","required":true},"id":{"dataType":"double","required":true}}}},
            "Currencies": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"symbol":{"dataType":"string","required":true},"name":{"dataType":"string","required":true},"id":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProjectReqDTO": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "name": {"dataType":"string","required":true},
            "address": {"dataType":"string","required":true},
            "latitude": {"dataType":"double"},
            "countryName": {"dataType":"string","required":true},
            "longitude": {"dataType":"double"},
            "startDate": {"dataType":"string","required":true},
            "actualMaturityDate": {"dataType":"string"},
            "overallCost": {"dataType":"double"},
            "description": {"dataType":"string"},
            "ownerName": {"dataType":"string"},
            "legalId": {"dataType":"string"},
            "maturityLockingPeriod": {"dataType":"double"},
            "settings": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},
            "entityID": {"dataType":"double","required":true},
            "resourceIds": {"dataType":"array","array":{"dataType":"double"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProfileDetailsRespDTO": {
        "dataType": "refObject",
        "properties": {
            "userId": {"dataType":"double","required":true},
            "investorId": {"dataType":"double"},
            "FirstName": {"dataType":"string","required":true},
            "LastName": {"dataType":"string","required":true},
            "PersonalDetails": {"dataType":"nestedObjectLiteral","nestedProperties":{"MailingAdress":{"dataType":"string","required":true},"ResidentailAddress":{"dataType":"string","required":true},"DOB":{"dataType":"string","required":true},"Mobile":{"dataType":"string","required":true},"Email":{"dataType":"string","required":true}}},
            "NomineeDetails": {"dataType":"nestedObjectLiteral","nestedProperties":{"Relation":{"dataType":"string","required":true},"Name":{"dataType":"string","required":true},"Mobile":{"dataType":"string","required":true},"Email":{"dataType":"string","required":true}}},
            "EmergencyContactDetails": {"dataType":"nestedObjectLiteral","nestedProperties":{"Relation":{"dataType":"string","required":true},"Name":{"dataType":"string","required":true},"Mobile":{"dataType":"string","required":true},"Email":{"dataType":"string","required":true}}},
            "Documents": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"Status":{"dataType":"double","required":true},"URL":{"dataType":"string","required":true},"Name":{"dataType":"string","required":true},"id":{"dataType":"double","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "InvestorReqDTO": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "nomineeDetails": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},
            "emergencyContact": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"},"required":true},
            "personalDetails": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},
            "userId": {"dataType":"double","required":true},
            "settings": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},
            "ownerId": {"dataType":"string"},
            "caId": {"dataType":"string"},
            "projectIds": {"dataType":"array","array":{"dataType":"double"},"required":true},
            "lockInPeriod": {"dataType":"string","required":true},
            "resourceIds": {"dataType":"array","array":{"dataType":"double"}},
            "documents": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"status":{"dataType":"boolean","required":true},"docUrl":{"dataType":"string","required":true},"docName":{"dataType":"string","required":true},"id":{"dataType":"string","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial__docName-string--docUrl-string--status-boolean__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"docName":{"dataType":"string"},"docUrl":{"dataType":"string"},"status":{"dataType":"boolean"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EntityRespDTO": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "name": {"dataType":"string","required":true},
            "address": {"dataType":"string","required":true},
            "country": {"dataType":"string","required":true},
            "regId": {"dataType":"string","required":true},
            "ownerId": {"dataType":"string"},
            "caId": {"dataType":"string"},
            "settings": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},
            "projects": {"dataType":"array","array":{"dataType":"refObject","ref":"ProjectRespDTO"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_CurrencyDTO_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"double"},"code":{"dataType":"string"},"name":{"dataType":"string"},"symbol":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ContentDTO": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "title": {"dataType":"string","required":true},
            "imageUrl": {"dataType":"string"},
            "description": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_ContentDTO_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"double"},"title":{"dataType":"string"},"imageUrl":{"dataType":"string"},"description":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GoogleLoginRespDTO": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "firstName": {"dataType":"string"},
            "lastName": {"dataType":"string"},
            "email": {"dataType":"string","required":true},
            "picture": {"dataType":"string"},
            "roles": {"dataType":"array","array":{"dataType":"any"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GoogleLoginReqDTO": {
        "dataType": "refObject",
        "properties": {
            "token": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AccountReqDTO": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "currency": {"dataType":"double","required":true},
            "investorId": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsUserController_getAllUsers: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/users',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.getAllUsers)),

            async function UserController_getAllUsers(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_getAllUsers, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'getAllUsers',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_getUserById: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.get('/users/:id',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.getUserById)),

            async function UserController_getUserById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_getUserById, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'getUserById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_createUser: Record<string, TsoaRoute.ParameterSchema> = {
                user: {"in":"body","name":"user","required":true,"ref":"UserReqDTO"},
        };
        app.post('/users',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.createUser)),

            async function UserController_createUser(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_createUser, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'createUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_createUserUsingPassword: Record<string, TsoaRoute.ParameterSchema> = {
                user: {"in":"body","name":"user","required":true,"ref":"UserReqDTO"},
        };
        app.post('/users/with-password',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.createUserUsingPassword)),

            async function UserController_createUserUsingPassword(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_createUserUsingPassword, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'createUserUsingPassword',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_updateUser: Record<string, TsoaRoute.ParameterSchema> = {
                user: {"in":"body","name":"user","required":true,"ref":"UserReqDTO"},
        };
        app.put('/users',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.updateUser)),

            async function UserController_updateUser(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_updateUser, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'updateUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_updateUserRoles: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                roleIds: {"in":"body","name":"roleIds","required":true,"dataType":"array","array":{"dataType":"double"}},
        };
        app.put('/users/:id/roles',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.updateUserRoles)),

            async function UserController_updateUserRoles(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_updateUserRoles, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'updateUserRoles',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_changePassword: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"isFirstLogin":{"dataType":"boolean"},"newPassword":{"dataType":"string","required":true},"oldPassword":{"dataType":"string","required":true}}},
        };
        app.put('/users/:id/change-password',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.changePassword)),

            async function UserController_changePassword(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_changePassword, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'changePassword',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_assignEntity: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"entityIds":{"dataType":"array","array":{"dataType":"double"},"required":true}}},
        };
        app.put('/users/:id/entity/assign',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.assignEntity)),

            async function UserController_assignEntity(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_assignEntity, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'assignEntity',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_login: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"generateBiometricToken":{"dataType":"boolean"},"biometricToken":{"dataType":"string"},"entity":{"dataType":"double"},"password":{"dataType":"string","required":true},"email":{"dataType":"string","required":true}}},
        };
        app.post('/users/login',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.login)),

            async function UserController_login(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_login, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'login',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserDetailsController_getUserDetails: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.get('/users/details/:id',
            ...(fetchMiddlewares<RequestHandler>(UserDetailsController)),
            ...(fetchMiddlewares<RequestHandler>(UserDetailsController.prototype.getUserDetails)),

            async function UserDetailsController_getUserDetails(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserDetailsController_getUserDetails, request, response });

                const controller = new UserDetailsController();

              await templateService.apiHandler({
                methodName: 'getUserDetails',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsTransactionController_getAllTransactions: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/transactions',
            ...(fetchMiddlewares<RequestHandler>(TransactionController)),
            ...(fetchMiddlewares<RequestHandler>(TransactionController.prototype.getAllTransactions)),

            async function TransactionController_getAllTransactions(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsTransactionController_getAllTransactions, request, response });

                const controller = new TransactionController();

              await templateService.apiHandler({
                methodName: 'getAllTransactions',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsTransactionController_getTransactionById: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.get('/transactions/:id',
            ...(fetchMiddlewares<RequestHandler>(TransactionController)),
            ...(fetchMiddlewares<RequestHandler>(TransactionController.prototype.getTransactionById)),

            async function TransactionController_getTransactionById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsTransactionController_getTransactionById, request, response });

                const controller = new TransactionController();

              await templateService.apiHandler({
                methodName: 'getTransactionById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsTransactionController_createTransaction: Record<string, TsoaRoute.ParameterSchema> = {
                transaction: {"in":"body","name":"transaction","required":true,"ref":"TransactionDTO"},
        };
        app.post('/transactions',
            ...(fetchMiddlewares<RequestHandler>(TransactionController)),
            ...(fetchMiddlewares<RequestHandler>(TransactionController.prototype.createTransaction)),

            async function TransactionController_createTransaction(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsTransactionController_createTransaction, request, response });

                const controller = new TransactionController();

              await templateService.apiHandler({
                methodName: 'createTransaction',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsTransactionController_addEarning: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"earning":{"dataType":"double","required":true},"investorId":{"dataType":"double","required":true}}},
        };
        app.put('/transactions/:id/earning',
            ...(fetchMiddlewares<RequestHandler>(TransactionController)),
            ...(fetchMiddlewares<RequestHandler>(TransactionController.prototype.addEarning)),

            async function TransactionController_addEarning(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsTransactionController_addEarning, request, response });

                const controller = new TransactionController();

              await templateService.apiHandler({
                methodName: 'addEarning',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRoleController_getAllRoles: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/roles',
            ...(fetchMiddlewares<RequestHandler>(RoleController)),
            ...(fetchMiddlewares<RequestHandler>(RoleController.prototype.getAllRoles)),

            async function RoleController_getAllRoles(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRoleController_getAllRoles, request, response });

                const controller = new RoleController();

              await templateService.apiHandler({
                methodName: 'getAllRoles',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRoleController_getRoleById: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.get('/roles/:id',
            ...(fetchMiddlewares<RequestHandler>(RoleController)),
            ...(fetchMiddlewares<RequestHandler>(RoleController.prototype.getRoleById)),

            async function RoleController_getRoleById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRoleController_getRoleById, request, response });

                const controller = new RoleController();

              await templateService.apiHandler({
                methodName: 'getRoleById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRoleController_createRole: Record<string, TsoaRoute.ParameterSchema> = {
                role: {"in":"body","name":"role","required":true,"ref":"RoleDTO"},
        };
        app.post('/roles',
            ...(fetchMiddlewares<RequestHandler>(RoleController)),
            ...(fetchMiddlewares<RequestHandler>(RoleController.prototype.createRole)),

            async function RoleController_createRole(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRoleController_createRole, request, response });

                const controller = new RoleController();

              await templateService.apiHandler({
                methodName: 'createRole',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRoleController_deleteRole: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.delete('/roles/:id',
            ...(fetchMiddlewares<RequestHandler>(RoleController)),
            ...(fetchMiddlewares<RequestHandler>(RoleController.prototype.deleteRole)),

            async function RoleController_deleteRole(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRoleController_deleteRole, request, response });

                const controller = new RoleController();

              await templateService.apiHandler({
                methodName: 'deleteRole',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsRoleController_updateRoleName: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                roleData: {"in":"body","name":"roleData","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"name":{"dataType":"string","required":true}}},
        };
        app.put('/roles/:id',
            ...(fetchMiddlewares<RequestHandler>(RoleController)),
            ...(fetchMiddlewares<RequestHandler>(RoleController.prototype.updateRoleName)),

            async function RoleController_updateRoleName(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsRoleController_updateRoleName, request, response });

                const controller = new RoleController();

              await templateService.apiHandler({
                methodName: 'updateRoleName',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsResourceController_getAllEntities: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/resources',
            ...(fetchMiddlewares<RequestHandler>(ResourceController)),
            ...(fetchMiddlewares<RequestHandler>(ResourceController.prototype.getAllEntities)),

            async function ResourceController_getAllEntities(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsResourceController_getAllEntities, request, response });

                const controller = new ResourceController();

              await templateService.apiHandler({
                methodName: 'getAllEntities',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsResourceController_getResourceById: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.get('/resources/:id',
            ...(fetchMiddlewares<RequestHandler>(ResourceController)),
            ...(fetchMiddlewares<RequestHandler>(ResourceController.prototype.getResourceById)),

            async function ResourceController_getResourceById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsResourceController_getResourceById, request, response });

                const controller = new ResourceController();

              await templateService.apiHandler({
                methodName: 'getResourceById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsResourceController_createResource: Record<string, TsoaRoute.ParameterSchema> = {
                resource: {"in":"body","name":"resource","required":true,"ref":"ResourceDTO"},
        };
        app.post('/resources',
            ...(fetchMiddlewares<RequestHandler>(ResourceController)),
            ...(fetchMiddlewares<RequestHandler>(ResourceController.prototype.createResource)),

            async function ResourceController_createResource(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsResourceController_createResource, request, response });

                const controller = new ResourceController();

              await templateService.apiHandler({
                methodName: 'createResource',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsProjectController_getAllProjects: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.get('/projects',
            ...(fetchMiddlewares<RequestHandler>(ProjectController)),
            ...(fetchMiddlewares<RequestHandler>(ProjectController.prototype.getAllProjects)),

            async function ProjectController_getAllProjects(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsProjectController_getAllProjects, request, response });

                const controller = new ProjectController();

              await templateService.apiHandler({
                methodName: 'getAllProjects',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsProjectController_getProjectById: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.get('/projects/:id',
            ...(fetchMiddlewares<RequestHandler>(ProjectController)),
            ...(fetchMiddlewares<RequestHandler>(ProjectController.prototype.getProjectById)),

            async function ProjectController_getProjectById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsProjectController_getProjectById, request, response });

                const controller = new ProjectController();

              await templateService.apiHandler({
                methodName: 'getProjectById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsProjectController_getProjectsByEntityId: Record<string, TsoaRoute.ParameterSchema> = {
                entityIds: {"in":"query","name":"entityIds","required":true,"dataType":"string"},
        };
        app.get('/projects/Entity',
            ...(fetchMiddlewares<RequestHandler>(ProjectController)),
            ...(fetchMiddlewares<RequestHandler>(ProjectController.prototype.getProjectsByEntityId)),

            async function ProjectController_getProjectsByEntityId(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsProjectController_getProjectsByEntityId, request, response });

                const controller = new ProjectController();

              await templateService.apiHandler({
                methodName: 'getProjectsByEntityId',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsProjectController_createProject: Record<string, TsoaRoute.ParameterSchema> = {
                project: {"in":"body","name":"project","required":true,"ref":"ProjectReqDTO"},
        };
        app.post('/projects',
            ...(fetchMiddlewares<RequestHandler>(ProjectController)),
            ...(fetchMiddlewares<RequestHandler>(ProjectController.prototype.createProject)),

            async function ProjectController_createProject(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsProjectController_createProject, request, response });

                const controller = new ProjectController();

              await templateService.apiHandler({
                methodName: 'createProject',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsProjectController_updateProject: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                updateData: {"in":"body","name":"updateData","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"file":{"dataType":"string"},"settings":{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},"ownerName":{"dataType":"string"},"maturityLockingPeriod":{"dataType":"double"},"overallCost":{"dataType":"double"},"description":{"dataType":"string"},"address":{"dataType":"string"}}},
        };
        app.put('/projects/:id',
            ...(fetchMiddlewares<RequestHandler>(ProjectController)),
            ...(fetchMiddlewares<RequestHandler>(ProjectController.prototype.updateProject)),

            async function ProjectController_updateProject(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsProjectController_updateProject, request, response });

                const controller = new ProjectController();

              await templateService.apiHandler({
                methodName: 'updateProject',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsProfileDetailsController_getProfileDetails: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.get('/profile/details/:id',
            ...(fetchMiddlewares<RequestHandler>(ProfileDetailsController)),
            ...(fetchMiddlewares<RequestHandler>(ProfileDetailsController.prototype.getProfileDetails)),

            async function ProfileDetailsController_getProfileDetails(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsProfileDetailsController_getProfileDetails, request, response });

                const controller = new ProfileDetailsController();

              await templateService.apiHandler({
                methodName: 'getProfileDetails',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsInvestorController_getAllInvestors: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/investors',
            ...(fetchMiddlewares<RequestHandler>(InvestorController)),
            ...(fetchMiddlewares<RequestHandler>(InvestorController.prototype.getAllInvestors)),

            async function InvestorController_getAllInvestors(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsInvestorController_getAllInvestors, request, response });

                const controller = new InvestorController();

              await templateService.apiHandler({
                methodName: 'getAllInvestors',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsInvestorController_getInvestorById: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.get('/investors/:id',
            ...(fetchMiddlewares<RequestHandler>(InvestorController)),
            ...(fetchMiddlewares<RequestHandler>(InvestorController.prototype.getInvestorById)),

            async function InvestorController_getInvestorById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsInvestorController_getInvestorById, request, response });

                const controller = new InvestorController();

              await templateService.apiHandler({
                methodName: 'getInvestorById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsInvestorController_createInvestor: Record<string, TsoaRoute.ParameterSchema> = {
                investor: {"in":"body","name":"investor","required":true,"ref":"InvestorReqDTO"},
        };
        app.post('/investors',
            ...(fetchMiddlewares<RequestHandler>(InvestorController)),
            ...(fetchMiddlewares<RequestHandler>(InvestorController.prototype.createInvestor)),

            async function InvestorController_createInvestor(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsInvestorController_createInvestor, request, response });

                const controller = new InvestorController();

              await templateService.apiHandler({
                methodName: 'createInvestor',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsInvestorController_updateInvestorNomineeDetails: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                nomitneeDetails: {"in":"body","name":"nomitneeDetails","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},
        };
        app.put('/investors/:id/nomineeDetails',
            ...(fetchMiddlewares<RequestHandler>(InvestorController)),
            ...(fetchMiddlewares<RequestHandler>(InvestorController.prototype.updateInvestorNomineeDetails)),

            async function InvestorController_updateInvestorNomineeDetails(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsInvestorController_updateInvestorNomineeDetails, request, response });

                const controller = new InvestorController();

              await templateService.apiHandler({
                methodName: 'updateInvestorNomineeDetails',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsInvestorController_updateEmergencyContact: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                emergencyContact: {"in":"body","name":"emergencyContact","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},
        };
        app.put('/investors/:id/emergencyContact',
            ...(fetchMiddlewares<RequestHandler>(InvestorController)),
            ...(fetchMiddlewares<RequestHandler>(InvestorController.prototype.updateEmergencyContact)),

            async function InvestorController_updateEmergencyContact(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsInvestorController_updateEmergencyContact, request, response });

                const controller = new InvestorController();

              await templateService.apiHandler({
                methodName: 'updateEmergencyContact',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsInvestorController_updateInvestorPersonalDetails: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                personalDetails: {"in":"body","name":"personalDetails","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},
        };
        app.put('/investors/:id/personalDetails',
            ...(fetchMiddlewares<RequestHandler>(InvestorController)),
            ...(fetchMiddlewares<RequestHandler>(InvestorController.prototype.updateInvestorPersonalDetails)),

            async function InvestorController_updateInvestorPersonalDetails(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsInvestorController_updateInvestorPersonalDetails, request, response });

                const controller = new InvestorController();

              await templateService.apiHandler({
                methodName: 'updateInvestorPersonalDetails',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsInvestorController_updateInvestor: Record<string, TsoaRoute.ParameterSchema> = {
                investor: {"in":"body","name":"investor","required":true,"ref":"InvestorReqDTO"},
        };
        app.put('/investors',
            ...(fetchMiddlewares<RequestHandler>(InvestorController)),
            ...(fetchMiddlewares<RequestHandler>(InvestorController.prototype.updateInvestor)),

            async function InvestorController_updateInvestor(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsInvestorController_updateInvestor, request, response });

                const controller = new InvestorController();

              await templateService.apiHandler({
                methodName: 'updateInvestor',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsInvestorController_assignProject: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                projectData: {"in":"body","name":"projectData","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"projects":{"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"lockInPeriod":{"dataType":"string","required":true},"projectId":{"dataType":"double","required":true}}},"required":true}}},
        };
        app.put('/investors/:id/projects/assign',
            ...(fetchMiddlewares<RequestHandler>(InvestorController)),
            ...(fetchMiddlewares<RequestHandler>(InvestorController.prototype.assignProject)),

            async function InvestorController_assignProject(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsInvestorController_assignProject, request, response });

                const controller = new InvestorController();

              await templateService.apiHandler({
                methodName: 'assignProject',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsInvestorController_addDocumentDetails: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                docDetails: {"in":"body","name":"docDetails","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"status":{"dataType":"boolean","required":true},"docUrl":{"dataType":"string","required":true},"docName":{"dataType":"string","required":true},"id":{"dataType":"string"}}},
        };
        app.put('/investors/:id/documents',
            ...(fetchMiddlewares<RequestHandler>(InvestorController)),
            ...(fetchMiddlewares<RequestHandler>(InvestorController.prototype.addDocumentDetails)),

            async function InvestorController_addDocumentDetails(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsInvestorController_addDocumentDetails, request, response });

                const controller = new InvestorController();

              await templateService.apiHandler({
                methodName: 'addDocumentDetails',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsInvestorController_updateDocumentById: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                documentId: {"in":"path","name":"documentId","required":true,"dataType":"string"},
                updates: {"in":"body","name":"updates","required":true,"ref":"Partial__docName-string--docUrl-string--status-boolean__"},
        };
        app.put('/investors/:id/documents/:documentId',
            ...(fetchMiddlewares<RequestHandler>(InvestorController)),
            ...(fetchMiddlewares<RequestHandler>(InvestorController.prototype.updateDocumentById)),

            async function InvestorController_updateDocumentById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsInvestorController_updateDocumentById, request, response });

                const controller = new InvestorController();

              await templateService.apiHandler({
                methodName: 'updateDocumentById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsInvestorController_getDocumentsByInvestorId: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.get('/investors/:id/documents',
            ...(fetchMiddlewares<RequestHandler>(InvestorController)),
            ...(fetchMiddlewares<RequestHandler>(InvestorController.prototype.getDocumentsByInvestorId)),

            async function InvestorController_getDocumentsByInvestorId(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsInvestorController_getDocumentsByInvestorId, request, response });

                const controller = new InvestorController();

              await templateService.apiHandler({
                methodName: 'getDocumentsByInvestorId',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsInvestorController_deleteDocumentById: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                documentId: {"in":"path","name":"documentId","required":true,"dataType":"string"},
        };
        app.delete('/investors/:id/documents/:documentId',
            ...(fetchMiddlewares<RequestHandler>(InvestorController)),
            ...(fetchMiddlewares<RequestHandler>(InvestorController.prototype.deleteDocumentById)),

            async function InvestorController_deleteDocumentById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsInvestorController_deleteDocumentById, request, response });

                const controller = new InvestorController();

              await templateService.apiHandler({
                methodName: 'deleteDocumentById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsInvestmentController_getAllInvestments: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/investments',
            ...(fetchMiddlewares<RequestHandler>(InvestmentController)),
            ...(fetchMiddlewares<RequestHandler>(InvestmentController.prototype.getAllInvestments)),

            async function InvestmentController_getAllInvestments(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsInvestmentController_getAllInvestments, request, response });

                const controller = new InvestmentController();

              await templateService.apiHandler({
                methodName: 'getAllInvestments',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsInvestmentController_getInvestmentById: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.get('/investments/:id',
            ...(fetchMiddlewares<RequestHandler>(InvestmentController)),
            ...(fetchMiddlewares<RequestHandler>(InvestmentController.prototype.getInvestmentById)),

            async function InvestmentController_getInvestmentById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsInvestmentController_getInvestmentById, request, response });

                const controller = new InvestmentController();

              await templateService.apiHandler({
                methodName: 'getInvestmentById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsInvestmentController_createInvestment: Record<string, TsoaRoute.ParameterSchema> = {
                investment: {"in":"body","name":"investment","required":true,"ref":"InvestmentDTO"},
        };
        app.post('/investments',
            ...(fetchMiddlewares<RequestHandler>(InvestmentController)),
            ...(fetchMiddlewares<RequestHandler>(InvestmentController.prototype.createInvestment)),

            async function InvestmentController_createInvestment(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsInvestmentController_createInvestment, request, response });

                const controller = new InvestmentController();

              await templateService.apiHandler({
                methodName: 'createInvestment',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEntityController_getAllEntities: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/entities',
            ...(fetchMiddlewares<RequestHandler>(EntityController)),
            ...(fetchMiddlewares<RequestHandler>(EntityController.prototype.getAllEntities)),

            async function EntityController_getAllEntities(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEntityController_getAllEntities, request, response });

                const controller = new EntityController();

              await templateService.apiHandler({
                methodName: 'getAllEntities',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEntityController_getEntityById: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.get('/entities/:id',
            ...(fetchMiddlewares<RequestHandler>(EntityController)),
            ...(fetchMiddlewares<RequestHandler>(EntityController.prototype.getEntityById)),

            async function EntityController_getEntityById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEntityController_getEntityById, request, response });

                const controller = new EntityController();

              await templateService.apiHandler({
                methodName: 'getEntityById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEntityController_createEntity: Record<string, TsoaRoute.ParameterSchema> = {
                entity: {"in":"body","name":"entity","required":true,"ref":"EntityDTO"},
        };
        app.post('/entities',
            ...(fetchMiddlewares<RequestHandler>(EntityController)),
            ...(fetchMiddlewares<RequestHandler>(EntityController.prototype.createEntity)),

            async function EntityController_createEntity(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEntityController_createEntity, request, response });

                const controller = new EntityController();

              await templateService.apiHandler({
                methodName: 'createEntity',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEntityController_updateEntity: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                updateData: {"in":"body","name":"updateData","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"settings":{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},"caId":{"dataType":"string"},"ownerId":{"dataType":"string"},"regId":{"dataType":"string","required":true},"country":{"dataType":"string","required":true},"address":{"dataType":"string","required":true}}},
        };
        app.put('/entities/:id',
            ...(fetchMiddlewares<RequestHandler>(EntityController)),
            ...(fetchMiddlewares<RequestHandler>(EntityController.prototype.updateEntity)),

            async function EntityController_updateEntity(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEntityController_updateEntity, request, response });

                const controller = new EntityController();

              await templateService.apiHandler({
                methodName: 'updateEntity',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCurrencyController_getAllCurrencies: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/currencies',
            ...(fetchMiddlewares<RequestHandler>(CurrencyController)),
            ...(fetchMiddlewares<RequestHandler>(CurrencyController.prototype.getAllCurrencies)),

            async function CurrencyController_getAllCurrencies(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCurrencyController_getAllCurrencies, request, response });

                const controller = new CurrencyController();

              await templateService.apiHandler({
                methodName: 'getAllCurrencies',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCurrencyController_getCurrencyById: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.get('/currencies/:id',
            ...(fetchMiddlewares<RequestHandler>(CurrencyController)),
            ...(fetchMiddlewares<RequestHandler>(CurrencyController.prototype.getCurrencyById)),

            async function CurrencyController_getCurrencyById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCurrencyController_getCurrencyById, request, response });

                const controller = new CurrencyController();

              await templateService.apiHandler({
                methodName: 'getCurrencyById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCurrencyController_createCurrency: Record<string, TsoaRoute.ParameterSchema> = {
                currency: {"in":"body","name":"currency","required":true,"ref":"CurrencyDTO"},
        };
        app.post('/currencies',
            ...(fetchMiddlewares<RequestHandler>(CurrencyController)),
            ...(fetchMiddlewares<RequestHandler>(CurrencyController.prototype.createCurrency)),

            async function CurrencyController_createCurrency(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCurrencyController_createCurrency, request, response });

                const controller = new CurrencyController();

              await templateService.apiHandler({
                methodName: 'createCurrency',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCurrencyController_deleteCurrency: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.delete('/currencies/:id',
            ...(fetchMiddlewares<RequestHandler>(CurrencyController)),
            ...(fetchMiddlewares<RequestHandler>(CurrencyController.prototype.deleteCurrency)),

            async function CurrencyController_deleteCurrency(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCurrencyController_deleteCurrency, request, response });

                const controller = new CurrencyController();

              await templateService.apiHandler({
                methodName: 'deleteCurrency',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCurrencyController_updateCurrency: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                currencyData: {"in":"body","name":"currencyData","required":true,"ref":"Partial_CurrencyDTO_"},
        };
        app.put('/currencies/:id',
            ...(fetchMiddlewares<RequestHandler>(CurrencyController)),
            ...(fetchMiddlewares<RequestHandler>(CurrencyController.prototype.updateCurrency)),

            async function CurrencyController_updateCurrency(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCurrencyController_updateCurrency, request, response });

                const controller = new CurrencyController();

              await templateService.apiHandler({
                methodName: 'updateCurrency',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsContentController_getAllContents: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/contents',
            ...(fetchMiddlewares<RequestHandler>(ContentController)),
            ...(fetchMiddlewares<RequestHandler>(ContentController.prototype.getAllContents)),

            async function ContentController_getAllContents(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsContentController_getAllContents, request, response });

                const controller = new ContentController();

              await templateService.apiHandler({
                methodName: 'getAllContents',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsContentController_getContentById: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.get('/contents/:id',
            ...(fetchMiddlewares<RequestHandler>(ContentController)),
            ...(fetchMiddlewares<RequestHandler>(ContentController.prototype.getContentById)),

            async function ContentController_getContentById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsContentController_getContentById, request, response });

                const controller = new ContentController();

              await templateService.apiHandler({
                methodName: 'getContentById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsContentController_createContent: Record<string, TsoaRoute.ParameterSchema> = {
                content: {"in":"body","name":"content","required":true,"ref":"ContentDTO"},
        };
        app.post('/contents',
            ...(fetchMiddlewares<RequestHandler>(ContentController)),
            ...(fetchMiddlewares<RequestHandler>(ContentController.prototype.createContent)),

            async function ContentController_createContent(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsContentController_createContent, request, response });

                const controller = new ContentController();

              await templateService.apiHandler({
                methodName: 'createContent',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsContentController_deleteContent: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.delete('/contents/:id',
            ...(fetchMiddlewares<RequestHandler>(ContentController)),
            ...(fetchMiddlewares<RequestHandler>(ContentController.prototype.deleteContent)),

            async function ContentController_deleteContent(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsContentController_deleteContent, request, response });

                const controller = new ContentController();

              await templateService.apiHandler({
                methodName: 'deleteContent',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsContentController_updateContent: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                contentData: {"in":"body","name":"contentData","required":true,"ref":"Partial_ContentDTO_"},
        };
        app.put('/contents/:id',
            ...(fetchMiddlewares<RequestHandler>(ContentController)),
            ...(fetchMiddlewares<RequestHandler>(ContentController.prototype.updateContent)),

            async function ContentController_updateContent(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsContentController_updateContent, request, response });

                const controller = new ContentController();

              await templateService.apiHandler({
                methodName: 'updateContent',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthController_googleLogin: Record<string, TsoaRoute.ParameterSchema> = {
                loginData: {"in":"body","name":"loginData","required":true,"ref":"GoogleLoginReqDTO"},
        };
        app.post('/auth/google-login',
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.googleLogin)),

            async function AuthController_googleLogin(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_googleLogin, request, response });

                const controller = new AuthController();

              await templateService.apiHandler({
                methodName: 'googleLogin',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAccountController_getAllAccounts: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/accounts',
            ...(fetchMiddlewares<RequestHandler>(AccountController)),
            ...(fetchMiddlewares<RequestHandler>(AccountController.prototype.getAllAccounts)),

            async function AccountController_getAllAccounts(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAccountController_getAllAccounts, request, response });

                const controller = new AccountController();

              await templateService.apiHandler({
                methodName: 'getAllAccounts',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAccountController_getAccountById: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.get('/accounts/:id',
            ...(fetchMiddlewares<RequestHandler>(AccountController)),
            ...(fetchMiddlewares<RequestHandler>(AccountController.prototype.getAccountById)),

            async function AccountController_getAccountById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAccountController_getAccountById, request, response });

                const controller = new AccountController();

              await templateService.apiHandler({
                methodName: 'getAccountById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAccountController_getAccountsByInvestorId: Record<string, TsoaRoute.ParameterSchema> = {
                investorId: {"in":"path","name":"investorId","required":true,"dataType":"double"},
        };
        app.get('/accounts/investor/:investorId',
            ...(fetchMiddlewares<RequestHandler>(AccountController)),
            ...(fetchMiddlewares<RequestHandler>(AccountController.prototype.getAccountsByInvestorId)),

            async function AccountController_getAccountsByInvestorId(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAccountController_getAccountsByInvestorId, request, response });

                const controller = new AccountController();

              await templateService.apiHandler({
                methodName: 'getAccountsByInvestorId',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAccountController_createAccount: Record<string, TsoaRoute.ParameterSchema> = {
                account: {"in":"body","name":"account","required":true,"ref":"AccountReqDTO"},
        };
        app.post('/accounts',
            ...(fetchMiddlewares<RequestHandler>(AccountController)),
            ...(fetchMiddlewares<RequestHandler>(AccountController.prototype.createAccount)),

            async function AccountController_createAccount(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAccountController_createAccount, request, response });

                const controller = new AccountController();

              await templateService.apiHandler({
                methodName: 'createAccount',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAccountController_removeInvestorFromAccount: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.patch('/accounts/:id/remove-investor',
            ...(fetchMiddlewares<RequestHandler>(AccountController)),
            ...(fetchMiddlewares<RequestHandler>(AccountController.prototype.removeInvestorFromAccount)),

            async function AccountController_removeInvestorFromAccount(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAccountController_removeInvestorFromAccount, request, response });

                const controller = new AccountController();

              await templateService.apiHandler({
                methodName: 'removeInvestorFromAccount',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
