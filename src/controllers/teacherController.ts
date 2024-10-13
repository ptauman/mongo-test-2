import userModel, { Iuser } from "../models/userModel";
import { ObjectId } from "mongodb";
import { Request, Response } from "express";
import * as uderDal from "../dal/userDal"
import jwt from "jsonwebtoken";
export interface AuthRequest extends Request {
    user?: { userId: string, role?: string }
};

export const getGradesFromOne = async (req: AuthRequest, res: Response) => {
    const { email } = req.params
    const student = await uderDal.getStudentByEmail(email)
    if (!student) {
        res.status(401).json({ message: "לא נמצאו נותנים עבור סטודנט זה " })
        return
    }
    res.status(200).json(student.grades)
}
export const gatAllStudents = async (req: AuthRequest, res: Response) => {   
    const token = req.header('authorization')?.replace('Bearer ', '');
    if (!token) {res.status(401).json({ message: 'הטוקן לא קיים' });return;}
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string, role: string }
    req.user = decoded;
    const teacherId = req.user.userId;
    const teacher = await uderDal.getTeacherById(teacherId);
    if (!teacher) {
        res.status(401).json({ message: "לא נמצאו נותנים עבור מורה זה " })
        return
    }
    const claasid = teacher.myClass;
    const students = await uderDal.AllStudents(claasid);
    if (!students) {
        res.status(401).json({ message: "לא נמצאו נותנים עבור מורה זה " })
        return
    }
    res.status(200).json(students)
}
// export const gatAverageOfClass = async (req: AuthRequest, res: Response) => {
//     const token = req.header('authorization')?.replace('Bearer ', '');
//     if (!token) {res.status(401).json({ message: 'הטוקן לא קיים' });return;}
//     const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string, role: string }
//     req.user = decoded;
//     const teacherId = req.user.userId;
//     const teacher = await uderDal.getTeacherById(teacherId);
//     if (!teacher) {
//         res.status(401).json({ message: "לא נמצאו נותנים עבור מורה זה " })
//         return
//     }
//     const claasid = teacher.myClass;
//     const avarage = await uderDal.gatAverageOfClass(claasid);
//     if (!avarage) {
//         res.status(401).json({ message: "לא נמצאו נותנים עבור מורה זה " })
//         return
//     }
//     res.status(200).json(avarage)
// }  



