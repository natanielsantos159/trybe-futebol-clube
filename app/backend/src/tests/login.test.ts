import * as sinon from 'sinon';
import * as chai from 'chai';
import 'mocha';
import chaiHttp = require('chai-http');

import { app } from '../app';
import jwtHelper from '../utils/jwtHelper'
import loginRoute from '../routes/loginRoute';

import { Response } from 'superagent';
import Sinon = require('sinon');
import Users from '../database/models/Users';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota /login', () => {

  let chaiHttpResponse: Response;

  const usersMock = {
    user: {
      id: 2,
      username: 'User',
      role: 'user',
      email: 'user@user.com',
      password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'
    },
    admin: {
      id: 1,
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
      password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
    }
  }

  const usersMockDecodedPasswords = {
    user: {
      decodedPassword: 'secret_user',
    },
    admin: {
      decodedPassword: 'secret_admin',
    }
  }

  const expectedToken = 'tokenfalse';

  before(() => {
    console.log('cheguei')
    sinon
      .stub(Users, 'findOne')
      .resolves(usersMock.user as Users);

    sinon
      .stub(jwtHelper, 'getNewToken')
      .returns(expectedToken);
  })

  after(() => {
    const usersStub = Users.findOne as unknown as Sinon.SinonMock;
    usersStub.restore();
  })

  it('retorna erro quando passa informações de usuário não cadastrado', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'test@example.com', password: 'test1234' })

    expect(chaiHttpResponse.status).equal(401);
    expect(chaiHttpResponse.body.message).equal('Incorrect email or password');
  });

  it('retorna um token e informações do usuario quando é feito login de um usuário normal', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: usersMock.user.email, password: usersMockDecodedPasswords.user.decodedPassword })

    expect(chaiHttpResponse.status).equal(200);
    expect(chaiHttpResponse.body).to.be.an('object');
    expect(chaiHttpResponse.body).to.be.have.keys(['user', 'token']);
    expect(chaiHttpResponse.body.user).to.be.have.keys(['email', 'id', 'role', 'username']);
    expect(chaiHttpResponse.body.user.email).to.be.an('string');
    expect(chaiHttpResponse.body.user.email).to.be.equal(usersMock.user.email);
    expect(chaiHttpResponse.body.user.id).to.be.an('number');
    expect(chaiHttpResponse.body.user.id).to.be.equal(usersMock.user.id);
    expect(chaiHttpResponse.body.user.username).to.be.an('string');
    expect(chaiHttpResponse.body.user.username).to.be.equal(usersMock.user.username);
    expect(chaiHttpResponse.body.user.role).to.be.an('string');
    expect(chaiHttpResponse.body.user.role).to.be.equal(usersMock.user.role);

  });
});
