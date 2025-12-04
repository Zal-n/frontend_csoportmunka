import { Router } from 'express';
import {authenticateToken} from '../utils/auth.js'
import { validateFieldCount, validateRequiredFields } from 'psgutil';
import { GetRecipesByCategory, GetRecipesById, GetRecipesByName, UploadRecipe, GetCategories } from '../controller/contentController.js';

const contentRouter = Router();

contentRouter.get('/category/:category', GetRecipesByCategory);
contentRouter.get('/id/:id', GetRecipesById);
contentRouter.get('/name/:name', GetRecipesByName);
contentRouter.post('/upload', validateFieldCount(5), validateRequiredFields(['name', 'ingredients', 'category', 'description', 'instructions']), authenticateToken, UploadRecipe);
contentRouter.get('/categories', GetCategories);

export default contentRouter;