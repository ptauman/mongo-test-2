import { Router } from "express";
import { authMiddleware, teacherAuthMiddleware } from "../middleware/authMiddlewere";
import { errorHandler } from "../middleware/errorHandler";
import * as teacherController from "../controllers/teacherController";

const teacherRouter = Router();
// teacherRouter.put("/:studentemail", authMiddleware, teacherAuthMiddleware, errorHandler(teacherController.addingGrade));
// teacherRouter.get ("/:teacherId"), authMiddleware, teacherAuthMiddleware, errorHandler(teacherController.gatAllStudents);
// teacherRouter.get ("average/:teacherId"), authMiddleware, teacherAuthMiddleware, errorHandler(teacherController.gatAverageOfClass);

teacherRouter
export default teacherRouter;
