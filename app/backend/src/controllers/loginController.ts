import { Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import userService from "../services/userService";
import IUser from "../interfaces/IUser";

const login = async (req: Request, res: Response) => {
  const userInfo = req.body;

  const user: IUser | null = await userService.getUser(userInfo);

  if (!user) return res.status(401).json({ message: "Incorrect email or password" });

  const secret = fs.readFileSync('../../jwt.evaluation.key', { encoding: 'utf8' });
  const token = jwt.sign(userInfo, secret);
  return res.status(200).json({ token, user });
}

export default {
  login,
}