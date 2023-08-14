import jwt from 'jsonwebtoken';
import { Typeid } from '../types/typeJWT';

const secret = process.env.JWT_SECRET || 'secret';

function jwtSing(payload: Typeid): string {
  const token = jwt.sign(payload, secret);
  return token;
}

export default {
  jwtSing,
};