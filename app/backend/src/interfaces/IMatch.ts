import { Model } from "sequelize/types";
import { IClub } from "./IClub";

export interface IMatch {
  id?: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
  homeClub?: { clubName: string };
  awayClub?: { clubName: string };
}

export interface IMatchModel extends Model {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
  getHomeClub(): IClub;
  getAwayClub(): IClub;
}

export interface IMatchModelMock {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
  getHomeClub(): IClub;
  getAwayClub(): IClub;
}
export interface IClubsMatch {
  homeTeamName: string;
  awayTeamName: string;
  homeTeamId: number;
  awayTeamId: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
};