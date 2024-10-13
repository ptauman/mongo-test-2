import { Router } from "express";
import { errorHandler } from "../middleware/errorHandler";
import { registerStudent,registerTeacher,connectUser } from "../controllers/authController";

const authRouter = Router();
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: רישום משתמש חדש
 *     description: יוצר חשבון משתמש חדש במערכת. אם המשתמש הוא מנהל, מחזיר טוקן ב-cookie.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               -email
 *             - class
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [employee, manager]
 *               salary:
 *                 type: number
 *               yearsOfExperience:
 *                 type: number
 *               startDate:
 *                 type: string
 *                 format: date
 *               age:
 *                 type: number
 *     responses:
 *       201:
 *         description: המשתמש נרשם בהצלחה
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 isManager:
 *                   type: boolean
 *                 userId:
 *                   type: string
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: token=abcde12345; HttpOnly; Secure; SameSite=Strict
 *       400:
 *         description: שגיאה בנתונים שהוזנו
 */
authRouter.post("/student/register",errorHandler(registerStudent));
authRouter.post("/teacher/register",errorHandler(registerTeacher));
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: התחברות למערכת
 *     description: מאמת את פרטי המשתמש ומחזיר טוקן ב-cookie אם המשתמש הוא מנהל.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: התחברות הצליחה
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 isManager:
 *                   type: boolean
 *                 userId:
 *                   type: string
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: token=abcde12345; HttpOnly; Secure; SameSite=Strict
 *       401:
 *         description: שם משתמש או סיסמה שגויים
 */
authRouter.get ("/:email", errorHandler(connectUser));

export default authRouter;