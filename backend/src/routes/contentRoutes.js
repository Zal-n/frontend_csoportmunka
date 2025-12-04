import { Router } from 'express';
import {authenticateToken} from '../utils/auth.js'
import { validateFieldCount, validateRequiredFields } from 'psgutil';
import { GetRecipesByCategory, GetRecipesById, GetRecipesByName, UploadRecipe } from '../controller/contentController.js';

const contentRouter = Router();

contentRouter.get('/category/:category', GetRecipesByCategory);
contentRouter.get('/id/:id', GetRecipesById);
contentRouter.get('/name/:name', GetRecipesByName);
contentRouter.post('/upload', validateFieldCount(4), validateRequiredFields(['name', 'ingredients', 'description', 'instructions']), authenticateToken, UploadRecipe);


export default contentRouter;