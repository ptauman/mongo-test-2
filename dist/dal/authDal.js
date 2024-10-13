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
exports.updateClassInTeacher = exports.createClass = exports.createTeacher = exports.createStudent = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const classModel_1 = __importDefault(require("../models/classModel"));
const createStudent = (userdata, classId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new userModel_1.default(Object.assign(Object.assign({}, userdata), { role: "student", grades: [], myClass: classId }));
    const classTo = yield classModel_1.default.findById(classId);
    classTo === null || classTo === void 0 ? void 0 : classTo.students.push(user.id);
    yield (classTo === null || classTo === void 0 ? void 0 : classTo.save());
    yield user.save();
    return user;
});
exports.createStudent = createStudent;
const createTeacher = (userdata) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new userModel_1.default(Object.assign(Object.assign({}, userdata), { role: "teacher" }));
    yield user.save();
    return user.id;
});
exports.createTeacher = createTeacher;
const createClass = (classname, teacher) => __awaiter(void 0, void 0, void 0, function* () {
    const newClass = new classModel_1.default({
        classname,
        teacher,
        students: []
    });
    yield newClass.save();
    return newClass.id;
});
exports.createClass = createClass;
const updateClassInTeacher = (classId, teacherId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findById(teacherId);
    if (!user) {
        throw new Error("User not found");
    }
    user.myClass = classId;
    yield user.save();
    return user.myClass;
});
exports.updateClassInTeacher = updateClassInTeacher;
