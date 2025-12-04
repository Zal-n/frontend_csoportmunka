export function validateRecipeName(input) {
  const regex = /^[\p{L}0-9' ]{1,40}$/u;

  return regex.test(input);
}

export async function validateCategory(category) {
  try {
    const [result] = await pool.query(
      'SELECT id FROM categories WHERE name = ?;',
      [category]
    );
    return result.length > 0;
  } catch (error) {
    return false;
  }
}
