import { Router } from 'express';
import { Login, Logout, Refresh, Register } from '../controllers/authController.js';
import { validateFieldCount, validateRequiredFields } from 'psgutil';

const authRouter = Router();

authRouter.post('/register', validateFieldCount(3), validateRequiredFields(['username', 'password', 'email']), Register);
authRouter.post('/login', validateFieldCount(2), validateRequiredFields(['credential', 'password']), Login);
authRouter.post('/refresh', Refresh);
authRouter.post('/logout', Logout);

export default authRouter;