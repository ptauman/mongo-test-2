import userModel, { Iuser } from "../models/userModel";
import classModel,  { IClass } from "../models/classModel";
import { ObjectId } from "mongodb";

export const createStudent = async (userdata: Partial<Iuser>,classId:string): Promise<Iuser> => { 
  const user = new userModel({
    ...userdata,
    role: "student",
    grades: [],
    myClass:classId
  })
  const classTo = await classModel.findById(classId)
  classTo?.students.push(user.id)
  await classTo?.save();
   await user.save();
   return user

}
export const createTeacher = async (userdata: Partial<Iuser>): Promise<string> => { 
  const user = new userModel({
    ...userdata,
    role: "teacher",
  })
 await user.save();
 return user.id
}

export const createClass = async (classname: string, teacher: string): Promise<IClass> => {
  const newClass = new classModel({
    classname,
    teacher,
    students: []
  })
  await newClass.save();
  return newClass.id;
}
export const updateClassInTeacher = async (classId: IClass, teacherId: string): Promise<Object> => {
  const user = await userModel.findById(teacherId);
  if (!user) {
    throw new Error("User not found");
  }
  user.myClass = classId as unknown as ObjectId;
  await user.save();
  return user.myClass;
} 

