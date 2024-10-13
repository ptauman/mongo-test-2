//פונקציה גנרית לאימות תוקן של משתמש
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import * as uderDal from "../dal/userDal"


//לפני שאממש בפועל אני מגדיר אינטרפייס שיכלול משתמש

export interface AuthRequest extends Request {
    user?: { userId: string, userRole?: string, myClass?: string }
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

export const teacherAuthMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user?.userRole !=='teacher') {
        res.status(403).json({message: "Access denied, teachers only!"}); return;
    } 
    const student = await uderDal.getStudentByEmail(req.params?.studentemail)
    const myclass = student?.myClass as unknown as string
    if (myclass!= req.user?.myClass) {
        console.log(student?.myClass, req.user?.myClass);
        res.status(401).json({message: "למה אתה פולש למה שלא קשור אליך!"}); return;
    }
    else {
        next()
    }
}

