import * as fs from 'fs'
import * as jwt from 'jsonwebtoken'

const getSecret = (): string => {
  const secret: string = fs.readFileSync(process.env.JWT_SECRET_PATH as string, { encoding: 'utf-8' });
  return secret;
}
const getNewToken = (payload: jwt.JwtPayload): string => {
  const secret = getSecret();
  console.log({ secret });
  const token = jwt.sign(payload, secret);
  return token
};

const verifyToken = (token: string) => {
  const secret = getSecret();
  const payload = jwt.verify(token, secret);
  return payload;
}

export default {
  getSecret,
  getNewToken,
  verifyToken
}