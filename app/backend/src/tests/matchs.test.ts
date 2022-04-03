import * as sinon from 'sinon';
import * as chai from 'chai';
import 'mocha';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Sinon = require('sinon');
import { IMatch, IMatchModel, IMatchModelMock } from '../interfaces/IMatch';
import { IUserModel, IUser } from '../interfaces/IUser';
import Matchs from '../database/models/Matchs';
import Users from '../database/models/Users';
import userService from '../services/userService';
import jwtHelper from '../utils/jwtHelper';

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
    getHomeClub: async function () { return { dataValues: { id: 1, clubName: 'Avaí/Kindermann' } } },
    getAwayClub: async function () { return { dataValues: { id: 4, clubName: 'Corinthians' } } },
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
    getHomeClub: async function () { return { dataValues: { id: 2, clubName: 'Bahia' } } },
    getAwayClub: async function () { return { dataValues: { id: 3, clubName: 'Botafogo' } } },
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
    getHomeClub: async function () { return { dataValues: { id: 3, clubName: 'Botafogo' } } },
    getAwayClub: async function () { return { dataValues: { id: 2, clubName: 'Bahia' } } },
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
    getHomeClub: async function () { return { dataValues: { id: 4, clubName: 'Corinthians' } } },
    getAwayClub: async function () { return { dataValues: { id: 1, clubName: 'Avaí/Kindermann' } } },
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

const findByIdMock: IMatchModelMock = {
  dataValues: {
    id: 41,
    homeTeam: 1,
    homeTeamGoals: 2,
    awayTeam: 4,
    awayTeamGoals: 0,
    inProgress: true,
  }
};

const userMock: IUser = {
  id: 2,
  username: 'User',
  email: 'user@user.com',
  role: 'user',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'
}

const validToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJwYXNzd29yZCI6InNlY3JldF91c2VyIiwiaWF0IjoxNjQ4MDU1MTYyfQ.XNvRCWSjssL4tCvxcAGL9ZeD3TprTy8EkEKYxjHA1JM"

describe('Testa a rota GET /matchs', () => {

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


describe('Testa a rota PATCH /matchs/:id/finish', () => {

  let chaiHttpResponse: Response;

  before(() => {
    sinon.stub(Matchs, 'findByPk').resolves(findByIdMock as IMatchModel);
  });

  after(() => {
    const matchsStub = Matchs.findByPk as unknown as Sinon.SinonMock
    matchsStub.restore();
  })

  it('Testa se retorna a mensagem "Match finished." se o id for válido', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .patch('/matchs/41/finish');

    expect(chaiHttpResponse.status).to.be.equal(200)
    expect(chaiHttpResponse.body.message).to.be.equal("Match finished")
  })
})

describe('Testa a rota POST /match', () => {
  let chaiHttpResponse: Response;

  before(() => {
    sinon.stub(jwtHelper, 'verifyToken').returns({ email: 'user@user.com', password: 'secret_user' });
    sinon.stub(Users, 'findOne').resolves({ ...userMock, dataValues: userMock } as IUserModel);
    sinon.stub(userService, 'checkPassword').returns(true)
  });

  after(() => {
    const usersStub = Users.findOne as unknown as Sinon.SinonMock
    const jwtStub = jwtHelper.verifyToken as unknown as Sinon.SinonMock
    const userServiceStub = userService.checkPassword as unknown as Sinon.SinonMock
    usersStub.restore();
    jwtStub.restore();
    userServiceStub.restore();
  });

  it('retorna "It is not possible to create a match with two equal teams" se o id dos times forem iguais', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/matchs/')
      .set({ authorization: validToken })
      .send(
        {
          homeTeam: 8,
          awayTeam: 8,
          homeTeamGoals: 2,
          awayTeamGoals: 2,
          inProgress: true
        });

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.be.equal("It is not possible to create a match with two equal teams");
  })
})