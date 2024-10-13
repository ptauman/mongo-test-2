import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes";
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
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);


// Error handling middleware
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
