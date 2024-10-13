import { Router } from "express";
import {errorHandler} from "../middleware/errorHandler";
import { authMiddleware } from "../middleware/authMiddlewere";
  
const studentRouter = Router();
// studentRouter.get ("/:studentId", authMiddleware, errorHandler(getAllGRades));
// studentRouter.get ("/:studentId/:gradeId", authMiddleware, errorHandler(getGradeById));

export default studentRouter;
