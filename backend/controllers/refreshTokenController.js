import jwt from 'jsonwebtoken';
import { findUserByRefreshToken } from '../models/usersModel.js';

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401); // Unauthorized

  const refreshToken = cookies.jwt;

  try {
    const foundUser = await findUserByRefreshToken(refreshToken);
    if (!foundUser) return res.sendStatus(403); // Forbidden

    const { password:pass, refresh_token, ...safeUserInfo } = foundUser;

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || foundUser.username !== decoded.username) {
          return res.sendStatus(403);
        }

        const accessToken = jwt.sign(
          { username: decoded.username },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '1h' }
        );

        res.json({ accessToken, user: safeUserInfo });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export default { handleRefreshToken };
