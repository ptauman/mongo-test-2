import { Router } from "express";
import { errorHandler } from "../middleware/errorHandler";

const authRouter = Router();

authRouter.post("/student/register",errorHandler(createStudent));
authRouter.post("/teacher/register",errorHandler(createTeacher));
authRouter.get ("/student/:username", errorHandler(connectStudent));
authRouter.get ("/teacher/:username", errorHandler(connectTeacher));

export default authRouter;