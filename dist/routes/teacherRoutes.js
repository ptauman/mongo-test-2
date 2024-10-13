"use strict";
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddlewere_1 = require("../middleware/authMiddlewere");
const errorHandler_1 = require("../middleware/errorHandler");
const teacherController = __importStar(require("../controllers/teacherController"));
const teacherRouter = (0, express_1.Router)();
teacherRouter.get("/:studentemail", authMiddlewere_1.authMiddleware, authMiddlewere_1.teacherAuthMiddleware, (0, errorHandler_1.errorHandler)(teacherController.getGradesFromOne));
teacherRouter.get("/"), authMiddlewere_1.authMiddleware, authMiddlewere_1.teacherAuthMiddleware, (0, errorHandler_1.errorHandler)(teacherController.gatAllStudents);
// teacherRouter.get ("average/:teacherId"), authMiddleware, teacherAuthMiddleware, errorHandler(teacherController.gatAverageOfClass);
teacherRouter;
exports.default = teacherRouter;
