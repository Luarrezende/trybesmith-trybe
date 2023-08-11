import { expect } from 'chai';
import sinon from 'sinon';
import ProductModel from '../../../src/database/models/product.model';
import productsService from '../../../src/service/productsService';

describe('ProductsService', function () {

  beforeEach(function () { sinon.restore(); });

  it('should handle product creation error', async function () {
    const createStub = sinon.stub(ProductModel, 'create');
    createStub.rejects(new Error('Database error'));

    const result = await productsService.createProduct({
      id: 1,
      name: 'Mesa',
      price: '55.99',
      orderId: 1,
    });

    expect(result).to.deep.equal({
      status: 'INVALID_DATA',
      data: { message: 'Could not create product' },
    });
  });
});
