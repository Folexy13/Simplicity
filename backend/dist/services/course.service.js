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
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../model");
class CourseServices {
    // Create Course
    CreateCourse(course) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdCourse = yield model_1.CourseModel.create(course);
            return createdCourse;
        });
    }
    // Get all Course
    GetAllCourses() {
        return __awaiter(this, void 0, void 0, function* () {
            const courses = yield model_1.CourseModel.find();
            return courses;
        });
    }
    // Get a course
    GetOneCourse(courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const course = yield model_1.CourseModel.findById(courseId);
            return course;
        });
    }
    // Add Quiz to Course
    AddQuiz(courseId, quiz) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedCourse = yield model_1.CourseModel.findByIdAndUpdate(courseId, { $push: { quizzes: quiz } }, { new: true });
            return updatedCourse;
        });
    }
    //Get all Quiz,
    GetAllQuizzes() {
        return __awaiter(this, void 0, void 0, function* () {
            const courses = yield model_1.CourseModel.find({}, { quizzes: 1 });
            const quizzes = courses.reduce((acc, curr) => {
                return acc.concat(curr.quizzes);
            }, []);
            return quizzes;
        });
    }
    //Update Quiz
    UpdateQuiz(quizId, updatedQuiz) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedCourse = yield model_1.CourseModel.findOneAndUpdate({ "quizzes._id": quizId }, { $set: { "quizzes.$": updatedQuiz } }, { new: true });
            if (updatedCourse) {
                const quiz = updatedCourse.quizzes.find((q) => { var _a; return ((_a = q._id) === null || _a === void 0 ? void 0 : _a.toString()) === quizId; });
                return quiz || null;
            }
            return null;
        });
    }
}
exports.default = CourseServices;
