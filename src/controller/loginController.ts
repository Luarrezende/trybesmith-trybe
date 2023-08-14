import { Request, Response } from 'express';
import loginService from '../service/loginService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

async function loginUser(req: Request, res: Response): Promise<Response> {
  const bodyValues = req.body;
  console.log(bodyValues);

  const serviceResponse = await loginService.loginUser(bodyValues);

  return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
}

export default {
  loginUser,
};