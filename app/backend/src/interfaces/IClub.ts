import { Model } from "sequelize/types";

export interface IClubModel extends Model {
  id: number;
  clubName: string;
}

export interface IClub {
  id: number;
  clubName: string;
}

export interface IClubSummation {
  id?: number;
  name: string;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  totalDraws: number;
  totalVictories: number;
  totalLosses: number;
  totalPoints: number;
  totalGames: number;
  efficiency?: number;
}