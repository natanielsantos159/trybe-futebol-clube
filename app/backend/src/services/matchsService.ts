import { IMatch } from "../interfaces/IMatch";
import Matchs from "../database/models/Matchs";
import clubsService from "./clubsService";

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
  const { awayTeam, homeTeam } = matchInfo;
  if (awayTeam === homeTeam) {
    throw Error("It is not possible to create a match with two equal teams")
  }

  const bothExists = await clubsService.clubExists(awayTeam) && await clubsService.clubExists(homeTeam)
  if (!bothExists) throw new Error("There is no team with such id!")

  const createdMatch = await Matchs.create(matchInfo);
  return { ...matchInfo, id: createdMatch.id };
}

const finish = async (id: number) => {
  await Matchs.update({ inProgress: false }, { where: { id } });
}

const updateResult = async (
  id: number,
  {
    homeTeamGoals,
    awayTeamGoals
  }: {
    homeTeamGoals: number,
    awayTeamGoals: number
  }) => {
  const [_affectedRows, rows] = await Matchs.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  return rows[0].dataValues as IMatch;
}

export default {
  getAll,
  create,
  finish,
  getById,
  updateResult,
}