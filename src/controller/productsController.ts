import { Request, Response } from 'express';
import productsService from '../service/productsService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

async function createProduct(req: Request, res: Response): Promise<Response> {
  const bodyValues = req.body;

  const serviceResponse = await productsService.createProduct(bodyValues);

  return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
}

async function getAll(req: Request, res: Response): Promise<Response> {
  const serviceResponse = await productsService.getAll();

  return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
}

export default {
  createProduct,
  getAll,
};
