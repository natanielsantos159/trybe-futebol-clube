import { Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import userService from "../services/userService";
import IUser from "../interfaces/IUser";

const login = async (res: Response, req: Request) => {
  const { email, password } = req.body;

  const user: IUser | null = await userService.getUser({ email, password });

  if (!user) return res.status(404).json({ error: 'User not found' });

  const secret = fs.readFileSync('../../jwt.evaluation.key', { encoding: 'utf8' });
  const token = jwt.sign({ email, password }, secret);
  return res.status(200).json({ token, user });
}

export default {
  login,
}