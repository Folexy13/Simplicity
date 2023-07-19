"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseModel = exports.UserModel = void 0;
const user_model_1 = __importDefault(require("./user.model"));
exports.UserModel = user_model_1.default;
const course_model_1 = __importDefault(require("./course.model"));
exports.CourseModel = course_model_1.default;
