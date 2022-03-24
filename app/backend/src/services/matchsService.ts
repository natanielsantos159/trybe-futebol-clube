import Matchs from "../database/models/Matchs";

const getAll = async () => {
  const allMatchs = await Matchs.findAll();
  const matchsMapped = await Promise.all(allMatchs.map(async (match) => {
    const homeTeam = await match.getHomeClub();
    const awayTeam = await match.getAwayClub();
    return {
      ...match.dataValues,
      homeClub: { clubName: homeTeam.dataValues.clubName },
      awayClub: { clubName: awayTeam.dataValues.clubName }
    }
  }))
  return matchsMapped;
}

export default {
  getAll,
}