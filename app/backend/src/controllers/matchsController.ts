import { Request, Response } from "express";
import matchsService from "../services/matchsService";
import { IMatch } from "../interfaces/IMatch"

const getAll = async (req: Request, res: Response) => {
  let allMatchs = await matchsService.getAll();

  if ('inProgress' in req.query) {
    const inProgress = Boolean(req.query.inProgress);
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
    const foundMatch = await matchsService.getById(+id);
    if (foundMatch) {
      await matchsService.finish(+id);
      return res.status(200).json({...foundMatch, inProgress: false});
    }
  } catch (err: Error | unknown) {
    if (err instanceof Error) return res.status(401).json({ message: err.message })
  }
}

export default {
  getAll,
  create,
  finish,
}