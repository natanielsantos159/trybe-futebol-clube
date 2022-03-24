import { Model } from "sequelize/types";

export interface IClubModel extends Model {
  id: number;
  clubName: string;
}

export interface IClub {
  id: number;
  clubName: string;
}