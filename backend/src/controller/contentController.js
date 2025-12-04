import { pool } from '../config/mysql.js';

export async function GetRecipesByCategory(req, res, next) {
  try {
    const category = req.params.category;

    const [result] = await pool.query('SELECT * FROM recipes WHERE category = ?;', [category]);

    if (result.length < 1) return res.status(404).json({ message: 'Category not found!' });

    const resultObject = {
      id: result[0].id,
      name: result[0].name,
      category: result[0].category,
      description: result[0].description,
      ingredients: JSON.parse(result[0].ingredients),
      instructions: JSON.parse(result[0].instructions),
    }

    return res.status(200).json(resultObject);

  } catch (error) {
    next(error);
  }
}

export async function GetRecipesById(req, res, next) {
  try {
    const id = req.params.id;

    const [result] = await pool.query('SELECT * FROM recipes WHERE id = ?;', [id]);

    if (result.length < 1) return res.status(404).json({ message: 'Category not found!' });

    const resultObject = {
      id: result[0].id,
      name: result[0].name,
      category: result[0].category,
      description: result[0].description,
      ingredients: JSON.parse(result[0].ingredients),
      instructions: JSON.parse(result[0].instructions),
    }
    return res.status(200).json(resultObject);

  } catch (error) {
    next(error);
  }
}

export async function GetRecipesByName(req, res, next) {
  try {
    const name = req.params.name;

    const [result] = await pool.query('SELECT * FROM recipes WHERE name LIKE ?;', [`%${name}%`]);

    if (result.length < 1) return res.status(404).json({ message: 'Category not found!' });

    const resultObject = {
      id: result[0].id,
      name: result[0].name,
      category: result[0].category,
      description: result[0].description,
      ingredients: JSON.parse(result[0].ingredients),
      instructions: JSON.parse(result[0].instructions),
    }
    return res.status(200).json(resultObject);
  } catch (error) {
    next(error);
  }
}

export async function UploadRecipe(req, res, next) {
  const conn = await pool.getConnection();
  try {

    const { name, description, ingredients, instructions } = req.body;

    await conn.beginTransaction();
    const [result] = await conn.query('INSERT INTO recipes (name, description, ingredients, instructions, uploader_id) VALUES (?, ?, ?, ?, ?);', [name, description, JSON.stringify(ingredients), JSON.stringify(instructions), req.user.id]);

    await conn.query('SELECT * FROM recipes WHERE id = ?;', [result.insertId]);
    await conn.commit();

    return res.status(200).json({ message: 'Uploaded successfully!' });

  } catch (error) {
    await conn.rollback();
    next(error);
  } finally {
    conn.release();
  }
}