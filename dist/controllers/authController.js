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
exports.connectUser = exports.registerTeacher = exports.registerStudent = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const auth_1 = require("../services/auth");
const authDal = __importStar(require("../dal/authDal"));
const registerStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, classId } = req.body;
    const student = yield authDal.createStudent({ username, email, password }, classId);
    if (!student) {
        return res.status(401).json({ message: "תקלה בהרשמה" });
    }
    ;
    res.status(201).json({ message: "נרשמת בהצלחה  " });
});
exports.registerStudent = registerStudent;
const registerTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, myClass } = req.body;
    const teacher = yield authDal.createTeacher({ username, email, password });
    const classId = yield authDal.createClass(myClass, teacher);
    res.status(201).json({ classId, message: "נרשמת בהצלחה  " });
});
exports.registerTeacher = registerTeacher;
const connectUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    const { password } = req.body;
    const user = yield userModel_1.default.findOne({ email });
    console.log(user);
    if (!user || !(yield user.comparePassword(password))) {
        return res.status(401).json({ message: "שם משתמש או סיסמה שגויים" });
    }
    ;
    const token = (0, auth_1.generateToken)(user.id, user.role);
    res.status(200).json({ token });
});
exports.connectUser = connectUser;
