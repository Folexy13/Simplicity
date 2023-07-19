import { IUser } from "../interfaces";
import { UserSerivce } from "../services";
import { NextFunction, Request, Response } from "express";

const { CreateUser, LoginUser, VerifyOTP } = new UserSerivce();
class UserController {
  public async CreateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const user: IUser = req.body;
    try {
      const newUser = await CreateUser(user);
      return res.status(200).json({
        status: "success",
        message: "Registration succesful,Verify your account",
        data: newUser,
      });
    } catch (error) {
      next(error);
    }
  }

  public async VerifyOTP(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { otp, email } = req.body;
      const verifyUserOTP = await VerifyOTP(otp, email);

      return res
        .status(200)
        .json({ status: "success", message: verifyUserOTP.message });
    } catch (error) {
      next(error);
    }
  }

  public async LoginUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const loggedInUser = await LoginUser(req.body);
      const { accesToken, refreshToken, _id: id } = loggedInUser;
      return res.status(201).json({
        status: true,
        message: "login succesful",
        data: { accesToken, refreshToken, id },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
