import { NextFunction, Request, RequestHandler, Response } from "express"
import * as Joi from 'joi';

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const validateLoginInfo = (res: Response, req: Request, next: NextFunction) => {
  const userInfo = req.body;

  const { error } = schema.validate(userInfo);

  if (error) return res.status(400).json({ error: error.message })

  next();
}

export default validateLoginInfo