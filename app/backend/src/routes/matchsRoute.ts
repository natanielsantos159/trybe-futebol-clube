import { Router } from "express";
import matchsController from "../controllers/matchsController";

const matchs = Router();

matchs.get('/', matchsController.getAll);

export default matchs;