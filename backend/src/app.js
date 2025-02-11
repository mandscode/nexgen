"use strict";
// npx tsc --init
// >> npx tsc
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = require("./routes/routes");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerDocument = __importStar(require("./swagger.json"));
const cors_1 = __importDefault(require("cors"));
const environment = process.env.NODE_ENV || 'development';
const app = (0, express_1.default)();
database_1.default.authenticate()
    .then(() => console.log('Database connected successfully.'))
    .catch((err) => console.log('Error connecting to the database:', err));
if (environment === 'development') {
    // Sync all models
    database_1.default.sync({ force: false }) // Use { force: true } to drop and recreate tables
        .then(() => console.log('Models synchronized with the database.'))
        .catch((err) => console.log('Error synchronizing models:', err));
}
const port = 3000;
// app.use(express.json());
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
(0, routes_1.RegisterRoutes)(app);
app.get("/", (req, res) => {
    res.send("Hello, TypeScript with Express!");
});
app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
// Error handling middleware (for tsoa validation errors)
app.use((err, req, res, next) => {
    if (err) {
        console.log(err);
        res.status(500).json({
            message: err.message,
            stack: err.stack
        });
    }
    else {
        next();
    }
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
