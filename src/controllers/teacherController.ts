import userModel, { Iuser } from "../models/userModel";
import { ObjectId } from "mongodb";
import { Request, Response } from "express";
import * as uderDal from "../dal/userDal"
import jwt from "jsonwebtoken";
export interface AuthRequest extends Request {
    user?: { userId: string, role?: string }
};


