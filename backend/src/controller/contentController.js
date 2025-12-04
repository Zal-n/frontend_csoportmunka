import { pool } from '../config/mysql.js';
import { validateCategory, validateRecipeName } from '../utils/validation.js';

export async function GetRecipesByCategory(req, res, next) {
  try {
    const category = req.params.category;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const [countResult] = await pool.query(
      'SELECT COUNT(*) as total FROM recipes WHERE category = ?;',
      [category]
    );
    const total = countResult[0].total;

    const [result] = await pool.query(
      'SELECT * FROM recipes WHERE category = ? LIMIT ? OFFSET ?;',
      [category, limit, offset]
    );

    if (result.length < 1) return res.status(404).json({ message: 'Category not found!' });

    return res.status(200).json({
      data: mapResults(result, next),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    next(error);
  }
}

export async function GetRecipesById(req, res, next) {
  try {
    const id = req.params.id;

    const [result] = await pool.query('SELECT * FROM recipes WHERE id = ?;', [id]);

    if (result.length < 1) return res.status(404).json({ message: 'Recipe not found!' });

    return res.status(200).json(mapResults(result, next)[0]);

  } catch (error) {
    next(error);
  }
}

export async function GetRecipesByName(req, res, next) {
  try {
    const name = req.params.name;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const [countResult] = await pool.query(
      'SELECT COUNT(*) as total FROM recipes WHERE name = ?;',
      [`%${name}%`]
    );
    const total = countResult[0].total;

    const [result] = await pool.query('SELECT * FROM recipes WHERE name LIKE ? LIMIT ? OFFSET ?;', [`%${name}%`, limit, offset]);

    if (result.length < 1) return res.status(404).json({ message: 'No recipe found!' });


    return res.status(200).json({
      data: mapResults(result, next),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
}

export async function UploadRecipe(req, res, next) {
  const conn = await pool.getConnection();
  try {

    const { name, description, ingredients, instructions, category } = req.body;

    if (!validateRecipeName(name)) return res.status(400).json({ message: 'Incorrect recipe name!' });
    if (!Array.isArray(ingredients) || ingredients.length === 0) return res.status(400).json({ message: 'Ingredients must be a non-empty array!' });
    if (!Array.isArray(instructions) || instructions.length === 0) return res.status(400).json({ message: 'Instructions must be a non-empty array!' });
    if (!validateCategory(category)) return res.status(400).json({ message: 'Invalid category!' });

    await conn.beginTransaction();
    await conn.query('INSERT INTO recipes (name, description, ingredients, instructions, uploader_id, category) VALUES (?, ?, ?, ?, ?, ?);', [name, description, JSON.stringify(ingredients), JSON.stringify(instructions), req.user.id, category]);
    await conn.commit();

    return res.status(200).json({ message: 'Uploaded successfully!' });

  } catch (error) {
    await conn.rollback();
    next(error);
  } finally {
    conn.release();
  }
}

export async function GetCategories(req, res, next) {
  try {
    const [result] = await pool.query('SELECT * FROM categories ORDER BY name;');

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

function mapResults(result, next) {
  try {
    const resultObjects = result.map(row => ({
      id: row.id,
      name: row.name,
      category: row.category,
      description: row.description,
      ingredients: JSON.parse(row.ingredients),
      instructions: JSON.parse(row.instructions),
    }));
    return resultObjects;
  } catch (error) {
    next(error);
  }

}

