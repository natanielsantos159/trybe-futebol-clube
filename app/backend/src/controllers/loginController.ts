import { Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import userService from "../services/userService";
import IUser from "../interfaces/IUser";
import UserLoginInfo from "../interfaces/UserLoginInfo";

const login = async (req: Request, res: Response) => {
  const userInfo = req.body;

  const user: IUser | null = await userService.getUser(userInfo);

  if (!user) return res.status(401).json({ message: "Incorrect email or password" });

  const secret = fs.readFileSync('../../jwt.evaluation.key', { encoding: 'utf8' });
  const token = jwt.sign(userInfo, secret);
  return res.status(200).json({ token, user });
}

const validate = async (req: Request, res: Response) => {
  const header = req.headers;

  if (!header || !header.authorization) return res.status(401).json({ message: 'Invalid token' })

  const secret = fs.readFileSync('../../jwt.evaluation.key', { encoding: 'utf8' });

  let userInfo;
  try { 
    userInfo = jwt.verify(header.authorization, secret);
  } catch (err: Error | unknown) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  const user = await userService.getUser(userInfo as UserLoginInfo);
  if (user) return res.status(200).send(user.role);
}

export default {
  login,
  validate,
}