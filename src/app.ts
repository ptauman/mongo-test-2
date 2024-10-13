import express from "express";
import dotenv from "dotenv";
import postRouter from "./routes/studentRoutes";
import userRouter from "./routes/teacherRoutes";
import { errorHandler } from "./middleware/errorHandler";
import connectDB from "./config/db";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

connectDB();

// Routes
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);


// Error handling middleware
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
