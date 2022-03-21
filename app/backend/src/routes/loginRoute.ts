import * as express from 'express';
import loginController from '../controllers/loginController'
import validateLoginInfo from '../middlewares/validateLoginInfo'

const login = express.Router();

login.post('/', validateLoginInfo, loginController.login);

export default login;