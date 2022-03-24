import * as express from 'express';
import validateJWT from '../middlewares/validateJWT';
import loginController from '../controllers/loginController'
import validateLoginInfo from '../middlewares/validateLoginInfo'

const login = express.Router();

login.post('/', validateLoginInfo, loginController.login);

login.get('/validate', validateJWT, loginController.validate)

export default login;