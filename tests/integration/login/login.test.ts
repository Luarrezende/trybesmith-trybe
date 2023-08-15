import sinon from 'sinon';
import chai, { expect } from 'chai';
import app from '../../../src/app';
import chaiHttp from 'chai-http';
import UserModel from '../../../src/database/models/user.model';
import mockLogin from '../../mocks/mockLogin';
  

chai.use(chaiHttp);

describe('POST /login', function () { 
  beforeEach(function () { sinon.restore(); });

  it('sem nome sem login', async function() {
    const result = await chai.request(app)
    .post('/login')
    .send(mockLogin.semUser);

    expect(result).to.have.status(400);
  })

  it('sem senha sem login', async function () {
    const result = await chai.request(app)
      .post('/login')
      .send(mockLogin.semPass);

    expect(result).to.have.status(400);
  });

  it('faz o registro pra logar', async function () {
    sinon.stub(UserModel, 'findOne').resolves(null);
    const result = await chai.request(app)
      .post('/login')
      .send(mockLogin.usuarioSumido);

    expect(result).to.have.status(401);
  });

  it('retorna o token q esse existe', async function () {
    const loginS = UserModel.build(mockLogin.aquiTem);
    sinon.stub(UserModel, 'findOne').resolves(loginS);
    const result = await chai.request(app)
      .post('/login')
      .send(mockLogin.esseExiste);

    expect(result).to.have.status(200);
  });
});
