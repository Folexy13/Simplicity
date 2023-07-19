"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTPSchemaBody = exports.LoginSchemaBody = exports.CreateUserSchemaBody = void 0;
const joi_1 = __importDefault(require("joi"));
exports.CreateUserSchemaBody = joi_1.default.object({
    fullname: joi_1.default.string(),
    email: joi_1.default.string().email(),
    phoneNumber: joi_1.default.string(),
    countryOfBirth: joi_1.default.string(),
    countryOfResidence: joi_1.default.string(),
    dob: joi_1.default.string(),
    course: joi_1.default.string(),
    plan: joi_1.default.string(),
    password: joi_1.default.string().required(),
});
exports.LoginSchemaBody = joi_1.default.object({
    password: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
});
exports.OTPSchemaBody = joi_1.default.object({
    otp: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
});
