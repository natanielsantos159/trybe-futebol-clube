import { Request, Response } from "express"
import { IClub } from "../interfaces/IClub";
import clubsService from "../services/clubsService";

const getAll = async (_req: Request, res: Response) => {
  const allClubs: IClub[] = await clubsService.getAll();
  return res.status(200).json(allClubs);
}

export default { getAll }