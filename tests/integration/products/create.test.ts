import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import ProductModel from '../../../src/database/models/product.model';
import app from '../../../src/app'

chai.use(chaiHttp);

describe('POST /products', function () { 
  beforeEach(function () { sinon.restore(); });
  it('teste camada Post', async function() {

    const mockProduct = { name: 'Mesa', price: '90.65', orderId: 8 }
    const productBuild = ProductModel.build(mockProduct)
    
    sinon.stub(ProductModel, 'create').resolves(productBuild)
    const response = await chai.request(app).post('/products').send(mockProduct)

    expect(response.body).to.be.an('object')
    expect(response.status).to.be.equal(201)
  })
});