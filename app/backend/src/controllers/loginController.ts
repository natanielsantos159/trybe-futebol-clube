import { Request, Response } from "express";
import jwtHelper from '../utils/jwtHelper';
import userService from "../services/userService";
import {IUser} from "../interfaces/IUser";
import UserLoginInfo from "../interfaces/UserLoginInfo";
require('dotenv').config();

const login = async (req: Request, res: Response) => {
  const userInfo = req.body;

  const token = jwtHelper.getNewToken(userInfo);
  try {
    const user: IUser = await userService.getUser(userInfo);
    return res.status(200).json({ token, user });
  } catch (err: Error | unknown) {
    if (err instanceof Error) return res.status(401).json({ message: err.message });
  }
}

const validate = async (req: Request, res: Response) => {

  try {
    const user = await userService.getUser(res.locals.payload as UserLoginInfo);
    return res.status(200).send(user.role);
  } catch (err: Error | unknown) {
    if (err instanceof Error) return res.status(401).json({ message: err.message });
  }
}

export default {
  login,
  validate,
}