"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const user_1 = __importDefault(require("./user"));
const account_1 = __importDefault(require("./account"));
const project_1 = __importDefault(require("./project"));
const project_investor_1 = __importDefault(require("./project-investor"));
const investor_resource_1 = __importDefault(require("./investor-resource"));
const resource_1 = __importDefault(require("./resource"));
let Investor = class Investor extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
    }),
    __metadata("design:type", Object)
], Investor.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.JSON,
        allowNull: true,
    }),
    __metadata("design:type", Object)
], Investor.prototype, "nomineeDetails", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.JSON,
        allowNull: false,
    }),
    __metadata("design:type", Object)
], Investor.prototype, "emergencyContact", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.JSON,
        allowNull: true,
    }),
    __metadata("design:type", Object)
], Investor.prototype, "personalDetails", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.JSON,
        allowNull: true,
    }),
    __metadata("design:type", Array)
], Investor.prototype, "documents", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
    }),
    __metadata("design:type", Number)
], Investor.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_1.default),
    __metadata("design:type", user_1.default)
], Investor.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => account_1.default),
    __metadata("design:type", Array)
], Investor.prototype, "accounts", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => project_1.default, () => project_investor_1.default),
    __metadata("design:type", Array)
], Investor.prototype, "projects", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => resource_1.default, () => investor_resource_1.default),
    __metadata("design:type", Array)
], Investor.prototype, "resources", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.JSON,
        allowNull: true,
    }),
    __metadata("design:type", Object)
], Investor.prototype, "settings", void 0);
Investor = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        tableName: 'investor'
    })
], Investor);
exports.default = Investor;
