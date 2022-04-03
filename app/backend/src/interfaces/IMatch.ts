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
  dataValues: IMatch,
  getHomeClub?(): Promise<{ dataValues: IClub }>;
  getAwayClub?(): Promise<{ dataValues: IClub }>;
}

export interface IMatchModelMock {
  dataValues: IMatch,
  getHomeClub?(): Promise<{ dataValues: IClub }>;
  getAwayClub?(): Promise<{ dataValues: IClub }>;
}
export interface IClubsMatch {
  homeTeamName: string;
  awayTeamName: string;
  homeTeamId: number;
  awayTeamId: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
};