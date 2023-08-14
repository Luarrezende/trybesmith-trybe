import { Request, Response } from 'express';
import ordersService from '../service/ordersService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

async function getAll(req: Request, res: Response): Promise<Response> {
  const serviceResponse = await ordersService.getAll();

  return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
}

export default {
  getAll,
};
