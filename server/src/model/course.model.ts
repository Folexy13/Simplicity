import { model, Schema } from "mongoose";
import { ICourse } from "../interfaces";


const CourseSchema = new Schema<ICourse>(
  {
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
    quizzes: Schema.Types.Mixed,
    assignments: Schema.Types.Mixed,
  },
  { timestamps: true }
);


const CourseModel = model<ICourse>("Course", CourseSchema);

export default CourseModel;
