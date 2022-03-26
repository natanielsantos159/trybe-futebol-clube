import { Request, Response } from "express";
import matchsService from "../services/matchsService";
import { IMatch } from "../interfaces/IMatch"
import * as Joi from "joi";

const getAll = async (req: Request, res: Response) => {
  let allMatchs = await matchsService.getAll();

  if ('inProgress' in req.query) {
    const inProgress = req.query.inProgress === 'true';
    allMatchs = allMatchs.filter(match => match.inProgress === inProgress);
  }

  return res.status(200).json(allMatchs)
}

const create = async (req: Request, res: Response) => {
  const matchInfo: IMatch = req.body;

  try {
    const createdMatch = await matchsService.create(matchInfo);
    return res.status(201).json(createdMatch);
  } catch (err: Error | unknown) {
    if (err instanceof Error) return res.status(401).json({ message: err.message })
  }
}

const finish = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
      await matchsService.finish(+id);
      return res.status(200).json({ message: 'Partida finalizada' });
  } catch (err: Error | unknown) {
    if (err instanceof Error) return res.status(401).json({ message: err.message })
  }
}

const updateResult = async (req: Request, res: Response) => {
  const newResult = req.body;
  const { id } = req.params;

  await matchsService.updateResult(+id, newResult as { homeTeamGoals: number, awayTeamGoals: number});
  return res.status(200).json({message: 'Match updated'});
}

export default {
  getAll,
  create,
  finish,
  updateResult,
}