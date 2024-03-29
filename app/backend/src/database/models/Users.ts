import { DataTypes, Model } from 'sequelize';
import db from '.';

class Users extends Model {
  public id: number;
  public username: string;
  public role: string;
  public email: string;
  public password: string;
}

Users.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  username: DataTypes.STRING,
  role: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
});

export default Users;
