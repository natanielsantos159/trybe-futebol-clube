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

const create = async (matchInfo: IMatch) => {
  const createdMatch = await Matchs.create(matchInfo);
  return { ...matchInfo, id: createdMatch.id };
}

export default {
  getAll,
  create,
}