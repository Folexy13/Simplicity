"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CourseSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Course must have a title"],
        unique: true,
    },
    slug: {
        type: String,
        required: [true, "Course must have a slug"],
        unique: true,
    },
    proficiency: {
        type: String,
        enum: ["easy", "medium", "hard"],
        default: "easy",
    },
    quizzes: mongoose_1.Schema.Types.Mixed,
    assignments: mongoose_1.Schema.Types.Mixed,
}, { timestamps: true });
const CourseModel = (0, mongoose_1.model)("Course", CourseSchema);
exports.default = CourseModel;
