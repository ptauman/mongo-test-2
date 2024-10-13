import { Request, Response } from "express";
import UserModel from "../models/userModel";
import generateToken from "../services/auth";
import { createUser} from "../dal/authDal";

// פונקציה להרשמה של משתמש חדש
export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const user = await createUser({ username, email, password });
    res.status(201).json({ message: "נרשמת בהצלחה  " });
  } catch (error) {
    console.log(error);
    res.status(400).json("תקלה בהרשמה");
  }
};

// התחברות של משתמש קיים
export const login = async (req: any, res: any) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "שם משתמש או סיסמה שגויים" });
  }
  const token = generateToken(user.id);
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    maxAge: 3600000,
  });
  res.status(201).json({ message: "התחברת בהצלחה", token });
};
