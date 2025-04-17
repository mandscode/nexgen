// npx tsc --init
// >> npx tsc

import express, { Application, Request, Response } from "express";
import sequelize from "./config/database";
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';

// app.ts or index.ts
import './createMasterAdmin';

import cors from 'cors';
import { RegisterRoutes } from "./routes/routes";

const environment = process.env.NODE_ENV || 'development';

const app: Application = express();

sequelize.authenticate()
  .then(() => console.log('Database connected successfully.'))
  .catch((err: any) => console.log('Error connecting to the database:', err));


if (environment === 'development') {
  // Sync all models
  sequelize.sync({ force: false }) // Use { force: true } to drop and recreate tables
    .then(() => console.log('Models synchronized with the database.'))
    .catch((err: any) => console.log('Error synchronizing models:', err));
}


const port = 3000;

// app.use(express.json());

app.use(bodyParser.json());
app.use(cors());

RegisterRoutes(app);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Error handling middleware (for tsoa validation errors)
app.use((err: any, req: any, res: any, next: any) => {
  if (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
      stack: err.stack
    });
  } else {
    next();
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});