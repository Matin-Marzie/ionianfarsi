import { OAuth2Client } from 'google-auth-library';
import { GoogleAuthSchema } from '../validation/GoogleAuthSchema.js';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * Middleware to verify Google ID token
 * Expects the ID token in request body as 'credential' or 'idToken'
 */
const verifyGoogleToken = async (req, res, next) => {
  try {
    // Validate request body
    const { error } = GoogleAuthSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ 
        message: error.details[0].message 
      });
    }

    const token = req.body.credential || req.body.idToken;
    
    if (!token) {
      return res.status(400).json({ 
        message: 'Google ID token is required' 
      });
    }

    // Verify the token with Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    
    // Attach verified Google user data to request
    req.googleUser = {
      googleId: payload.sub,
      email: payload.email,
      emailVerified: payload.email_verified,
      firstName: payload.given_name,
      lastName: payload.family_name,
      name: payload.name,
      profilePicture: payload.picture,
    };

    next();
  } catch (error) {
    console.error('Google token verification failed:', error);
    return res.status(401).json({ 
      message: 'Invalid Google token',
      error: error.message 
    });
  }
};

export default verifyGoogleToken;
