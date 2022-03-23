import { Router } from "express";
import clubsController from "../controllers/clubsController";

const clubs = Router();

clubs.get('/', clubsController.getAll);

clubs.get('/:id', clubsController.getById);

export default clubs;