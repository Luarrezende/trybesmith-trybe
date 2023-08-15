import { expect } from 'chai';
import sinon from 'sinon';
import OrderModel from '../../../src/database/models/order.model';
import ProductModel from '../../../src/database/models/product.model';
import orderService from '../../../src/service/ordersService';

describe('Order Service', function () {
  it('should return orders with products', async function () {
    const ordersMock = [
      {
        id: 1,
        userId: 123,
        productIds: [
          { id: 1 },
          { id: 2 },
        ],
      },
    ];

    // Crie um stub que simule o método findAll do modelo
    const findAllStub = sinon.stub(OrderModel, 'findAll');
    findAllStub.resolves(ordersMock as any);

    // Crie um stub que simule o método assoications de OrderModel
    const associationsStub = sinon.stub(OrderModel, 'associations');
    associationsStub.returns({
      productIds: {
        target: ProductModel,
        accessors: {
          get: sinon.stub().resolves([
            { id: 1 },
            { id: 2 },
          ]),
        },
      },
    });

    const result = await orderService.getAll();

    expect(result.status).to.equal('SUCCESSFUL');
    expect(result.data).to.deep.equal([
      {
        id: 1,
        userId: 123,
        productIds: [1, 2],
      },
    ]);

    findAllStub.restore();
    associationsStub.restore();
  });

  it('should return empty array if no orders found', async function () {
    const findAllStub = sinon.stub(OrderModel, 'findAll');
    findAllStub.resolves([]);

    const result = await orderService.getAll();

    expect(result.status).to.equal('SUCCESSFUL');
    expect(result.data).to.deep.equal([]);

    findAllStub.restore();
  });
});
