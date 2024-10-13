import { Router } from "express";
import { getUser, getUsers } from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddlewere";
import { errorHandler } from "../middleware/errorHandler";

const userRouter = Router();

userRouter.get("/", authMiddleware, errorHandler(getUsers));
userRouter.get("/:username",authMiddleware, errorHandler(getUser));

export default userRouter;
