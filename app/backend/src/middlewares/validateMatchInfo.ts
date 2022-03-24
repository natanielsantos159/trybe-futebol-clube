import { NextFunction, Request, Response } from "express"
import * as Joi from 'joi';

const schema = Joi.object({
  homeTeam: Joi.number().required(),
  homeTeamGoals: Joi.number().required(),
  awayTeam: Joi.number().required(),
  awayTeamGoals: Joi.number().required(),
  inProgress: Joi.boolean().invalid(false).required(),
});

const validateMatchInfo = (req: Request, res: Response, next: NextFunction) => {
  const matchInfo = req.body;

  const { error } = schema.validate(matchInfo);

  if (error) return res.status(401).json({ message: error.message })

  next();
}

export default validateMatchInfo