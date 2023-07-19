import { NextFunction, Request, RequestHandler, Response } from "express";
import { UnauthorizedError } from "../exceptions";
import JWT from "jsonwebtoken"
import { TOKEN_SECRET } from "../config";

export default function (): RequestHandler {
  return async (
    req:Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      let { authorization }: any = req.headers;

      if (!authorization)
        throw new UnauthorizedError(`No authorization headers passed`);

      const bearer = authorization.split(" ")[0];
      const token = authorization.split(" ")[1];

      if (!bearer || !token)
        throw new UnauthorizedError(
          `Token not passed in authorization headers`
        );

      if (bearer !== "Bearer")
        throw new UnauthorizedError(
          `Bearer not passed in authorization headers`
        );

      const decoded: any = JWT.verify(token, String(TOKEN_SECRET));

      next();
    } catch (err: any) {
      next(err);
    }
  };
}
