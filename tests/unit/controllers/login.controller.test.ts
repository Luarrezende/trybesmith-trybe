import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import loginController from '../../../src/controller/loginController';
import loginService from '../../../src/service/loginService';
import mapStatusHTTP from '../../../src/utils/mapStatusHTTP';

chai.use(sinonChai);

describe('LoginController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('should call loginService and respond with status and data', async function () {
    const serviceResponse = {
      status: 'SUCCESSFUL',
      data: { userId: 123, token: 'exampleToken' },
    };

    sinon.stub(loginService, 'loginUser');

    await loginController.loginUser(req, res);

    expect(res.status).to.have.been.calledWith(mapStatusHTTP(serviceResponse.status));
    expect(res.json).to.have.been.calledWith(serviceResponse.data);
  });
});

