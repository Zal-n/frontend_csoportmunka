import { pool } from '../config/mysql.js';

export async function GetRecipesByCategory(req, res, next) {
  try {
    const category = req.params.category;

    const [result] = await pool.query('SELECT * FROM recipes WHERE category = ?;', [category]);

    if (result.length < 1) return res.status(404).json({ message: 'Category not found!' });

    return res.status(200).json(mapResults(result));

  } catch (error) {
    next(error);
  }
}

export async function GetRecipesById(req, res, next) {
  try {
    const id = req.params.id;

    const [result] = await pool.query('SELECT * FROM recipes WHERE id = ?;', [id]);

    if (result.length < 1) return res.status(404).json({ message: 'Recipe not found!' });

    return res.status(200).json(mapResults(result));

  } catch (error) {
    next(error);
  }
}

export async function GetRecipesByName(req, res, next) {
  try {
    const name = req.params.name;

    const [result] = await pool.query('SELECT * FROM recipes WHERE name LIKE ?;', [`%${name}%`]);

    if (result.length < 1) return res.status(404).json({ message: 'No recipe found!' });


    return res.status(200).json(mapResults(result));
  } catch (error) {
    next(error);
  }
}

export async function UploadRecipe(req, res, next) {
  const conn = await pool.getConnection();
  try {

    const { name, description, ingredients, instructions, category } = req.body;

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

function mapResults(result) {
  const resultObjects = result.map(row => ({
    id: row.id,
    name: row.name,
    category: row.category,
    description: row.description,
    ingredients: JSON.parse(row.ingredients),
    instructions: JSON.parse(row.instructions),
  }));
  return resultObjects;
}