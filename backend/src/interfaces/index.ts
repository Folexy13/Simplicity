import { Document, Schema } from "mongoose";

interface ITrackCourse {
  course: Schema.Types.ObjectId;
}

interface ITracker {
  course: Schema.Types.ObjectId;
  progress: number;
}

export interface IUser extends Document {
  fullname: string;
  email: string;
  password: string;
  phoneNumber: string;
  countryOfResidence: string;
  countryOfBirth: string;
  dob: string;
  course: ITrackCourse[];
  plan:string,
  tracker: ITracker[];
  otpCode?: number;
  verified: boolean;
  codeExpiresIn?: Date;
  accessToken?: string;
  _id?: string;
  refreshToken?: string;
}

export interface IAuthUser {
  email: string;
  password: string;
}

export interface IEmailTemp {
  to: string;
  subject: string;
  code?: number;
}

export interface ICourse {
  title: string;
  category:string;
  duration:string;
  learners:number;
  slug: string;
  proficiency: "easy" | "medium" | "hard";
  quizzes: any;
  assignments: any;
  progress: Number;
  _id?:string
}


export interface IQuiz {
  question: string;
  options: any;
  _id?: string;
  correctAnswers: any;
}
