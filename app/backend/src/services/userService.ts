import IUser from "../interfaces/IUser";
import Users from "../database/models/Users";
import UserLoginInfo from "../interfaces/UserLoginInfo";
import * as bcrypt from 'bcryptjs';

const getUser = async ({ email, password }: UserLoginInfo): Promise<IUser> => {
  const defaultError = new Error("Incorrect email or password");

  const foundUser = await Users.findOne({ where: { email } });
  if (!foundUser) throw defaultError;

  const passwordIsCorrect = bcrypt.compareSync(password, foundUser.password);
  if (!passwordIsCorrect) throw defaultError;

  const { id, role, username } = foundUser;
  return { email, id, role, username };
}

export default {
  getUser,
}