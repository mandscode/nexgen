"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = __importDefault(require("dotenv"));
const environment = process.env.NODE_ENV || 'development';
dotenv_1.default.config({ path: `.env.${environment}` });
// Create a new Sequelize instance, passing the configuration options
const sequelize = new sequelize_typescript_1.Sequelize({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    dialect: 'mysql',
    port: 3306,
    models: [__dirname + '/../models'], // Path to the models directory
});
exports.default = sequelize;
