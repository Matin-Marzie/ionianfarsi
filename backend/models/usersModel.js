import db from '../config/db.js';

export const updateRefreshToken = async (username, refreshToken) => {
  await db.execute('UPDATE users SET refresh_token = ?, last_login = NOW() WHERE username = ?', [refreshToken, username]);
};

export const createUser = async (name, username, passwordHash) => {
  const [result] = await db.execute(
    'INSERT INTO users (name, username, password, last_login, joined_date) VALUES (?, ?, ?, NOW(), NOW())',
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
  const sql_query = `SELECT id, name, username, experience, level, profile_picture_url, section_id, unit_id, joined_date FROM users ORDER BY experience DESC`;
  const [rows] = await db.execute(sql_query);
  return rows;
}

export const getUserPublicProfileFromDB = async (username) => {
  const sql_query = `
    SELECT id, name, username, experience, level, profile_picture_url, unit_id, joined_date 
    FROM users 
    WHERE username = ?
  `;
  const [rows] = await db.execute(sql_query, [username]);
  return rows[0]; // Return single user or undefined if not found
}

export const updateUserByUsernameInDB = async (username, updates) => {
  const fields = [];

  if (updates.name !== undefined) fields.push(`name = '${updates.name}'`);
  if (updates.email !== undefined) fields.push(`email = '${updates.email}'`);
  if (updates.experience !== undefined) fields.push(`experience = ${updates.experience}`);
  if (updates.level !== undefined) fields.push(`level = ${updates.level}`);
  if (updates.coin !== undefined) fields.push(`coin = ${updates.coin}`);
  if (updates.energy !== undefined) fields.push(`energy = ${updates.energy}`);
  if (updates.section_id !== undefined) fields.push(`section_id = ${updates.section_id}`);
  if (updates.unit_id !== undefined) fields.push(`unit_id = ${updates.unit_id}`);
  if (updates.repetition_id !== undefined) fields.push(`repetition_id = ${updates.repetition_id}`);
  if (updates.lesson_id !== undefined) fields.push(`lesson_id = ${updates.lesson_id}`);

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

// ============================================
// Google OAuth Related Functions
// ============================================

/**
 * Find user by Google ID
 */
export const findUserByGoogleId = async (googleId) => {
  const [rows] = await db.execute('SELECT * FROM users WHERE google_id = ?', [googleId]);
  return rows[0];
};

/**
 * Find user by email
 */
export const findUserByEmail = async (email) => {
  const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

/**
 * Create user with Google OAuth data
 */
export const createGoogleUser = async (googleUserData) => {
  const {
    googleId,
    email,
    firstName,
    lastName,
    name,
    username,
    profilePicture
  } = googleUserData;

  const [result] = await db.execute(
    `INSERT INTO users 
    (google_id, email, first_name, last_name, name, username, password, profile_picture_url, last_login, joined_date) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
    [
      googleId,
      email,
      firstName || null,
      lastName || null,
      name || null,
      username,
      profilePicture || null
    ]
  );
  
  return result.insertId;
};

/**
 * Update user's last login time and refresh token
 */
export const updateUserLastLogin = async (username, refreshToken) => {
  await db.execute(
    'UPDATE users SET last_login = NOW(), refresh_token = ? WHERE username = ?',
    [refreshToken, username]
  );
};

/**
 * Check if username exists
 */
export const usernameExists = async (username) => {
  const [rows] = await db.execute('SELECT id FROM users WHERE username = ?', [username]);
  return rows.length > 0;
};