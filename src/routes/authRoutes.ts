import { Router } from "express";
import { errorHandler } from "../middleware/errorHandler";
import { registerStudent,registerTeacher } from "../controllers/authController";

const authRouter = Router();

authRouter.post("/student/register",errorHandler(registerStudent));
authRouter.post("/teacher/register",errorHandler(registerTeacher));
// authRouter.get ("/:useremail", errorHandler(connectStudent));

export default authRouter;