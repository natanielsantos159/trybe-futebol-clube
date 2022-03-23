import * as sinon from 'sinon';
import * as chai from 'chai';
import 'mocha';
import chaiHttp = require('chai-http');

import { app } from '../app';
import jwtHelper from '../utils/jwtHelper'

import { Response } from 'superagent';
import Sinon = require('sinon');
import Clubs from '../database/models/Clubs';
import { IClub, IClubModel } from '../interfaces/IClub';

chai.use(chaiHttp);

const { expect } = chai;

const clubsMock: IClub[] = [{
  id: 1,
  club_name: "Avaí/Kindermann"
},
{
  id: 2,
  club_name: "Bahia"
},
{
  id: 3,
  club_name: "Botafogo"
},
{
  id: 4,
  club_name: "Corinthians"
},
{
  id: 5,
  club_name: "Cruzeiro"
},
{
  id: 6,
  club_name: "Ferroviária"
},
{
  id: 7,
  club_name: "Flamengo"
},
{
  id: 8,
  club_name: "Grêmio"
},
{
  id: 9,
  club_name: "Internacional"
},
{
  id: 10,
  club_name: "Minas Brasília"
}]

const clubsExpectedResponse = [{
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
    sinon.stub(Clubs, 'findAll').resolves(clubsMock as IClubModel[]);
  });

  after(() => {
    const clubsStub = Clubs.findAll as unknown as Sinon.SinonMock;
    clubsStub.restore();
  });

  it('Deve retornar uma lista de times', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/clubs')

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(clubsExpectedResponse);
  });

  it('ao passar um id como parametro deve retornar apenas um time com aquele id', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/clubs/2')

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(clubsExpectedResponse[1]);

    chaiHttpResponse = await chai
      .request(app)
      .get('/clubs/5')

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(clubsExpectedResponse[4]);
  });
})