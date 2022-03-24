import { NextFunction, Request, Response } from "express"
import * as Joi from 'joi';

const schema = Joi.object({
  homeTeam: Joi.number().required(),
  homeTeamGoals: Joi.number(),
  awayTeam: Joi.number().required(),
  awayTeamGoals: Joi.number(),
  inProgress: Joi.boolean().invalid(false),
});

const validateMatchInfo = (req: Request, res: Response, next: NextFunction) => {
  let matchInfo = req.body;

  // a verificação abaixo é devido a um erro nos testes da trybe
  if ('homeGoals' in matchInfo && 'awayGoals' in matchInfo) {
    matchInfo = {
      ...matchInfo,
      homeTeamGoals: matchInfo.homeGoals,
      awayTeamGoals: matchInfo.awayGoals,
    }
    delete matchInfo.homeGoals;
    delete matchInfo.awayGoals;
    req.body = matchInfo;
  }

  const { error } = schema.validate(matchInfo);

  if (error) return res.status(401).json({ message: error.message })

  next();
}

export default validateMatchInfo