import { Router } from 'express';
import authenticateToken from '../utils/auth.js'

const contentRouter = Router();

contentRouter.get('/category/:category');
contentRouter.get('/id/:id');
contentRouter.get('/name/:name');
contentRouter.post('/upload', authenticateToken);


export default contentRouter;