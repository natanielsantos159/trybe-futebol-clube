import { Request, Response } from "express"
import leaderboardService from "../services/leaderboardService";

const getHomeTeamLeaderboard = async (_req: Request, res: Response) => {
  const homeLeaderboard = await leaderboardService.getLeaderboard({type: 'home'});
  return res.status(200).json(homeLeaderboard);
}

const getAwayTeamLeaderboard = async (_req: Request, res: Response) => {
  const awayLeaderboard = await leaderboardService.getLeaderboard({type: 'away'});
  return res.status(200).json(awayLeaderboard);
}

const getGeneralLeaderboard = async (_req: Request, res: Response) => {
  const generalLeaderboard = await  leaderboardService.getLeaderboard({type: 'both'});
  return res.status(200).json(generalLeaderboard);
}

export default {
  getHomeTeamLeaderboard,
  getAwayTeamLeaderboard,
  getGeneralLeaderboard,
}