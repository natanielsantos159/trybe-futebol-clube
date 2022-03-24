import IUser from "../interfaces/IUser";
import Users from "../database/models/Users";
import UserLoginInfo from "../interfaces/UserLoginInfo";
import * as bcrypt from 'bcryptjs';

const checkPassword = (password: string, hash: string): boolean => {
  const passwordIsCorrect = bcrypt.compareSync(password, hash);
  return passwordIsCorrect;
}

const getUser = async ({ email, password }: UserLoginInfo): Promise<IUser> => {
  const defaultError = new Error("Incorrect email or password");

  const foundUser = await Users.findOne({ where: { email } });
  if (!foundUser) throw defaultError;

  if (!checkPassword(password, foundUser.password)) throw defaultError;

  const { id, role, username } = foundUser;
  return { email, id, role, username };
}

export default {
  getUser,
}