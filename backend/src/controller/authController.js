
export async function Register(req, res, next) {
  try {

    return res.status(200).json({ message: 'Sikeres regisztráció'});
  } catch (error) {
    next(error);
  }
}
export function Login(req, res, next) {
  try {

    return res.status(200).json({ message: 'Sikeres bejelentkezés', username: 'admin', email: 'test@test.com'});
  } catch (error) {
    next(error);
  }
}