import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import OrderModel from '../../../src/database/models/order.model';
import OrdersMock from '../../mocks/mockOrder';

chai.use(chaiHttp);

describe('GET /orders', function () { 
  beforeEach(function () { sinon.restore(); });

  it('lista tudo', async function () {
    const OrderInstance = OrdersMock.OrdersMock.map((order) => OrderModel.build(order))
    sinon.stub(OrderModel, 'findAll').resolves(OrderInstance);

    const result = await chai.request(app)
      .get('/orders');
      
    expect(result).to.have.status(200);
  });

});
