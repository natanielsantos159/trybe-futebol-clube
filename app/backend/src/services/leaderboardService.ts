import { IClubSummation } from "../interfaces/IClub";
import Matchs from "../database/models/Matchs";
import {ILeaderboadMatch} from "../interfaces/IMatch";

const calculateEfficiency = ({ totalGames, totalPoints }: IClubSummation): number => {
  const efficiency = totalPoints / (totalGames * 3) * 100;
  return Number(efficiency.toFixed(2));
}

const handleSummation = (
  sumObj: IClubSummation,
  { goalsFavor, goalsOwn, victory, draw, lost }: ILeaderboadMatch
): IClubSummation => {
  sumObj.goalsFavor += goalsFavor
  sumObj.goalsOwn += goalsOwn
  sumObj.goalsBalance = sumObj.goalsBalance + (goalsFavor - goalsOwn)
  sumObj.totalGames += 1;
  if (draw) sumObj.totalDraws += 1;
  if (victory) sumObj.totalVictories += 1
  if (lost) sumObj.totalLosses += 1
  return sumObj;
}

const sortByPoints = (a: IClubSummation, b: IClubSummation) => {
  if (a.totalPoints > b.totalPoints) return -1;
  if (a.totalPoints < b.totalPoints) return 1;
  if (a.totalPoints = b.totalPoints) {
    if (a.totalVictories > b.totalVictories) return -1;
    if (a.totalVictories < b.totalVictories) return 1;
    if (a.goalsBalance > b.goalsBalance) return -1;
    if (a.goalsBalance < b.goalsBalance) return 1;
    if (a.goalsOwn > b.goalsOwn) return -1;
    if (a.goalsOwn < b.goalsOwn) return 1;
    if (a.goalsFavor > b.goalsFavor) return -1;
    if (a.goalsFavor < b.goalsFavor) return 1;
  }
  return 1;
}

const getHomeData = async () => {
  const matchs = await Matchs.findAll({ where: { inProgress: false } });

  const homeClubsMatchs: ILeaderboadMatch[] = await Promise.all(matchs.map(async (match) => {
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

  const homeLeaderboard = homeClubsMatchs.reduce((acc, match) => {
    const filterByHomeId = (curr: { id?: number }) => match.id === curr.id;

    const alreadySummed = acc.length > 0 && acc.some(filterByHomeId);
    if (alreadySummed) return acc;

    const initialSummationValue: IClubSummation = {
      id: match.id,
      name: match.name,
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
      .filter(filterByHomeId)
      .reduce(handleSummation, initialSummationValue);

    summationObj.totalPoints = (3 * summationObj.totalVictories) + summationObj.totalDraws
    summationObj.efficiency = calculateEfficiency(summationObj);


    acc.push(summationObj);
    return acc;
  }, [] as IClubSummation[]);

  homeLeaderboard.forEach((obj) => { delete obj.id; });
  homeLeaderboard.sort(sortByPoints);
  return homeLeaderboard;
};

export default {
  getHomeData,
}