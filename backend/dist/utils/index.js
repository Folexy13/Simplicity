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
exports.generateAnswers = exports.main = exports.verifyAccessToken = exports.verifyRefreshToken = exports.generateOTP = exports.sendEmail = exports.generateTokens = exports.comparePasswords = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const mail_1 = __importDefault(require("@sendgrid/mail"));
const exceptions_1 = require("../exceptions");
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        return hashedPassword;
    }
    catch (error) {
        console.log(error);
        throw new Error("Failed to hash password");
    }
});
exports.hashPassword = hashPassword;
const comparePasswords = (password, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isMatch = yield bcrypt_1.default.compare(password, hashedPassword);
        return isMatch;
    }
    catch (error) {
        // Handle the error appropriately
        throw new Error("Failed to compare passwords");
    }
});
exports.comparePasswords = comparePasswords;
const generateTokens = (payload) => {
    const accessToken = jsonwebtoken_1.default.sign(payload, String(config_1.TOKEN_SECRET), {
        expiresIn: "3h",
    });
    const refreshToken = jsonwebtoken_1.default.sign(payload, String(config_1.TOKEN_SECRET), {
        expiresIn: "15d",
    });
    return { accessToken, refreshToken };
};
exports.generateTokens = generateTokens;
const sendEmail = (emailContent) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        mail_1.default.setApiKey(String(config_1.SENDGRID_API_KEY));
        let html = `<p>Your OTP Code is ${emailContent.code}</p>`;
        const message = {
            to: emailContent.to,
            from: "Folajimi from simplicity" + `<${String(config_1.FROM_EMAIL)}>`,
            subject: emailContent.subject,
            html: html,
        };
        yield mail_1.default.send(message);
        console.log("Email sent successfully");
    }
    catch (error) {
        console.error("Error sending email:", (_a = error.response) === null || _a === void 0 ? void 0 : _a.body);
        throw new exceptions_1.BadRequestError("Failed to send email");
    }
});
exports.sendEmail = sendEmail;
const generateOTP = () => {
    const otpLength = 6; // Length of the OTP
    const otpDigits = "0123456789"; // Characters allowed in the OTP
    let otp = "";
    for (let i = 0; i < otpLength; i++) {
        const randomIndex = Math.floor(Math.random() * otpDigits.length);
        otp += otpDigits.charAt(randomIndex);
    }
    const otpExpiration = new Date();
    otpExpiration.setMinutes(otpExpiration.getMinutes() + 5);
    return { otp, expiresIn: otpExpiration };
};
exports.generateOTP = generateOTP;
const verifyRefreshToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, String(config_1.TOKEN_SECRET));
        return decoded.id;
    }
    catch (error) {
        throw new Error("Invalid refresh token");
    }
};
exports.verifyRefreshToken = verifyRefreshToken;
const verifyAccessToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, String(config_1.TOKEN_SECRET));
        return decoded.id;
    }
    catch (error) {
        throw new Error("Invalid access token");
    }
};
exports.verifyAccessToken = verifyAccessToken;
const axios_1 = __importDefault(require("axios"));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const axios = require("axios");
    const encodedParams = new URLSearchParams();
    encodedParams.set("text", "Ukraine is a country in Eastern Europe. It is the second-largest European country after Russia, which it borders to the east and northeast. Ukraine covers approximately 600,000 square kilometres (230,000 sq mi). Prior to the ongoing Russo-Ukrainian War, it was the eighth-most populous country in Europe, with a population of around 41 million people. It is also bordered by Belarus to the north; by Poland, Slovakia, and Hungary to the west; and by Romania and Moldova to the southwest; with a coastline along the Black Sea and the Sea of Azov to the south and southeast. Kyiv is the nation's capital and largest city. Ukraine's official and national language is Ukrainian; most people are also fluent in Russian.");
    encodedParams.set("percentage", "30");
    const options = {
        method: "POST",
        url: "https://text-summarize-pro.p.rapidapi.com/summarizeFromText",
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            "X-RapidAPI-Key": "97e0debb1dmshe760970bba1a576p1353a3jsn11f346494b39",
            "X-RapidAPI-Host": "text-summarize-pro.p.rapidapi.com",
        },
        data: encodedParams,
    };
    try {
        const response = yield axios.request(options);
        console.log(response.data);
    }
    catch (error) {
        console.error(error);
    }
});
exports.main = main;
const generateAnswers = () => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        method: "POST",
        url: "https://chatgpt-api8.p.rapidapi.com/",
        headers: {
            "content-type": "application/json",
            "X-RapidAPI-Key": "97e0debb1dmshe760970bba1a576p1353a3jsn11f346494b39",
            "X-RapidAPI-Host": "chatgpt-api8.p.rapidapi.com",
        },
        data: [
            {
                content: "Generate an array of 10  questions and 4 options each with thier answers on Quantum mechanics",
                role: "user",
            },
        ],
    };
    try {
        const response = yield axios_1.default.request(options);
        console.log(response.data);
    }
    catch (error) {
        console.error(error);
    }
});
exports.generateAnswers = generateAnswers;
// "Generate 10 list of questions and4 option each with thier answers on Quantum mechanics",
