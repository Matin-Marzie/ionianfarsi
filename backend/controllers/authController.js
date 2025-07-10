import jwt from 'jsonwebtoken';
import { findUserByUsername, updateRefreshToken, comparePassword } from '../models/UserModel.js';

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Username and password are required.' });

  const foundUser = await findUserByUsername(username);
  if (!foundUser) return res.status(401).json({ message: `Username ${username} not found.` });

  const match = await comparePassword(password, foundUser.password);
  if (!match) return res.status(401).json({ message: 'Incorrect password.' });

  const accessToken = jwt.sign(
    { username: foundUser.username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '30m' }
  );
  const refreshToken = jwt.sign(
    { username: foundUser.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '14d' }
  );

  await updateRefreshToken(foundUser.username, refreshToken);

  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    // secure: true, // uncomment on production with HTTPS
    sameSite: 'None',
    maxAge: 14 * 24 * 60 * 60 * 1000 // 14 days
  });

  res.json({ accessToken });
};

export default { handleLogin };
