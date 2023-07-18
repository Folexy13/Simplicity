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
const services_1 = require("../services");
const { CreateUser, LoginUser, VerifyOTP } = new services_1.UserSerivce();
class UserController {
    CreateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.body;
            try {
                const newUser = yield CreateUser(user);
                return res.status(200).json({
                    status: "success",
                    message: "Registration succesful,Verify your account",
                    data: newUser,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    VerifyOTP(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { otp, email } = req.body;
                const verifyUserOTP = yield VerifyOTP(otp, email);
                return res.status(200).json({ status: "success", message: verifyUserOTP.message });
            }
            catch (error) {
                next(error);
            }
        });
    }
    LoginUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const loggedInUser = yield LoginUser(req.body);
                return res
                    .status(201)
                    .json({
                    status: "true",
                    message: "login succesful",
                    data: loggedInUser,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = UserController;
