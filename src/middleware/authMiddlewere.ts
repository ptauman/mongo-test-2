//פונקציה גנרית לאימות תוקן של משתמש
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

//לפני שאממש בפועל אני מגדיר אינטרפייס שיכלול משתמש

export interface AuthRequest extends Request {
    user?: { userId: string, role?: string }
};


//אימות משתמש
export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
    // ניסיון לחלץ את הטוקן 
    const token = req.header('authorization')?.replace('Bearer ', '');
    //אם אין תוקן תחזיר שגיאה 401
    if (!token) {
        res.status(401).json({ message: 'הטוקן לא קיים' });
        return;
    }
    try {
        //ניסיון לאמת את הטוקן
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string, role: string }
        //אם האימות מצליח אני מוסיף את פרטי המשתמש לאובייקט הבקשה
        req.user = decoded;
        //ממשיך לפונקציה הבאה בשרשרת הטיפול
        next();
    } catch (error) {
        res.status(401).json({ message: 'הטוקן לא בתוקף' });
    }
}

export const teacherAuthMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user?.role !=='teacher') {
        res.status(403).json({message: "Access denied, teachers only!"})
    } else {
        next()
    }
}

