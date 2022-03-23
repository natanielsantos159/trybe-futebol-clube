import Clubs from '../database/models/Clubs';
import { IClubModel } from '../interfaces/IClub';

const getAll = async () => {
  const allClubs: IClubModel[] = await Clubs.findAll();
  return allClubs;
}

export default { getAll };