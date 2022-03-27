import { IClub, IClubSummation } from "../interfaces/IClub";
import Matchs from "../database/models/Matchs";
import { IClubsMatch } from "../interfaces/IMatch";

type LeaderboarFilterType = 'home' | 'away' | 'both';

const calculateEfficiency = ({ totalGames, totalPoints }: IClubSummation): number => {
  const efficiency = totalPoints / (totalGames * 3) * 100;
  return Number(efficiency.toFixed(2));
}

const handleSummation = (
  sumObj: IClubSummation,
  match: IClubsMatch,
  type: LeaderboarFilterType
): IClubSummation => {
  const currentlyHomeOrAway = sumObj.id === match.homeTeamId ? 'home' : 'away';
  const currentType = type === 'both' ? currentlyHomeOrAway : type;
  const adversary = currentType === 'home' ? 'away' : 'home';

  const currGoalsFavor = match[`${currentType}TeamGoals`];
  const currGoalsOwn = match[`${adversary}TeamGoals`];

  sumObj.goalsFavor += currGoalsFavor
  sumObj.goalsOwn += currGoalsOwn
  sumObj.goalsBalance = sumObj.goalsBalance + (currGoalsFavor - currGoalsOwn)
  sumObj.totalGames += 1;

  if (currGoalsFavor === currGoalsOwn) sumObj.totalDraws += 1;
  if (currGoalsFavor > currGoalsOwn) sumObj.totalVictories += 1
  if (currGoalsFavor < currGoalsOwn) sumObj.totalLosses += 1
  return sumObj;
}

const sortByPoints = (a: IClubSummation, b: IClubSummation) => {
  if (a.totalPoints !== b.totalPoints) {
    return b.totalPoints - a.totalPoints;
  }
  if (a.totalVictories !== b.totalVictories) {
    return b.totalVictories - a.totalVictories
  }
  if (a.goalsBalance !== b.goalsBalance) {
    return b.goalsBalance - a.goalsBalance
  }
  if (a.goalsFavor !== b.goalsFavor) {
    return b.goalsFavor - a.goalsFavor
  }
  if (a.goalsOwn !== b.goalsOwn) {
    return b.goalsOwn - a.goalsOwn
  }
  return 0;
}

const getClubsMatch = async (match: Matchs): Promise<IClubsMatch> => {
  const { clubName: homeTeamName } = await match.getHomeClub();
  const { clubName: awayTeamName } = await match.getAwayClub();
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = match.dataValues;
  return {
    homeTeamName,
    awayTeamName,
    homeTeamId: homeTeam,
    awayTeamId: awayTeam,
    homeTeamGoals,
    awayTeamGoals,
  };
}

const reduceLeaderboard = (
  leaderboardArray: IClubSummation[],
  match: IClubsMatch,
  clubMatchs: IClubsMatch[],
  type: LeaderboarFilterType,
) => {
  const filterById = (curr: { id?: number, homeTeamId?: number, awayTeamId?: number }) => {
    switch (type) {
      case 'home':
      case 'away':
        return match[`${type}TeamId`] === (curr.id || curr[`${type}TeamId`]);
      case 'both':
        return match.homeTeamId === curr.awayTeamId || match.homeTeamId === curr.homeTeamId || match.homeTeamId === curr.id;
    }
  };

  const alreadySummed = leaderboardArray.length > 0 && leaderboardArray.some(filterById);
  if (alreadySummed) return leaderboardArray;

  const hasType = type !== 'both';
  const initialSummationValue: IClubSummation = {
    id: hasType ? match[`${type}TeamId`] : match.homeTeamId,
    name: hasType ? match[`${type}TeamName`] : match.homeTeamName,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    totalDraws: 0,
    totalVictories: 0,
    totalLosses: 0,
    totalPoints: 0,
    totalGames: 0,
  }

  let summationObj = clubMatchs
    .filter(filterById)
    .reduce((sumObj, currMatch) => handleSummation(sumObj, currMatch, type), initialSummationValue);

  summationObj.totalPoints = (3 * summationObj.totalVictories) + summationObj.totalDraws
  summationObj.efficiency = calculateEfficiency(summationObj);

  leaderboardArray.push(summationObj);
  return leaderboardArray;
}

const getLeaderboard = async ({ type }: { type: LeaderboarFilterType }) => {
  const matchs = await Matchs.findAll({ where: { inProgress: false } });

  const clubMatchs = await Promise.all(
    matchs.map((match) => getClubsMatch(match)));

  const leaderboard = clubMatchs.reduce((leaderboardArray, currentMatch) => {
    return reduceLeaderboard(leaderboardArray, currentMatch, clubMatchs, type)
  }, [] as IClubSummation[]);

  leaderboard.forEach((obj) => { delete obj.id; });
  leaderboard.sort(sortByPoints);
  return leaderboard;
};

export default {
  getLeaderboard,
}