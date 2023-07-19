import {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from "../exceptions";
import { IAuthUser, IUser } from "../interfaces";
import { UserModel } from "../model";
import {
  comparePasswords,
  generateOTP,
  generateTokens,
  hashPassword,
  sendEmail,
} from "../utils";

class UserSerivce {
  public async CreateUser(user: IUser): Promise<IUser> {
    const foundUser = await UserModel.findOne({
      email: user.email,
      fullname: user.fullname,
    });
    if (foundUser) {
      throw new ConflictError(`A User with this credentials already exists `);
    }

    // Hash the user's password before storing it
    user.password = await hashPassword(user.password);
    user.plan = "basic";
    const { otp, expiresIn } = generateOTP();
    user.otpCode = otp;
    user.codeExpiresIn = expiresIn;

    //send otp to user email
    await sendEmail({
      to: user.email,
      subject: "Otp for Simplicity web app",
      code: otp,
    });

    // Create a new user in the UserModel
    const newUser = await UserModel.create(user);

    // Return the newly created user
    return newUser;
  }

  public async VerifyOTP(otp: string, email: string): Promise<any> {
    // Find the user in the database based on the provided email
    const foundUser: any = await UserModel.findOne({ email });
    console.log(foundUser);
    // If no user is found, throw a NotFoundError
    if (!foundUser) {
      throw new NotFoundError("User does not exist in our database");
    }

    // Check if the user's account is already verified
    if (foundUser.verified) {
      throw new BadRequestError("User is already verified");
    }
    // Check if the provided OTP matches the stored OTP
    if (foundUser.otpCode !== parseInt(otp)) {
      throw new BadRequestError("Invalid OTP");
    }

    // Check if the OTP validation time has not exceeded 5 minutes from the current time
    const otpValidationTime = new Date(foundUser.codeExpiresIn);
    const currentTime = new Date();
    const timeDifferenceInMinutes =
      (currentTime.getTime() - otpValidationTime.getTime()) / (1000 * 60);
    if (timeDifferenceInMinutes > 5) {
      throw new BadRequestError("OTP validation time has exceeded 5 minutes");
    }

    // Update the user's verified status to true
    foundUser.verified = true;
    foundUser.otpCode = null;

    // Save the updated user in the database
    await foundUser.save();

    // Return the success message or any other relevant response
    return { message: "OTP verification successful" };
  }

  public async LoginUser(user: IAuthUser): Promise<any> {
    // Find the user in the database based on the provided email
    const foundUser: any = await UserModel.findOne({ email: user.email });

    // If no user is found, throw a NotFoundError
    if (!foundUser) {
      throw new NotFoundError("User does not exist in our database");
    }

    // Compare the provided password with the user's stored password
    const passwordMatch = await comparePasswords(
      user.password,
      foundUser.password
    );

    // If the passwords don't match, throw an UnauthorizedError
    if (!passwordMatch) {
      throw new UnauthorizedError("Invalid Credentials!!");
    }

    // Check if the user's account is verified
    if (!foundUser.verified) {
      throw new ForbiddenError(
        "Your account needs to be verified!! Check your email for the verification code"
      );
    }

    // Destructure the fullname and _id properties from the found user object
    const { fullname, _id } = foundUser;

    // Prepare the payload for generating tokens
    const tokenPayload = { fullname, id: _id };

    // Generate access token and refresh token using the token payload
    const { accessToken, refreshToken } = await generateTokens(tokenPayload);

    //Update User data in the database
    foundUser.accessToken = accessToken;
    foundUser.refreshToken = refreshToken;
    await foundUser.save();
    foundUser.password = "";

    // Return the user details without his/her password
    return foundUser;
  }
}

export default UserSerivce;
