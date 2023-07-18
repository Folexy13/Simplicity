import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  FROM_EMAIL,
  OPENAI_KEY,
  SENDGRID_API_KEY,
  TOKEN_SECRET,
} from "../config";
import sgMail, { MailDataRequired } from "@sendgrid/mail";
import { IEmailTemp } from "../interfaces";
import { BadRequestError, ConflictError } from "../exceptions";

export const hashPassword = async (password: string): Promise<string> => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to hash password");
  }
};

export const comparePasswords = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    // Handle the error appropriately
    throw new Error("Failed to compare passwords");
  }
};

export const generateTokens = (payload: any) => {
  const accessToken = jwt.sign(payload, String(TOKEN_SECRET), {
    expiresIn: "3h",
  });
  const refreshToken = jwt.sign(payload, String(TOKEN_SECRET), {
    expiresIn: "15d",
  });
  return { accessToken, refreshToken };
};

export const sendEmail = async (emailContent: IEmailTemp): Promise<void> => {
  try {
    sgMail.setApiKey(String(SENDGRID_API_KEY));
    let html: any = `<p>Your OTP Code is ${emailContent.code}</p>`;
    const message: MailDataRequired = {
      to: emailContent.to,
      from: "Folajimi from simplicity" + `<${String(FROM_EMAIL)}>`,
      subject: emailContent.subject,
      html: html,
    };

    await sgMail.send(message);
    console.log("Email sent successfully");
  } catch (error: any) {
    console.error("Error sending email:", error.response.body);
    throw new BadRequestError("Failed to send email");
  }
};

export const generateOTP = (): any => {
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

export const verifyRefreshToken = (token: string): string => {
  try {
    const decoded: any = jwt.verify(token, String(TOKEN_SECRET));
    return decoded.id;
  } catch (error) {
    throw new Error("Invalid refresh token");
  }
};

export const verifyAccessToken = (token: string): string => {
  try {
    const decoded: any = jwt.verify(token, String(TOKEN_SECRET));
    return decoded.id;
  } catch (error) {
    throw new Error("Invalid access token");
  }
};

import axios from "axios";

export const main = async () => {
  const axios = require("axios");

  const encodedParams = new URLSearchParams();
  encodedParams.set(
    "text",
    "Ukraine is a country in Eastern Europe. It is the second-largest European country after Russia, which it borders to the east and northeast. Ukraine covers approximately 600,000 square kilometres (230,000 sq mi). Prior to the ongoing Russo-Ukrainian War, it was the eighth-most populous country in Europe, with a population of around 41 million people. It is also bordered by Belarus to the north; by Poland, Slovakia, and Hungary to the west; and by Romania and Moldova to the southwest; with a coastline along the Black Sea and the Sea of Azov to the south and southeast. Kyiv is the nation's capital and largest city. Ukraine's official and national language is Ukrainian; most people are also fluent in Russian."
  );
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
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

export const generateAnswers = async () => {
 const options: any = {
   method: "POST",
   url: "https://chatgpt-api8.p.rapidapi.com/",
   headers: {
     "content-type": "application/json",
     "X-RapidAPI-Key": "97e0debb1dmshe760970bba1a576p1353a3jsn11f346494b39",
     "X-RapidAPI-Host": "chatgpt-api8.p.rapidapi.com",
   },
   data: [
     {
       content:
         "Generate an array of 10  questions and 4 options each with thier answers on Quantum mechanics",
       role: "user",
     },
   ],
 };

 try {
   const response = await axios.request(options);
   console.log(response.data);
 } catch (error) {
   console.error(error);
 }
};
// "Generate 10 list of questions and4 option each with thier answers on Quantum mechanics",