"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTeacherById = exports.AllStudents = exports.gradeDal = exports.getStudentByEmail = exports.studentGradesDal = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const gradeModel_1 = __importDefault(require("../models/gradeModel"));
const studentGradesDal = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield userModel_1.default.findOne({ _id: userId }).populate("grades");
    if (!student) {
        return null;
    }
    return student;
});
exports.studentGradesDal = studentGradesDal;
const getStudentByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield userModel_1.default.findOne({ email: email });
    if (!student) {
        return null;
    }
    return student;
});
exports.getStudentByEmail = getStudentByEmail;
const gradeDal = (userId, gradeId) => __awaiter(void 0, void 0, void 0, function* () {
    const grade = yield gradeModel_1.default.findOne({ _id: gradeId });
    if (!grade) {
        return null;
    }
    return grade;
});
exports.gradeDal = gradeDal;
const AllStudents = (myClass) => __awaiter(void 0, void 0, void 0, function* () {
    const students = yield userModel_1.default.find();
    if (!students) {
        return null;
    }
    return students;
});
exports.AllStudents = AllStudents;
const getTeacherById = (teacherId) => __awaiter(void 0, void 0, void 0, function* () {
    const teacher = yield userModel_1.default.findOne({ _id: teacherId }).populate("myClass");
    if (!teacher) {
        return null;
    }
    return teacher;
});
exports.getTeacherById = getTeacherById;
