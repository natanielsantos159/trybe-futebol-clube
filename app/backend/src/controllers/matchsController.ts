import { Request, Response } from "express";
import matchsService from "../services/matchsService";
import { IMatch } from "../interfaces/IMatch"

const getAll = async (_req: Request, res: Response) => {
  const allMatchs = await matchsService.getAll();
  return res.status(200).json(allMatchs)
}

export default {
  getAll,
}