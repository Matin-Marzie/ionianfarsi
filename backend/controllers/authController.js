import jwt from 'jsonwebtoken';
import { 
  findUserByUsername, 
  updateRefreshToken,
  findUserByGoogleId,
  findUserByEmail,
  createGoogleUser,
  updateUserLastLogin
} from '../models/usersModel.js';
import { comparePassword } from '../utils/password.js';
import { LoginSchema } from '../validation/LoginSchema.js';
import { generateUniqueUsername } from '../utils/username.js';

const handleLogin = async (req, res) => {
  const { error } = LoginSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { username, password } = req.body;

  const foundUser = await findUserByUsername(username);
  if (!foundUser) return res.status(404).json({ message: `Username ${username} not found.` });

  const match = await comparePassword(password, foundUser.password);
  if (!match) return res.status(401).json({ message: 'Incorrect password.' });

  const { password: pass, refresh_token, section_id, unit_id, repetition_id, lesson_id, ...safeUserInfo } = foundUser;

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
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
  });

  res.json({
    accessToken,
    user: {
      ...safeUserInfo,
      section: { section_id },
      unit: { unit_id },
      repetition: { repetition_id },
      lesson: { lesson_id }
    }
  });
};


const handleGoogleLogin = async (req, res) => {
  try {
    // Google user data is attached by verifyGoogleToken middleware
    const googleUser = req.googleUser;
    
    if (!googleUser) {
      return res.status(400).json({ 
        message: 'Google user data not found. Ensure verifyGoogleToken middleware is applied.' 
      });
    }

    let user = null;
    let isNewUser = false;

    // Check if user exists by Google ID
    user = await findUserByGoogleId(googleUser.googleId);
    
    // If not found by Google ID, check by email
    if (!user && googleUser.email) {
      user = await findUserByEmail(googleUser.email);
      
      // If found by email but no google_id, link the accounts
      if (user) {
        // Update existing user with Google ID
        await updateUserLastLogin(user.username, null);
        // Update google_id for this user
        const db = (await import('../config/db.js')).default;
        await db.execute(
          'UPDATE users SET google_id = ?, profile_picture_url = COALESCE(profile_picture_url, ?) WHERE id = ?',
          [googleUser.googleId, googleUser.profilePicture, user.id]
        );
      }
    }

    // If user doesn't exist, create new user
    if (!user) {
      isNewUser = true;
      
      // Generate unique username
      const username = await generateUniqueUsername({
        firstName: googleUser.firstName,
        lastName: googleUser.lastName,
        email: googleUser.email
      });

      // Create new user
      const userId = await createGoogleUser({
        googleId: googleUser.googleId,
        email: googleUser.email,
        firstName: googleUser.firstName,
        lastName: googleUser.lastName,
        name: googleUser.name,
        username: username,
        profilePicture: googleUser.profilePicture
      });

      // Fetch the newly created user
      user = await findUserByUsername(username);
      
      if (!user) {
        throw new Error('Failed to create user');
      }
    }

    // Generate JWT tokens
    const accessToken = jwt.sign(
      { username: user.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    );
    
    const refreshToken = jwt.sign(
      { username: user.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '30d' }
    );

    // Update refresh token and last login
    await updateUserLastLogin(user.username, refreshToken);

    // Set HTTP-only cookie
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });

    // Prepare safe user info (exclude sensitive data)
    const { 
      password, 
      refresh_token, 
      section_id, 
      unit_id, 
      repetition_id, 
      lesson_id,
      ...safeUserInfo 
    } = user;

    // Send response
    res.status(isNewUser ? 201 : 200).json({
      success: true,
      isNewUser,
      accessToken,
      user: {
        ...safeUserInfo,
        section: { section_id },
        unit: { unit_id },
        repetition: { repetition_id },
        lesson: { lesson_id }
      }
    });

  } catch (error) {
    console.error('Google login error:', error);
    res.status(500).json({ 
      message: 'Internal server error during Google authentication',
      error: error.message 
    });
  }
};

export default { handleLogin, handleGoogleLogin };
