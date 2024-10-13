"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getGradeById = exports.getStudentWithGrades = void 0;
const uderDal = __importStar(require("../dal/userDal"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
;
const getStudentWithGrades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const token = (_a = req.header('authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token) {
        res.status(401).json({ message: 'הטוקן לא קיים' });
        return;
    }
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    const studentId = req.user.userId;
    const student = yield uderDal.studentGradesDal(studentId);
    if (student && ((_b = student.grades) === null || _b === void 0 ? void 0 : _b.length) > 0) {
        if (student.id === studentId) {
            res.status(200).json(student.grades);
        }
        else {
            res.status(401).json({ message: "אתה חופר בפרטים של אנשים זרים" });
            return;
        }
    }
    else {
        res.status(401).json({ message: "לא נמצאו נותנים עבור סטודנט זה " });
        return;
    }
});
exports.getStudentWithGrades = getStudentWithGrades;
const getGradeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { email } = req.params;
    const token = (_a = req.header('authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token) {
        res.status(401).json({ message: 'הטוקן לא קיים' });
        return;
    }
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    const studentId = req.user.userId;
    const grade = yield uderDal.gradeDal(studentId, email);
    if (grade) {
        if (grade.id === studentId) {
            res.status(200).json(grade);
        }
        else {
            res.status(401).json({ message: "אתה חופר בפרטים של אנשים זרים" });
            return;
        }
    }
    else {
        res.status(401).json({ message: "לא נמצאו נותנים עבור ציון זה " });
        return;
    }
});
exports.getGradeById = getGradeById;
