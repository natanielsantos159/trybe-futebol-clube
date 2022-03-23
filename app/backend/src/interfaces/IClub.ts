import { Model } from "sequelize/types";

export interface IClubModel extends Model {
  id: number;
  club_name: string;
}

export interface IClub {
  id: number;
  club_name: string;
}