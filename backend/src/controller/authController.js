import { pool } from "../config/mysql.js";
import argon2 from 'argon2';
import { config } from "../config/env.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/jwt.js";
import validate from "psgutil";


export async function Register(req, res, next) {
  const { username, email, password } = req.body;

  if (!validate('username', username)) return res.status(400).json({ message: 'Incorrect username!' });
  if (!validate('email', email)) return res.status(400).json({ message: 'Incorrect email address!' });
  if (!validate('password', password)) return res.status(400).json({ message: 'Incorrect password!' });

  const conn = await pool.getConnection();
  try {

    await conn.beginTransaction();

    const [userResult] = await conn.query('SELECT id FROM users WHERE username = ? OR email = ?;', [username, email]);
    if (userResult.length > 0) {
      conn.release();
      return res.status(409).json({ message: 'User with this username or email address already exists!' });
    }

    await conn.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?);', [username, email, await argon2.hash(password)]);

    await conn.commit();
    return res.status(201).json({ message: 'Successful registration.' });

  } catch (error) {
    await conn.rollback();
    next(error);
  } finally {
    conn.release();
  }
}

export async function Login(req, res, next) {
  const { credential, password } = req.body;
  try {

    const [result] = await pool.query('SELECT username, email, password, rights FROM users WHERE username = ? OR email = ?;', [credential, credential]);

    if (result.length == 0) return res.status(400).json({ message: 'Helytelen felhasználó vagy jelszó!' });

    const user = result[0];

    if (!argon2.verify(user.password, password)) return res.status(400).json({ message: 'Helytelen felhasználó vagy jelszó!' });

    const payload = {
      username: user.username,
      id: user.id,
      rights: user.rights,
    }
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: config.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000,
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: config.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie('user', JSON.stringify(payload), {
      httpOnly: false,
      secure: config.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });


    return res.status(200).json({ message: 'Sikeres bejelentkezés', username: user.username, email: user.email });

  } catch (error) {
    next(error);
  }
}

export function Refresh(req, res, next) {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json({ message: 'Refresh Token required.' });

    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded) return res.status(401).json({ message: 'Invalid refresh token.' });

    const payload = {
      username: decoded.username,
      id: decoded.id,
      rights: decoded.rights,
    }

    const accessToken = generateAccessToken(payload);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: config.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000
    })

    return res.status(200).json({ message: 'Token refreshed.' });

  } catch (err) {
    next(err);
  }
}

export function Logout(req, res, next) {
  try {
    req.clearCookie('accessToken');
    req.clearCookie('refreshToken');
    return res.status(200).json({ message: 'Logged out successfully!' });
  } catch (error) {
    next(error);
  }
}