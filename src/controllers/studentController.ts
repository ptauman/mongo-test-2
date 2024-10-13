
import userModel, { Iuser } from "../models/userModel";
import classModel,  { IClass } from "../models/classModel";
import { ObjectId } from "mongodb";
import { Request, Response } from "express";
import * as uderDal from "../dal/userDal"
import jwt from "jsonwebtoken";
export interface AuthRequest extends Request {
    user?: { userId: string, role?: string }
};
export const getStudentWithGrades = async (req: AuthRequest, res: Response) => {
    const token = req.header('authorization')?.replace('Bearer ', '');
    if (!token) {res.status(401).json({ message: 'הטוקן לא קיים' });return;}
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string, role: string }
    req.user = decoded;
    const studentId = req.user.userId;
    const student = await uderDal.studentGradesDal(studentId);
    if (student && student.grades?.length > 0) {
        if(student.id === studentId){
            res.status(200).json(student.grades)
        }else{
            res.status(401).json({ message: "אתה חופר בפרטים של אנשים זרים" });return;
        }
    }
    else{
        res.status(401).json({ message: "לא נמצאו נותנים עבור סטודנט זה " });return;
    }
}
export const getGradeById = async (req: AuthRequest, res: Response) => {
    const { email } = req.params
    const token = req.header('authorization')?.replace('Bearer ', '');
    if (!token) {res.status(401).json({ message: 'הטוקן לא קיים' });return;}
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string, role: string }
    req.user = decoded;
    const studentId = req.user.userId;
    const grade = await uderDal.gradeDal(studentId, email);
    if (grade ) {
        if(grade.id === studentId ){
            res.status(200).json(grade)
        }else{
            res.status(401).json({ message: "אתה חופר בפרטים של אנשים זרים" });return;
        }
    }
    else{
        res.status(401).json({ message: "לא נמצאו נותנים עבור ציון זה " });return;
    }
}
    