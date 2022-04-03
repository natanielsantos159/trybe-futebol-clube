import { Model } from "sequelize/types";

export interface IUser {
  id: number;
  username: string;
  role: string;
  email: string;
  password?: string;
}

export interface IUserModel extends Model {
  id: number;
  username: string;
  role: string;
  email: string;
  password?: string;
  dataValues: IUser;
}
