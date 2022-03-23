import * as sinon from 'sinon';
import * as chai from 'chai';
import 'mocha';
import chaiHttp = require('chai-http');

import { app } from '../app';
import jwtHelper from '../utils/jwtHelper'

import { Response } from 'superagent';
import Sinon = require('sinon');
import Users from '../database/models/Users';

chai.use(chaiHttp);

const { expect } = chai;

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

const validToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJwYXNzd29yZCI6InNlY3JldF91c2VyIiwiaWF0IjoxNjQ4MDU1MTYyfQ.XNvRCWSjssL4tCvxcAGL9ZeD3TprTy8EkEKYxjHA1JM"

describe('Testa a rota /login', () => {

  let chaiHttpResponse: Response;

  before(() => {
    console.log('cheguei')
    sinon
      .stub(Users, 'findOne')
      .resolves(usersMock.user as Users);

    sinon
      .stub(jwtHelper, 'getNewToken')
      .returns(validToken);
  })

  after(() => {
    const usersStub = Users.findOne as unknown as Sinon.SinonMock;
    usersStub.restore();
    const jwtStub = jwtHelper.getNewToken as unknown as Sinon.SinonMock;;
    jwtStub.restore();
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
    expect(chaiHttpResponse.body.token).to.be.equal(validToken);
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

describe('Testa a rota /login/validate', () => {

  let chaiHttpResponse: Response;

  const callWithHeader = async (header: object) => {
    chaiHttpResponse = await chai
    .request(app)
    .get('/login/validate')
    .set(header)
  }

  it('deve retornar erro quando o token for vazio', async () =>{
    await callWithHeader({ authorization: '' });


    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.be.equal('Invalid token');
  });

  it('deve retornar erro quando não houver token no header', async () =>{
    await callWithHeader({});

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.be.equal('Invalid token');
  });

  it("deve retornar o role 'user' do usuario quando o token for válido e o usuario não for admin", async () => {

    await callWithHeader({ authorization: validToken });
    
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.text).to.be.equal('user');
  })
})