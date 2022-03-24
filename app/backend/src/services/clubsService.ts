import Clubs from '../database/models/Clubs';
import { IClubModel } from '../interfaces/IClub';

const getAll = async () => {
  const allClubs: IClubModel[] = await Clubs.findAll();
  return allClubs;
}


const getById = async (id: number) => {
  const foundClub: IClubModel | null = await Clubs.findOne({ where: { id } });
  return foundClub;
}

const clubExists = async (id: number) => {
  const foundClub: IClubModel | null = await Clubs.findOne({ where: { id } });
  if (foundClub) return true; else return false;
}

export default {
  getAll,
  getById,
  clubExists,
};