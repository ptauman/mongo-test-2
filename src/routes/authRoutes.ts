import { Router } from "express";
import { errorHandler } from "../middleware/errorHandler";
import { registerStudent,registerTeacher,connectUser } from "../controllers/authController";

const authRouter = Router();

authRouter.post("/student/register",errorHandler(registerStudent));
authRouter.post("/teacher/register",errorHandler(registerTeacher));
authRouter.get ("/:email", errorHandler(connectUser));

export default authRouter;