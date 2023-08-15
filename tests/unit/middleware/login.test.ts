import { expect } from 'chai';
import sinon from 'sinon';
import { Request, Response, NextFunction } from 'express';
import loginM from '../../../src/middleware/login';

describe('Validation Middlewares', () => {
  let req: Request, res: Response, next: NextFunction;

  beforeEach(() => {
    req = { body: {} } as Request;
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    } as unknown as Response;
    next = sinon.spy() as NextFunction;
  });

  it('should return 400 if username is missing', async () => {
    await loginM.usernameV(req, res, next);

    expect(res.status(400)).to.be.true;
    expect(res.json({ message: '"username" and "password" are required' })).to.be.true;
    expect(next).to.be.false;
  });

  it('should return 400 if password is missing', async () => {
    await loginM.passwordV(req, res, next);

    expect(res.status(400)).to.be.true;
    expect(res.json({ message: '"username" and "password" are required' })).to.be.true;
    expect(next).to.be.false;
  });

  it('should call next() if both username and password are present', async () => {
    req.body.username = 'someusername';
    req.body.password = 'somepassword';

    await loginM.usernameV(req, res, next);
    await loginM.passwordV(req, res, next);

    expect(res.status).to.be.false;
    expect(res.json).to.be.false;
    expect(next).to.be.true;
  });
});