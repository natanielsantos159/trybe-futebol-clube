import { IClub, IClubSummation } from "../interfaces/IClub";
import Matchs from "../database/models/Matchs";
import { ILeaderboadMatch } from "../interfaces/IMatch";

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

const getClubsMatchByType = async (type: 'Home' | 'Away', match: Matchs) => {
  const { clubName: name } = type === 'Home' ? await match.getHomeClub() : await match.getAwayClub();
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = match.dataValues;
  const goalsFirstTeam = type === 'Home' ? homeTeamGoals : awayTeamGoals;
  const goalsSecondTeam = type === 'Home' ? awayTeamGoals : homeTeamGoals
  return {
    name,
    id: type === 'Home' ? homeTeam : awayTeam,
    goalsFavor: goalsFirstTeam,
    goalsOwn: goalsSecondTeam,
    victory: goalsFirstTeam > goalsSecondTeam,
    lost: goalsFirstTeam < goalsSecondTeam,
    draw: goalsFirstTeam === goalsSecondTeam,
  };
}

const reduceLeaderboard = (
    leaderboardArray: IClubSummation[],
    match: ILeaderboadMatch,
    homeClubMatchs: ILeaderboadMatch[]
  ) => {
  const filterById = (curr: { id?: number }) => match.id === curr.id;

  const alreadySummed = leaderboardArray.length > 0 && leaderboardArray.some(filterById);
  if (alreadySummed) return leaderboardArray;

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

  let summationObj = homeClubMatchs
    .filter(filterById)
    .reduce(handleSummation, initialSummationValue);

  summationObj.totalPoints = (3 * summationObj.totalVictories) + summationObj.totalDraws
  summationObj.efficiency = calculateEfficiency(summationObj);

  leaderboardArray.push(summationObj);
  return leaderboardArray;
}

const getHomeTeamLeaderboard = async () => {
  const matchs = await Matchs.findAll({ where: { inProgress: false } });

  const promisesClubMatchs = matchs.map((match) => getClubsMatchByType('Home', match))
  const homeClubMatchs: ILeaderboadMatch[] = await Promise.all(promisesClubMatchs);

  const homeLeaderboard = homeClubMatchs.reduce((leaderboardArray, currentMatch) => {
    return reduceLeaderboard(leaderboardArray, currentMatch, homeClubMatchs)
  }, [] as IClubSummation[]);

  homeLeaderboard.forEach((obj) => { delete obj.id; });
  homeLeaderboard.sort(sortByPoints);
  return homeLeaderboard;
};

const getAwayTeamLeaderboard = async () => {
  const matchs = await Matchs.findAll({ where: { inProgress: false } });

  const promisesClubMatchs = matchs.map((match) => getClubsMatchByType('Away', match))
  const awayClubMatchs: ILeaderboadMatch[] = await Promise.all(promisesClubMatchs);

  const awayLeaderboard = awayClubMatchs.reduce((leaderboardArray, currentMatch) => {
    return reduceLeaderboard(leaderboardArray, currentMatch, awayClubMatchs)
  }, [] as IClubSummation[]);

  awayLeaderboard.forEach((obj) => { delete obj.id; });
  awayLeaderboard.sort(sortByPoints);
  return awayLeaderboard;
}

export default {
  getHomeTeamLeaderboard,
  getAwayTeamLeaderboard,
}