import { Request, Response } from "express"
import leaderboardService from "../services/leaderboardService";

const getHomeData = async (_req: Request, res: Response) => {
  const homeData = await leaderboardService.getHomeData();
  return res.status(200).json(homeData);
}

export default {
  getHomeData,
}