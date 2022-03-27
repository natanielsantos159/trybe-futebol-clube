import { Request, Response } from "express"
import leaderboardService from "../services/leaderboardService";

const getHomeTeamLeaderboard = async (_req: Request, res: Response) => {
  const homeLeaderboard = await leaderboardService.getHomeTeamLeaderboard();
  return res.status(200).json(homeLeaderboard);
}


const getAwayTeamLeaderboard = async (_req: Request, res: Response) => {
  const awayLeaderboard = await leaderboardService.getAwayTeamLeaderboard();
  return res.status(200).json(awayLeaderboard);
}

export default {
  getHomeTeamLeaderboard,
  getAwayTeamLeaderboard,
}