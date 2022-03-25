import { Router } from "express";
import leaderboardController from "../controllers/leaderboardController";

const leaderboard = Router();

leaderboard.get('/home/', leaderboardController.getHomeData);

export default leaderboard