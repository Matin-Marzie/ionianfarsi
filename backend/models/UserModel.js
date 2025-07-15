import db from '../config/db.js';
import bcrypt from 'bcrypt';

export const findUserByUsername = async (username) => {
  const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
  return rows[0];
};

export const updateRefreshToken = async (username, refreshToken) => {
  await db.execute('UPDATE users SET refresh_token = ? WHERE username = ?', [refreshToken, username]);
};

export const createUser = async (name, username, passwordHash) => {
  const [result] = await db.execute(
    'INSERT INTO users (name, username, password) VALUES (?, ?, ?)',
    [name, username, passwordHash]
  );
  return result.insertId;
};

export const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export const findUserByRefreshToken = async (token) => {
  const [rows] = await db.execute('SELECT * FROM users WHERE refresh_token = ?', [token]);
  return rows[0];
};

export const clearRefreshToken = async (username) => {
  await db.execute('UPDATE users SET refresh_token = NULL WHERE username = ?', [username]);
};
