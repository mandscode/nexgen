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
const investor_1 = __importDefault(require("./investor"));
const investment_1 = __importDefault(require("./investment"));
const transaction_1 = __importDefault(require("./transaction"));
const currency_1 = __importDefault(require("./currency"));
let Account = class Account extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
    }),
    __metadata("design:type", Object)
], Account.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Account.prototype, "currency", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => currency_1.default, { foreignKey: 'currency' }) // Map `currency` field to Currency
    ,
    __metadata("design:type", currency_1.default)
], Account.prototype, "currencyDetails", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => investor_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true
    }),
    __metadata("design:type", Object)
], Account.prototype, "investorId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => investor_1.default),
    __metadata("design:type", investor_1.default)
], Account.prototype, "investor", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => transaction_1.default),
    __metadata("design:type", Array)
], Account.prototype, "transactions", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => investment_1.default),
    __metadata("design:type", Array)
], Account.prototype, "investments", void 0);
Account = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        tableName: 'account'
    })
], Account);
exports.default = Account;
