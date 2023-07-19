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
const exceptions_1 = require("../exceptions");
const model_1 = require("../model");
const utils_1 = require("../utils");
class UserSerivce {
    CreateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundUser = yield model_1.UserModel.findOne({
                email: user.email,
                fullname: user.fullname,
            });
            if (foundUser) {
                throw new exceptions_1.ConflictError(`A User with this credentials already exists `);
            }
            // Hash the user's password before storing it
            user.password = yield (0, utils_1.hashPassword)(user.password);
            user.plan = "basic";
            const { otp, expiresIn } = (0, utils_1.generateOTP)();
            user.otpCode = otp;
            user.codeExpiresIn = expiresIn;
            //send otp to user email
            yield (0, utils_1.sendEmail)({
                to: user.email,
                subject: "Otp for Simplicity web app",
                code: otp,
            });
            // Create a new user in the UserModel
            const newUser = yield model_1.UserModel.create(user);
            // Return the newly created user
            return newUser;
        });
    }
    VerifyOTP(otp, email) {
        return __awaiter(this, void 0, void 0, function* () {
            // Find the user in the database based on the provided email
            const foundUser = yield model_1.UserModel.findOne({ email });
            console.log(foundUser);
            // If no user is found, throw a NotFoundError
            if (!foundUser) {
                throw new exceptions_1.NotFoundError("User does not exist in our database");
            }
            // Check if the user's account is already verified
            if (foundUser.verified) {
                throw new exceptions_1.BadRequestError("User is already verified");
            }
            // Check if the provided OTP matches the stored OTP
            if (foundUser.otpCode !== parseInt(otp)) {
                throw new exceptions_1.BadRequestError("Invalid OTP");
            }
            // Check if the OTP validation time has not exceeded 5 minutes from the current time
            const otpValidationTime = new Date(foundUser.codeExpiresIn);
            const currentTime = new Date();
            const timeDifferenceInMinutes = (currentTime.getTime() - otpValidationTime.getTime()) / (1000 * 60);
            if (timeDifferenceInMinutes > 5) {
                throw new exceptions_1.BadRequestError("OTP validation time has exceeded 5 minutes");
            }
            // Update the user's verified status to true
            foundUser.verified = true;
            foundUser.otpCode = null;
            // Save the updated user in the database
            yield foundUser.save();
            // Return the success message or any other relevant response
            return { message: "OTP verification successful" };
        });
    }
    LoginUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            // Find the user in the database based on the provided email
            const foundUser = yield model_1.UserModel.findOne({ email: user.email });
            // If no user is found, throw a NotFoundError
            if (!foundUser) {
                throw new exceptions_1.NotFoundError("User does not exist in our database");
            }
            // Compare the provided password with the user's stored password
            const passwordMatch = yield (0, utils_1.comparePasswords)(user.password, foundUser.password);
            // If the passwords don't match, throw an UnauthorizedError
            if (!passwordMatch) {
                throw new exceptions_1.UnauthorizedError("Invalid Credentials!!");
            }
            // Check if the user's account is verified
            if (!foundUser.verified) {
                throw new exceptions_1.ForbiddenError("Your account needs to be verified!! Check your email for the verification code");
            }
            // Destructure the fullname and _id properties from the found user object
            const { fullname, _id } = foundUser;
            // Prepare the payload for generating tokens
            const tokenPayload = { fullname, id: _id };
            // Generate access token and refresh token using the token payload
            const { accessToken, refreshToken } = yield (0, utils_1.generateTokens)(tokenPayload);
            //Update User data in the database
            foundUser.accessToken = accessToken;
            foundUser.refreshToken = refreshToken;
            yield foundUser.save();
            foundUser.password = "";
            // Return the user details without his/her password
            return foundUser;
        });
    }
}
exports.default = UserSerivce;
