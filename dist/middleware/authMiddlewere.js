"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teacherAuthMiddleware = exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
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
const teacherAuthMiddleware = (req, res, next) => {
    var _a;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== 'teacher') {
        res.status(403).json({ message: "Access denied, teachers only!" });
    }
    else {
        next();
    }
};
exports.teacherAuthMiddleware = teacherAuthMiddleware;
