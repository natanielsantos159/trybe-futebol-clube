import IUser from "../interfaces/IUser";
import Users from "../database/models/Users";
import UserLoginInfo from "../interfaces/UserLoginInfo";

const getUser = async ({ email, password }: UserLoginInfo): Promise<IUser | null> => {
  const foundUser = await Users.findOne({ where: { email, password } });
  if (foundUser) {
    const { email, id, role, username } = foundUser;
    return { email, id, role, username };
  }
  return foundUser;
}

export default {
  getUser,
}