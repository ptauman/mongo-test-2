import { Router } from "express";
import { getUser, createUser } from "../controllers/userController";
import { errorHandler } from "../middleware/errorHandler";

const authRouter = Router();

authRouter.post("/",errorHandler(createUser));
authRouter.get("/:username", errorHandler(getUser));

export default authRouter;