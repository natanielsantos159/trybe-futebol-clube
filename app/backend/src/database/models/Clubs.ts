import { DataTypes, Model } from 'sequelize';
import db from '.';
import Matchs from './Matchs';

class Clubs extends Model {
  public club_name: string;
}

Clubs.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  club_name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
});

Clubs.hasMany(Matchs,{ foreignKey: 'home_team', as: 'homeTeam' });
Clubs.hasMany(Matchs,{ foreignKey: 'away_team', as: 'awayTeam' });

export default Clubs;
