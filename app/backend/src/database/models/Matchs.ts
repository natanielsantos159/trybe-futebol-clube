import { DataTypes, Model } from 'sequelize';
import db from '.';
import Clubs from './Clubs';

class Matchs extends Model {
  public id: number;
  public home_team: string;
  public home_team_goals: string;
  public away_team: string;
  public away_team_goals: string;
  public in_progress: boolean;
}

Matchs.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  home_team: {
    type: DataTypes.STRING,
    references: {
      model: Clubs,
      key: 'id',
    },
  },
  home_team_goals: DataTypes.STRING,
  away_team: {
    type: DataTypes.STRING,
    references: {
      model: Clubs,
      key: 'id',
    },
  },
  in_progress: DataTypes.TINYINT,
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
});

Matchs.belongsTo(Clubs, { foreignKey: 'home_team', as: 'homeTeam' });
Matchs.belongsTo(Clubs, { foreignKey: 'away_team', as: 'awayTeam' });

export default Matchs;
