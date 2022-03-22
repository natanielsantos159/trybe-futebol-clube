import { NextFunction, Request, Response } from "express"
import * as Joi from 'joi';

const schema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'All fields must be filled',
    'string.empty': 'All fields must be filled',
    'string.email': "Incorrect email or password"
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': 'All fields must be filled',
    'string.empty': 'All fields must be filled',
  }),
});

const validateLoginInfo = (req: Request, res: Response, next: NextFunction) => {
  const userInfo = req.body;

  const { error } = schema.validate(userInfo);

  if (error) return res.status(401).json({ message: error.message })

  next();
}

export default validateLoginInfo