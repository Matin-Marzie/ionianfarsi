import jwt from 'jsonwebtoken';
import { findUserByUsername, updateRefreshToken, comparePassword } from '../models/UserModel.js';
import { LoginSchema } from '../validation/LoginSchema.js'

const handleLogin = async (req, res) => {
  const { error, value } = LoginSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { username, password } = req.body;

  const foundUser = await findUserByUsername(username);
  if (!foundUser) return res.status(404).json({ message: `Username ${username} not found.` });

  const match = await comparePassword(password, foundUser.password);
  if (!match) return res.status(401).json({ message: 'Incorrect password.' });

  const accessToken = jwt.sign(
    { username: foundUser.username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '1h' }
  );
  const refreshToken = jwt.sign(
    { username: foundUser.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '30d' }
  );

  await updateRefreshToken(foundUser.username, refreshToken);

  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    secure: true, // required if sameSite=None
    sameSite: 'None',
    maxAge:  30 * 24*60*60*1000 // 30 days
  });

  res.json({ accessToken });
};

export default { handleLogin };
