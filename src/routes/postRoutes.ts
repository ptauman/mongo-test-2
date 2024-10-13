import { Router } from "express";
import {errorHandler} from "../middleware/errorHandler";
import { authMiddleware } from "../middleware/authMiddlewere";
import * as postController from "../controllers/postController";
  
const postRouter = Router();

postRouter.post("/", authMiddleware, errorHandler(postController.createPost));
postRouter.get("/",  authMiddleware, errorHandler(postController.getPosts));
postRouter.get("/:id",authMiddleware, errorHandler( postController.getPost));
postRouter.put("/:id",authMiddleware, errorHandler( postController.updatePost));
postRouter.delete("/:id",authMiddleware, errorHandler(postController.deletePost));
postRouter.post("/:id/comments", authMiddleware, errorHandler(postController.addComment));

export default postRouter;
