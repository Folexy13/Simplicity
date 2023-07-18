import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import { errHandler } from "./exceptions";
import { userRoutes } from "./routes";
export default async (app: Application) => {
  if (process.env.ENV === "dev") app.use(morgan("dev"));
  app.use(cors());
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(compression());

  app.use("/user", userRoutes);

  // catch 404 and forward to error handler
  app.all("*", function (req: Request, res: Response): Response {
    return res.sendStatus(404);
  });

  app.use(errHandler);
};
