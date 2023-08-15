import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import ProductsModel from '../../../src/database/models/product.model';

chai.use(chaiHttp);

describe('GET /products', function () { 
  beforeEach(function () { sinon.restore(); });

  it('pega tudo', async function () {
    sinon.stub(ProductsModel, 'findAll').resolves();

    const result = await chai.request(app)
      .get('/products');

    expect(result).to.have.status(200);
  });
});
