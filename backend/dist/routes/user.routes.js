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
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controller");
const middlewares_1 = require("../middlewares");
const axios_1 = __importDefault(require("axios"));
const UserSchema_1 = require("../validations/UserSchema");
const utils_1 = require("../utils");
const config_1 = require("../config");
const { CreateUser, LoginUser, VerifyOTP } = new controller_1.UserController();
const router = express_1.default.Router();
const testing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { q } = req.query;
    const resp = yield axios_1.default.get(`https://www.wolframalpha.com/api/v2/query?input=${q}&appid=${config_1.WOLFRAM_APP_ID}&format=plaintext&reinterpret=true&output=json`);
    return res.send(resp.data);
});
router.post("/register", (0, middlewares_1.validateReqBody)(UserSchema_1.CreateUserSchemaBody), CreateUser);
router.route("/otp").post((0, middlewares_1.validateReqBody)(UserSchema_1.OTPSchemaBody), VerifyOTP).get();
router.post("/login", (0, middlewares_1.validateReqBody)(UserSchema_1.LoginSchemaBody), LoginUser);
router.get("/ai", utils_1.generateAnswers);
exports.default = router;
