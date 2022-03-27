import { Request, Response } from "express"
import leaderboardService from "../services/leaderboardService";

const getHomeTeamLeaderboard = async (_req: Request, res: Response) => {
  const homeLeaderboard = await leaderboardService.getHomeTeamLeaderboard();
  return res.status(200).json(homeLeaderboard);
}

export default {
  getHomeTeamLeaderboard,
}