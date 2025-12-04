import {Router} from 'express';
import { Login, Register } from '../controller/authController.js';
import {validateFieldCount, validateRequiredFields} from 'psgutil';

const authRouter = Router();

authRouter.post('/register', validateFieldCount(3), validateRequiredFields(['username', 'password', 'email']), Register);
authRouter.post('/login',validateFieldCount(2), validateRequiredFields(['credential', 'password']), Login);

export default authRouter;