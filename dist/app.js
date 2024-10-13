"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const teacherRoutes_1 = __importDefault(require("./routes/teacherRoutes"));
const db_1 = __importDefault(require("./config/db"));
const studentRoutes_1 = __importDefault(require("./routes/studentRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(express_1.default.json());
(0, db_1.default)();
const options = {
    failOnErrors: true,
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Employees project',
            version: '1.0.0',
        },
        servers: [
            {
                url: 'http://localhost:3000'
            }
        ]
    },
    apis: ['./src/routes/*.ts'],
};
// Routes
app.use("/api/teachers", teacherRoutes_1.default);
app.use("/api/auth", authRoutes_1.default);
app.use("/api/students", studentRoutes_1.default);
// Error handling middleware
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
exports.default = app;
