import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import productsController from '../../../src/controller/productsController';
import productsService from '../../../src/service/productsService';

chai.use(sinonChai);

describe('ProductsController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Deve criar um produto com sucesso', async function () {
    req.body = {
      name: 'mesa',
      price: '55.99',
      orderId: 1,
    };

    const createProductStub = sinon.stub(productsService, 'createProduct');
    createProductStub.resolves({
      status: 'CREATED',
      data: {
        id: 1,
        name: 'mesa',
        price: '55.99',
        orderId: 1,
      },
    });

    await productsController.createProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith({
      id: 1,
      name: 'mesa',
      price: '55.99',
      orderId: 1,
    });

    createProductStub.restore();
  });
});
