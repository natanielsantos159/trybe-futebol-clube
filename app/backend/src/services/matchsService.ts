import { IMatch } from "../interfaces/IMatch";
import Matchs from "../database/models/Matchs";

const getAll = async () => {
  const allMatchs = await Matchs.findAll();
  const matchsMapped = await Promise.all(allMatchs.map(async (match) => {
    const homeTeam = await match.getHomeClub();
    const awayTeam = await match.getAwayClub();
    return {
      ...match.dataValues,
      inProgress: Boolean(match.dataValues.inProgress),
      homeClub: { clubName: homeTeam.dataValues.clubName },
      awayClub: { clubName: awayTeam.dataValues.clubName }
    }
  }))
  return matchsMapped;
}

const getById = async (id: number) => {
  const foundMatch = await Matchs.findByPk(id);
  if (foundMatch) return foundMatch.dataValues;
  else throw Error("Match doesn't exist.");
}

const create = async (matchInfo: IMatch) => {
  const createdMatch = await Matchs.create(matchInfo);
  return { ...matchInfo, id: createdMatch.id };
}

const finish = async (id: number) => {
  await Matchs.update({ inProgress: false }, { where: { id } });
}

export default {
  getAll,
  create,
  finish,
  getById,
}