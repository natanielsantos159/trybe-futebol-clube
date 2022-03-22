import { Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import userService from "../services/userService";
import IUser from "../interfaces/IUser";
import UserLoginInfo from "../interfaces/UserLoginInfo";
require('dotenv').config();

const login = async (req: Request, res: Response) => {
  const userInfo = req.body;

  const secret = fs.readFileSync(process.env.JWT_SECRET_PATH as string).toString();
  const token = jwt.sign(userInfo, secret);

  try { 
    const user: IUser = await userService.getUser(userInfo);
    return res.status(200).json({ token, user });
  } catch(err: Error | unknown) {
    if(err instanceof Error) return res.status(401).json({ message: err.message });
  }
}

const validate = async (req: Request, res: Response) => {
  const header = req.headers;

  if (!header || !header.authorization) return res.status(401).json({ message: 'Invalid token' })

  const secret = fs.readFileSync(process.env.JWT_SECRET_PATH as string).toString();

  let userInfo;
  try { 
    userInfo = jwt.verify(header.authorization, secret);
  } catch (err: Error | unknown) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    const user = await userService.getUser(userInfo as UserLoginInfo);
    return res.status(200).send(user.role);
  } catch(err: Error | unknown) {
    if(err instanceof Error) return res.status(401).json({ message: err.message });
  }
}

export default {
  login,
  validate,
}