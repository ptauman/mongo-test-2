import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes";
import teachersRouter from "./routes/teacherRoutes";
import { errorHandler } from "./middleware/errorHandler";
import connectDB from "./config/db";
import studentRouter from "./routes/studentRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

connectDB();

// Routes
app.use("/api/teachers", teachersRouter);
app.use("/api/auth", authRouter);
app.use("/api/students", studentRouter);


// Error handling middleware
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
