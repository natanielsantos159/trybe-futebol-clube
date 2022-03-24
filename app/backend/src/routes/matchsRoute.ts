import { Router } from "express";
import validateMatchInfo from "../middlewares/validateMatchInfo";
import matchsController from "../controllers/matchsController";
import validateJWT from "../middlewares/validateJWT";

const matchs = Router();

matchs.get('/', matchsController.getAll);

matchs.post('/', validateMatchInfo, validateJWT, matchsController.create);

matchs.patch('/matchs/:id/finish', validateJWT, matchsController.finish);

export default matchs;