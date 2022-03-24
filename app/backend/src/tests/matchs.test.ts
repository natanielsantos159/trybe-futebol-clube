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
    id: 41,
    homeTeam: 1,
    homeTeamGoals: 2,
    awayTeam: 4,
    awayTeamGoals: 0,
    inProgress: true,
    getHomeTeam() { return { id: this.homeTeam, clubName: 'Avaí/Kindermann' } },
    getAwayTeam() { return { id: this.awayTeam, clubName: 'Corinthians' } },
  },
  {
    id: 42,
    homeTeam: 2,
    homeTeamGoals: 1,
    awayTeam: 3,
    awayTeamGoals: 0,
    inProgress: true,
    getHomeTeam() { return { id: this.homeTeam, clubName: 'Bahia' } },
    getAwayTeam() { return { id: this.awayTeam, clubName: 'Botafogo' } },
  },
  {
    id: 43,
    homeTeam: 3,
    homeTeamGoals: 0,
    awayTeam: 2,
    awayTeamGoals: 0,
    inProgress: true,
    getHomeTeam() { return { id: this.homeTeam, clubName: 'Botafogo' } },
    getAwayTeam() { return { id: this.awayTeam, clubName: 'Bahia' } },
  },
  {
    id: 44,
    homeTeam: 4,
    homeTeamGoals: 2,
    awayTeam: 1,
    awayTeamGoals: 2,
    inProgress: true,
    getHomeTeam() { return { id: this.homeTeam, clubName: 'Corinthians' } },
    getAwayTeam() { return { id: this.awayTeam, clubName: 'Avaí/Kindermann' } },
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