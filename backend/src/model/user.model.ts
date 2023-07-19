import { model, Schema } from "mongoose";
import { IUser } from "../interfaces";


const UserSchema = new Schema<IUser>(
  {
    fullname: {
      type: String,
      required: [true, "User must have a name"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "User must have an email address"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "User must have a password"],
    },
    phoneNumber: {
      type: String,
      required: [true, "User must have a phone number"],
    },
    countryOfResidence: {
      type: String,
      required: [true, "User must have a country by birth"],
    },
    countryOfBirth: {
      type: String,
      required: [true, "User must have a country of residence"],
    },
    dob: {
      type: String,
      required: [true, "User must have a date of birth"],
    },
    plan: {
      type: String,
    },
    course: [
      {
        reference: { type: Schema.Types.ObjectId, ref: "Course" },
      },
    ],
    tracker: [
      {
        course: { type: Schema.Types.ObjectId, ref: "Course" },
        progress: { type: Number, default: 0 },
      },
    ],
    otpCode: {
      type: Number,
      required: [false, "Otp must be of 6 digit"],
    },
    verified: {
      type: Boolean,
      default: false,
    },
    codeExpiresIn: Date,
    accessToken: String,
    refreshToken: String,
  },
  { timestamps: true }
);

const UserModel = model<IUser>("User", UserSchema);

export default UserModel;
