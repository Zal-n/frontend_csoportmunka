import {Router} from 'Express';
import { Login, Register } from '../controller/authController';

const authRouter = Router();

authRouter.post('/register', Register());
authRouter.post('/login', Login());

export default authRouter;