import { Router } from "express";
import clubsController from "../controllers/clubsController";

const clubs = Router();

clubs.get('/', clubsController.getAll);

export default clubs;