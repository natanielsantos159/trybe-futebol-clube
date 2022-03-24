import { DataTypes, Model } from 'sequelize';
import db from '.';
import Clubs from './Clubs';

class Matchs extends Model {
  [x: string]: any;
  public id: number;
  public homeTeam: number;
  public homeTeamGoals: number;
  public awayTeam: number;
  public awayTeamGoals: number;
  public inProgress: boolean;
}

Matchs.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  homeTeam: {
    field: 'home_team',
    type: DataTypes.INTEGER,
    references: {
      model: Clubs,
      key: 'id',
    },
  },
  homeTeamGoals: {
    field: 'home_team_goals',
    type: DataTypes.INTEGER
  },
  awayTeam: {
    field: 'away_team',
    type: DataTypes.INTEGER,
    references: {
      model: Clubs,
      key: 'id',
    },
  },
  awayTeamGoals: {
    field: 'away_team_goals',
    type: DataTypes.INTEGER
  },
  inProgress: {
    field: 'in_progress',
    type: DataTypes.TINYINT
  },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
});

export default Matchs;
