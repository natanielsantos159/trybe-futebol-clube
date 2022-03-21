import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/Users';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota /login', () => {

  let chaiHttpResponse: Response;

  it('retorna erro quando passa informações de usuário não cadastrado', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({ email: 'test@example.com', password: 'test1234'})

    expect(chaiHttpResponse.status).equal(404);
    expect(chaiHttpResponse.error).equal('Incorrect email or password');
  });

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });
});
