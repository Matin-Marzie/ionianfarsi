import { findUserByRefreshToken, clearRefreshToken } from '../models/UserModel.js';

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // No Content

  const refreshToken = cookies.jwt;

  try {
    const foundUser = await findUserByRefreshToken(refreshToken);

    if (!foundUser) {
      // Token not found in DB but still clear cookie
      res.clearCookie('jwt', {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
      });
      return res.sendStatus(204);
    }

    // Clear refresh token from DB
    await clearRefreshToken(foundUser.username);

    res.clearCookie('jwt', {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    });
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export default { handleLogout };
