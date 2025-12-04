import { Router } from 'express';
import {authenticateToken} from '../utils/auth.js'
import { validateFieldCount, validateRequiredFields } from 'psgutil';
import { GetRecipesByCategory, GetRecipesById, GetRecipesByName, UploadRecipe, GetCategories } from '../controller/contentController.js';

const contentRouter = Router();

/**
 * @swagger
 * /content/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Content]
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
contentRouter.get('/categories', GetCategories);

/**
 * @swagger
 * /content/category/{category}:
 *   get:
 *     summary: Get recipes by category
 *     tags: [Content]
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *         description: Category name
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Items per page
 *     responses:
 *       200:
 *         description: Paginated recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Recipe'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     total:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
contentRouter.get('/category/:category', GetRecipesByCategory);

/**
 * @swagger
 * /content/id/{id}:
 *   get:
 *     summary: Get recipe by ID
 *     tags: [Content]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Recipe ID
 *     responses:
 *       200:
 *         description: Recipe details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       404:
 *         description: Recipe not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
contentRouter.get('/id/:id', GetRecipesById);

/**
 * @swagger
 * /content/name/{name}:
 *   get:
 *     summary: Search recipes by name
 *     tags: [Content]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Recipe name to search for
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Items per page
 *     responses:
 *       200:
 *         description: Paginated search results
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Recipe'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     total:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *       404:
 *         description: No recipes found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
contentRouter.get('/name/:name', GetRecipesByName);

/**
 * @swagger
 * /content/upload:
 *   post:
 *     summary: Upload a new recipe
 *     tags: [Content]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - ingredients
 *               - category
 *               - description
 *               - instructions
 *             properties:
 *               name:
 *                 type: string
 *                 description: Recipe name
 *               description:
 *                 type: string
 *                 description: Recipe description
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of ingredients
 *               instructions:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of instructions
 *               category:
 *                 type: string
 *                 description: Recipe category
 *     responses:
 *       200:
 *         description: Recipe uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
contentRouter.post('/upload', validateFieldCount(5), validateRequiredFields(['name', 'ingredients', 'category', 'description', 'instructions']), authenticateToken, UploadRecipe);

export default contentRouter;