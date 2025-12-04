import { pool } from '../config/mysql.js';

export function GetRecipesByCategory(req, res, next) {
  try {
    const category = req.query.category;

  } catch (error) {
    next(error);
  }
}
export function GetRecipesById(req, res, next) {
  try {
    const id = req.query.id;

  } catch (error) {
    next(error);
  }
}
export function GetRecipesByName(req, res, next) {
  try {
    const name = req.query.name;

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