import userModel, { Iuser } from "../models/userModel";
import classModel,  { IClass } from "../models/classModel";
import { ObjectId } from "mongodb";
import gradeModel, { IGrade } from "../models/gradeModel";






export const studentGradesDal = async (userId : string): Promise< Iuser| null> => {

    const student = await userModel.findOne({ _id: userId }).populate("grades");
    if (!student) {
        return null;
    }
    return student
}
export const gradeDal = async (userId : string, gradeId : string): Promise<IGrade | null> => {
    const grade = await gradeModel.findOne({ _id: gradeId })
    if (!grade) {
        return null;
    }
    return grade;
}
    
