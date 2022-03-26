import { IClubSummation } from "../interfaces/IClub";
import Matchs from "../database/models/Matchs";
import ILeaderboadClub from "../interfaces/ILeaderboadClub";

const getPoints = ({ victory, draw, lost }: { victory: boolean, draw: boolean, lost: boolean }): number => {
  if (victory) return 3;
  if (draw) return 1;
  if (lost) return 0;
  return 0;
};

const calculateEfficiency = ({ totalGames, totalPoints }: IClubSummation): number => {
  const efficiency = totalPoints / (totalGames * 3) * 100;
  return Number(efficiency.toFixed(2));
}


const handleSummation = (
  sumObj: IClubSummation,
  { goalsFavor, goalsOwn, victory, draw, lost }: ILeaderboadClub
): IClubSummation => {
  const points = getPoints({ victory, draw, lost })
  sumObj.totalPoints += points;
  sumObj.goalsFavor += goalsFavor
  sumObj.goalsOwn += goalsOwn
  sumObj.goalsBalance = sumObj.goalsBalance + (goalsFavor - goalsOwn)
  sumObj.totalGames += 1;
  if (draw) sumObj.totalDraws += 1
  if (victory) sumObj.totalVictories += 1
  if (lost) sumObj.totalLosses += 1
  return sumObj;
}

const getHomeData = async () => {
  const matchs = await Matchs.findAll();

  const homeClubsMatchs: ILeaderboadClub[] = await Promise.all(matchs.map(async (match) => {
    const { clubName: name } = await match.getHomeClub();
    const { homeTeam, homeTeamGoals, awayTeamGoals } = match.dataValues;
    return {
      name,
      id: homeTeam,
      goalsFavor: homeTeamGoals,
      goalsOwn: awayTeamGoals,
      victory: homeTeamGoals > awayTeamGoals,
      lost: homeTeamGoals < awayTeamGoals,
      draw: homeTeamGoals === awayTeamGoals,
    };
  }))

  const clubLeaderboard = homeClubsMatchs.reduce((acc, club) => {
    const filterByid = (curr: { id?: number }) => club.id === curr.id;

    const alreadySummed = acc.length > 0 && acc.some(filterByid);
    if (alreadySummed) return acc;

    const initialSummationValue: IClubSummation = {
      id: club.id,
      name: club.name,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      totalDraws: 0,
      totalVictories: 0,
      totalLosses: 0,
      totalPoints: 0,
      totalGames: 0,
    }

    let summationObj = homeClubsMatchs
      .filter(filterByid)
      .reduce(handleSummation, initialSummationValue);

    const efficiency = calculateEfficiency(summationObj);
    summationObj.efficiency = efficiency;
    acc.push(summationObj);
    return acc;
  }, [] as IClubSummation[]);

  clubLeaderboard.forEach((obj) => delete obj.id)
  return clubLeaderboard;
};

export default {
  getHomeData,
}