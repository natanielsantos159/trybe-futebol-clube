import { DataTypes, Model } from 'sequelize';
import db from '.';
import Clubs from './Clubs';

class Matchs extends Model {
  public id: number;
  public home_team: number;
  public home_team_goals: number;
  public away_team: number;
  public away_team_goals: number;
  public in_progress: boolean;
}

Matchs.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  home_team: {
    type: DataTypes.INTEGER,
    references: {
      model: Clubs,
      key: 'id',
    },
  },
  home_team_goals: DataTypes.INTEGER,
  away_team: {
    type: DataTypes.INTEGER,
    references: {
      model: Clubs,
      key: 'id',
    },
  },
  away_team_goals: DataTypes.INTEGER,
  in_progress: DataTypes.TINYINT,
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
});

export default Matchs;
