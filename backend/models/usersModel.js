import db from '../config/db.js';

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

export const findUserByRefreshToken = async (token) => {
  const [rows] = await db.execute('SELECT * FROM users WHERE refresh_token = ?', [token]);
  return rows[0];
};

export const clearRefreshToken = async (username) => {
  await db.execute('UPDATE users SET refresh_token = NULL WHERE username = ?', [username]);
};

export const findUserByUsername = async (username) => {
  const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
  return rows[0];
};

export const getAllUsersPublicProfileFromDB = async () => {
  const sql_query = `SELECT id, name, username, experience, current_section, current_unit, joined_date FROM users`;
  const [rows] = await db.execute(sql_query);
  return rows;
}


export const updateUserByUsernameInDB = async (username, updates) => {
  const fields = [];

  if (updates.name !== undefined) fields.push(`name = '${updates.name}'`);
  if (updates.email !== undefined) fields.push(`email = '${updates.email}'`);
  if (updates.experience !== undefined) fields.push(`experience = ${updates.experience}`);
  if (updates.current_section !== undefined) fields.push(`current_section = ${updates.current_section}`);
  if (updates.current_unit !== undefined) fields.push(`current_unit = ${updates.current_unit}`);
  if (updates.current_repetition !== undefined) fields.push(`current_repetition = ${updates.current_repetition}`);
  if (updates.current_lesson !== undefined) fields.push(`current_lesson = ${updates.current_lesson}`);

  if (fields.length === 0) {
    throw new Error("No fields provided for update.");
  }

  const sql_query = `UPDATE users SET ${fields.join(", ")} WHERE username = '${username}'`;

  const [result] = await db.execute(sql_query);
  return result;
};


export const updateUsernameInDB = async (username, new_username, refresh_token) => {
  console.log(username, new_username)
  const [row] = await db.execute('UPDATE users SET username = ?, refresh_token = ? WHERE username = ?', [new_username, refresh_token, username])
  return row;
}


export const updatePasswordInDB = async (username, new_hashed_password) => {
  const [row] = await db.execute('UPDATE users SET password = ? WHERE username = ?', [new_hashed_password, username])
  return row;
}


export const deleteUserByUsernameFromDB = async (username) => {
  const [result] = await db.execute('DELETE FROM users WHERE username = ?', [username]);
  return result;
}

export const getUserPublicProfileFromDB = async (username) => {
  const sql_query = `
    SELECT id, name, username, experience, current_section, current_unit, joined_date 
    FROM users 
    WHERE username = ?
  `;
  const [rows] = await db.execute(sql_query, [username]);
  return rows[0]; // Return single user or undefined if not found
}