import { Router } from "express";
import leaderboardController from "../controllers/leaderboardController";

const leaderboard = Router();

leaderboard.get('/', leaderboardController.getGeneralLeaderboard);

leaderboard.get('/home/', leaderboardController.getHomeTeamLeaderboard);

leaderboard.get('/away/', leaderboardController.getAwayTeamLeaderboard);

export default leaderboard