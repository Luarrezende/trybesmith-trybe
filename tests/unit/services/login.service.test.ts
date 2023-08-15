import { expect } from 'chai';
import sinon from 'sinon';
import bcrypt from 'bcryptjs';
import UserModel from '../../../src/database/models/user.model';
import loginService from '../../../src/service/loginService';
import JWT from '../../../src/utils/JWT';

describe('Login Service', function () {
  it('should return UNAUTHORIZED for invalid username', async function () {
    const findOneStub = sinon.stub(UserModel, 'findOne');
    findOneStub.resolves(null);

    const bodyValues = { username: 'nonexistent', password: 'password' };
    const result = await loginService.loginUser(bodyValues);

    expect(result).to.deep.equal({
      status: 'UNAUTHORIZED',
      data: { message: 'Username or password invalid' },
    });

    findOneStub.restore();
  });

  it('should return UNAUTHORIZED for invalid password', async function () {
    const findOneStub = sinon.stub(UserModel, 'findOne');

    // Simulando um usuário encontrado
    const userInstance = {
      dataValues: {
        password: bcrypt.hashSync('correctpassword', 10),
      },
    };

    findOneStub.resolves(userInstance as any);

    const bodyValues = { username: 'existinguser', password: 'wrongpassword' };
    const result = await loginService.loginUser(bodyValues);

    expect(result).to.deep.equal({
      status: 'UNAUTHORIZED',
      data: { message: 'Username or password invalid' },
    });

    findOneStub.restore();
  });

  it('should return SUCCESSFUL and token for valid credentials', async function () {
    const userModelStub = sinon.createStubInstance(UserModel);
    
    userModelStub.findOne.resolves({
      id: 123,
      password: bcrypt.hashSync('correctpassword', 10),
    });

    const jwtSignStub = sinon.stub(JWT, 'jwtSing');
    jwtSignStub.returns('exampleToken');

    const findOneStub = sinon.stub(UserModel, 'findOne');
    findOneStub.resolves(userModelStub);

    const bodyValues = { username: 'existinguser', password: 'correctpassword' };
    const result = await loginService.loginUser(bodyValues);

    expect(result).to.deep.equal({
      status: 'SUCCESSFUL',
      data: { token: 'exampleToken' },
    });

    findOneStub.restore();
    jwtSignStub.restore();
  });
});
