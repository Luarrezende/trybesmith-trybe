import ProductModel from '../database/models/product.model';
import { Product } from '../types/Product';
import { ServiceResponse, ServiceResponseError } from '../types/ServiceResponse';

async function createProduct(bodyValues: Product): Promise<ServiceResponse<Product>> {
  try {
    const createdProduct = await ProductModel.create(bodyValues);

    return {
      status: 'CREATED',
      data: createdProduct.dataValues,
    };
  } catch (error) {
    console.error('Error creating product:', error);
    const serviceResponseError: ServiceResponse<ServiceResponseError> = {
      status: 'INVALID_DATA',
      data: { message: 'Could not create product' },
    };
    return serviceResponseError;
  }
}

export default {
  createProduct,
};