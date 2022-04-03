import * as sinon from 'sinon';
import * as chai from 'chai';
import 'mocha';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Sinon = require('sinon');
import { IMatch, IMatchModel, IMatchModelMock } from '../interfaces/IMatch';
import Matchs from '../database/models/Matchs';

chai.use(chaiHttp);

const { expect } = chai;

const allMatchsMock: IMatchModelMock[] = [
  {
    dataValues: {
      id: 41,
      homeTeam: 1,
      homeTeamGoals: 2,
      awayTeam: 4,
      awayTeamGoals: 0,
      inProgress: true,
    },
    getHomeClub: async function () { return { dataValues: { id: 1, clubName: 'Avaí/Kindermann'} } },
    getAwayClub: async function () { return { dataValues: { id: 4, clubName: 'Corinthians' }} },
  },
  {
    dataValues: {
      id: 42,
      homeTeam: 2,
      homeTeamGoals: 1,
      awayTeam: 3,
      awayTeamGoals: 0,
      inProgress: true,
    },
    getHomeClub: async function () { return { dataValues: {id: 2, clubName: 'Bahia' } }},
    getAwayClub: async function () { return { dataValues: {id: 3, clubName: 'Botafogo' } }},
  },
  {
    dataValues: {
      id: 43,
      homeTeam: 3,
      homeTeamGoals: 0,
      awayTeam: 2,
      awayTeamGoals: 0,
      inProgress: true,
    },
    getHomeClub: async function () { return { dataValues: {id: 3, clubName: 'Botafogo' } }},
    getAwayClub: async function () { return { dataValues: {id: 2, clubName: 'Bahia' } }},
  },
  {
    dataValues: {
      id: 44,
      homeTeam: 4,
      homeTeamGoals: 2,
      awayTeam: 1,
      awayTeamGoals: 2,
      inProgress: true,
    },
    getHomeClub: async function () { return { dataValues: { id: 4, clubName: 'Corinthians' } }},
    getAwayClub: async function () { return { dataValues: { id: 1, clubName: 'Avaí/Kindermann' } }},
  },
]

const allMatchsExpectedResponse: IMatch[] = [
  {
    id: 41,
    homeTeam: 1,
    homeTeamGoals: 2,
    awayTeam: 4,
    awayTeamGoals: 0,
    inProgress: true,
    homeClub: { clubName: 'Avaí/Kindermann' },
    awayClub: { clubName: 'Corinthians' },
  },
  {
    id: 42,
    homeTeam: 2,
    homeTeamGoals: 1,
    awayTeam: 3,
    awayTeamGoals: 0,
    inProgress: true,
    homeClub: { clubName: 'Bahia' },
    awayClub: { clubName: 'Botafogo' },
  },
  {
    id: 43,
    homeTeam: 3,
    homeTeamGoals: 0,
    awayTeam: 2,
    awayTeamGoals: 0,
    inProgress: true,
    homeClub: { clubName: 'Botafogo' },
    awayClub: { clubName: 'Bahia' },
  },
  {
    id: 44,
    homeTeam: 4,
    homeTeamGoals: 2,
    awayTeam: 1,
    awayTeamGoals: 2,
    inProgress: true,
    homeClub: { clubName: 'Corinthians' },
    awayClub: { clubName: 'Avaí/Kindermann' },
  },
]

describe('Testa a rota /matchs', () => {

  let chaiHttpResponse: Response;

  before(() => {
    sinon.stub(Matchs, 'findAll').resolves(allMatchsMock as IMatchModel[]);
  });

  after(() => {
    const matchsStub = Matchs.findAll as unknown as Sinon.SinonMock
    matchsStub.restore();
  })

  it('Testa se retorna a lista de todos os jogos', async () => {
    chaiHttpResponse = await chai.request(app).get('/matchs');

    expect(chaiHttpResponse.status).to.be.equal(200)
    expect(chaiHttpResponse.body).to.be.deep.equal(allMatchsExpectedResponse)
  })
})
