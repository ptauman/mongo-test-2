import { Request, Response } from "express";
import UserModel from "../models/userModel";
import { generateToken } from "../services/auth";
import * as authDal from "../dal/authDal";
import { ObjectId } from "mongoose";


export const registerStudent = async (req: Request, res: Response) => {
  const { username, email, password, myClass  } = req.body;
    const student = await authDal.createStudent({   username, email, password}, myClass );
    if (!student) {
        return res.status(401).json({ message: "תקלה בהרשמה" }) 
    };
    res.status(201).json({ message: "נרשמת בהצלחה  " });
}

export const registerTeacher = async (req: Request, res: Response) => {
  const { username, email, password, myClass} = req.body;
    const teacher = await authDal.createTeacher({ username, email, password })
    const classId = await authDal.createClass(myClass, teacher)
    await authDal.updateClassInTeacher(classId, teacher)
    res.status(201).json({classId, message: "נרשמת בהצלחה  " });
}
export const connectUser = async (req: any, res: any) => {
  const {email}  = req.params;
  const { password } = req.body;
  const user = await UserModel.findOne({email});
  if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "שם משתמש או סיסמה שגויים" })
  };


  const token = generateToken(user.id, user.role, user.myClass as any as string);
  res.status(200).json({ token });
}




