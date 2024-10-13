import { Router } from "express";
import {errorHandler} from "../middleware/errorHandler";
import { authMiddleware } from "../middleware/authMiddlewere";
import { getStudentWithGrades, getGradeById} from "../controllers/studentController";
  
const studentRouter = Router();
studentRouter.get ("/grade", authMiddleware, errorHandler(getStudentWithGrades));
studentRouter.get ("/:gradeId", authMiddleware, errorHandler(getGradeById));

export default studentRouter;
