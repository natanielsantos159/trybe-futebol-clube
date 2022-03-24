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

export default {
  getAll,
}