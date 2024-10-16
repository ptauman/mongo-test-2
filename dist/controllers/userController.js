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
exports.getStudentWithGrades = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const getStudentWithGrades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    const student = yield userModel_1.default.findOne({ email }).populate("grades");
    if (!student) {
        res.status(401).json({ message: "לא נמצאו נותנים עבור סטודנט זה " });
        return;
    }
    res.status(200).json(student);
});
exports.getStudentWithGrades = getStudentWithGrades;
// Optionally, add DELETE and EDIT functions
