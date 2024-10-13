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
exports.teacherAuthMiddleware = exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uderDal = __importStar(require("../dal/userDal"));
;
//אימות משתמש
const authMiddleware = (req, res, next) => {
    var _a;
    // ניסיון לחלץ את הטוקן 
    const token = (_a = req.header('authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    //אם אין תוקן תחזיר שגיאה 401
    if (!token) {
        res.status(401).json({ message: 'הטוקן לא קיים' });
        return;
    }
    try {
        //ניסיון לאמת את הטוקן
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        //אם האימות מצליח אני מוסיף את פרטי המשתמש לאובייקט הבקשה
        req.user = decoded;
        //ממשיך לפונקציה הבאה בשרשרת הטיפול
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'הטוקן לא בתוקף' });
    }
};
exports.authMiddleware = authMiddleware;
const teacherAuthMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== 'teacher') {
        res.status(403).json({ message: "Access denied, teachers only!" });
        return;
    }
    const student = yield uderDal.getStudentByEmail((_b = req.params) === null || _b === void 0 ? void 0 : _b.studentemail);
    if ((student === null || student === void 0 ? void 0 : student.myClass) !== ((_c = req.user) === null || _c === void 0 ? void 0 : _c.myClass)) {
        res.status(401).json({ message: "למה אתה פולש למה שלא קשור אליך!" });
        return;
    }
    else {
        next();
    }
});
exports.teacherAuthMiddleware = teacherAuthMiddleware;
