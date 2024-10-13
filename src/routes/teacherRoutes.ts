import { Router } from "express";
import { authMiddleware, teacherAuthMiddleware } from "../middleware/authMiddlewere";
import { errorHandler } from "../middleware/errorHandler";
import * as teacherController from "../controllers/teacherController";

const teacherRouter = Router();
teacherRouter.get("/:studentemail", authMiddleware, teacherAuthMiddleware, errorHandler(teacherController.getGradesFromOne));
teacherRouter.get ("/"), authMiddleware, teacherAuthMiddleware, errorHandler(teacherController.gatAllStudents);
// teacherRouter.get ("average/:teacherId"), authMiddleware, teacherAuthMiddleware, errorHandler(teacherController.gatAverageOfClass);

teacherRouter
export default teacherRouter;
