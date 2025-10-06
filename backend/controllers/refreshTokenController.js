import jwt from 'jsonwebtoken';
import { findUserByRefreshToken } from '../models/usersModel.js';

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(401).json({ message: 'No jwt cookie' }); // Unauthorized

  const refreshToken = cookies.jwt;

  try {
    const foundUser = await findUserByRefreshToken(refreshToken);

    if (!foundUser) {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true
      });
      return res.sendStatus(403); // Forbidden
    }


    const { password, refresh_token, section_id, unit_id, repetition_id, lesson_id, ...safeUserInfo } = foundUser;

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || foundUser.username !== decoded.username) {

          res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "None",
            secure: true
          });
          
          return res.sendStatus(403);
        }

        const accessToken = jwt.sign(
          { username: decoded.username },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '1h' }
        );

        res.json({
           accessToken, 
           user: {
            ...safeUserInfo,
            section: {section_id},
            unit: {unit_id},
            repetition: {repetition_id},
            lesson: {lesson_id}
          }});
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export default { handleRefreshToken };
