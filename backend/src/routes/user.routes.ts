import express, { Request, Response } from "express";
import { UserController } from "../controller";
import { validateReqBody } from "../middlewares";
import axios from "axios";
import {
  CreateUserSchemaBody,
  LoginSchemaBody,
  OTPSchemaBody,
} from "../validations/UserSchema";
import { generateAnswers, main } from "../utils";
import { WOLFRAM_APP_ID } from "../config";

const { CreateUser, LoginUser, VerifyOTP } = new UserController();

const router = express.Router();

const testing = async (req: Request, res: Response) => {
  const { q } = req.query;
  const resp = await axios.get(
    `https://www.wolframalpha.com/api/v2/query?input=${q}&appid=${WOLFRAM_APP_ID}&format=plaintext&reinterpret=true&output=json`
  );
  return res.send(resp.data);
};

router.post("/register", validateReqBody(CreateUserSchemaBody), CreateUser);
router.route("/otp").post(validateReqBody(OTPSchemaBody), VerifyOTP).get();
router.post("/login", validateReqBody(LoginSchemaBody), LoginUser);

router.get("/ai", generateAnswers);

export default router;
