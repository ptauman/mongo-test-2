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
export const getStudentByEmail = async (email: string): Promise<Iuser | null> => {
    const student = await userModel.findOne({ email: email });
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
export const AllStudents = async (myClass: ObjectId): Promise<Iuser[] | null> => {
    const students = await userModel.find();
    if (!students) {
        return null;
    }
    return students
}
export const getTeacherById = async (teacherId: string): Promise<Iuser | null> => {
    const teacher = await userModel.findOne({ _id: teacherId }).populate("myClass");
    if (!teacher) {
        return null;
    }
    return teacher
}
