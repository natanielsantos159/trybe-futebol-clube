import { Request, Response } from "express"
import { IClub } from "../interfaces/IClub";
import clubsService from "../services/clubsService";

const getAll = async (_req: Request, res: Response) => {
  const allClubs: IClub[] = await clubsService.getAll();
  return res.status(200).json(allClubs);
}

const getById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const foundClub = await clubsService.getById(+id);
  if (foundClub) return res.status(200).json(foundClub);
  return res.status(404).json({ message: 'Club not found' })
}

export default {
  getAll,
  getById
}