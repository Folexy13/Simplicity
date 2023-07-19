import "./envConfig";
import connectDB from "./db";

const MONGO_URI = process.env.DATABASE_URI;
const OPENAI_KEY = process.env.OPENAI_KEY;
const TOKEN_SECRET = process.env.SECRET;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL;
const WOLFRAM_APP_ID = process.env.WOLFRAM_APP_ID
const PORT = process.env.PORT || 8080;
export {
  MONGO_URI,
  OPENAI_KEY,
  TOKEN_SECRET,
  SENDGRID_API_KEY,
  FROM_EMAIL,
  PORT,
  WOLFRAM_APP_ID,
  connectDB,
};
