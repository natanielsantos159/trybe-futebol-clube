import { NextFunction, Request, Response } from "express";
import UserLoginInfo from "../interfaces/UserLoginInfo";
import userService from "../services/userService";
import jwtHelper from "../utils/jwtHelper";

const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers;

  if (!header || !header.authorization) return res.status(401).json({ message: 'Invalid token' })

  try {
    const payload = jwtHelper.verifyToken(header.authorization);
    res.locals.payload = payload; // passa o payload adiante

    if (typeof payload === 'object') {
      const userExists = await userService.userExists(payload as UserLoginInfo);
      if (!userExists) throw new Error;
    }

    next();
  } catch (err: Error | unknown) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}

export default validateJWT;