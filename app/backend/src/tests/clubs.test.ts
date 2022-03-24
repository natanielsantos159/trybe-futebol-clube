import * as sinon from 'sinon';
import * as chai from 'chai';
import 'mocha';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Sinon = require('sinon');
import Clubs from '../database/models/Clubs';
import { IClub, IClubModel } from '../interfaces/IClub';

chai.use(chaiHttp);

const { expect } = chai;

const clubsMock: IClub[] = [{
  id: 1,
  clubName: "Avaí/Kindermann"
},
{
  id: 2,
  clubName: "Bahia"
},
{
  id: 3,
  clubName: "Botafogo"
},
{
  id: 4,
  clubName: "Corinthians"
},
{
  id: 5,
  clubName: "Cruzeiro"
},
{
  id: 6,
  clubName: "Ferroviária"
},
{
  id: 7,
  clubName: "Flamengo"
},
{
  id: 8,
  clubName: "Grêmio"
},
{
  id: 9,
  clubName: "Internacional"
},
{
  id: 10,
  clubName: "Minas Brasília"
}]

describe('Testa a rota /clubs', () => {

  let chaiHttpResponse: Response;

  before(() => {
    sinon.stub(Clubs, 'findAll')
      .resolves(clubsMock as IClubModel[]);

    sinon.stub(Clubs, 'findOne')
      .withArgs({ where: { id: 2 } })
      .resolves(clubsMock[1] as IClubModel)
      .withArgs({ where: { id: 5 } })
      .resolves(clubsMock[4] as IClubModel);
  });

  after(() => {
    const clubsFindAllStub = Clubs.findAll as unknown as Sinon.SinonMock;
    clubsFindAllStub.restore();
    const clubsFindOneStub = Clubs.findOne as unknown as Sinon.SinonMock;
    clubsFindOneStub.restore();
  });

  it('Deve retornar uma lista de times', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/clubs')

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(clubsMock);
  });

  it('ao passar um id como parametro deve retornar apenas um time com aquele id', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/clubs/2')

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(clubsMock[1]);

    chaiHttpResponse = await chai
      .request(app)
      .get('/clubs/5')

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(clubsMock[4]);
  });
})