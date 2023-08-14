import OrderModel from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import { ResultDBs } from '../types/Order';

async function getAll(): Promise<ResultDBs> {
  const orders = await OrderModel.findAll({
    include: [{ model: ProductModel, attributes: ['id'], as: 'productIds' }],
  });

  const ordersAll = orders.map((order) => {
    const { id, userId, productIds } = order.dataValues;
    return {
      id, 
      userId,
      productIds: productIds?.map((product) => product.id),
    };
  });

  return {
    status: 'SUCCESSFUL',
    data: ordersAll,
  };
}

export default {
  getAll,
};