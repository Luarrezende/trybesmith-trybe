import bcrypt from 'bcryptjs';
import UserModel from '../database/models/user.model';
import { UserEntry } from '../types/User';
import { Token } from '../types/token';
import { ServiceResponse } from '../types/ServiceResponse';
import JWT from '../utils/JWT';

async function loginUser(bodyValues: UserEntry): Promise<ServiceResponse<Token>> {
  const user = await UserModel.findOne({ where: { username: bodyValues.username } });

  if (!user || !bcrypt.compareSync(bodyValues.password, user.dataValues.password)) {
    return { status: 'UNAUTHORIZED', data: { message: 'Username or password invalid' } };
  }

  const { id } = user.dataValues;

  const token = JWT.jwtSing({ id });

  return { status: 'SUCCESSFUL', data: { token } };
}

export default {
  loginUser,
};