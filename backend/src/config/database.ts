import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';

const environment = process.env.NODE_ENV || 'development';
dotenv.config({ path: `.env.${environment}` });

// Create a new Sequelize instance, passing the configuration options
const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    dialect: 'mysql',
    port: 3306,
    models: [__dirname + '/../models'], // Path to the models directory
});

export default sequelize;