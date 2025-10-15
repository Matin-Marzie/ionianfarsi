# Google OAuth Integration Documentation

## Overview
This implementation provides secure Google OAuth 2.0 authentication for user registration and login.

## Architecture

### Flow Diagram
```
Frontend → POST /auth/google (with Google ID token)
         ↓
    verifyGoogleToken middleware (validates token with Google)
         ↓
    handleGoogleLogin controller
         ↓
    Check if user exists (by google_id or email)
         ↓
    [User exists?]
    ├─ Yes → Update last_login, generate tokens
    └─ No  → Create user, generate unique username, generate tokens
         ↓
    Return access_token, refresh_token, and user data
```

## Files Created/Modified

### 1. Middleware: `/backend/middleware/verifyGoogleToken.js`
**Purpose**: Verifies Google ID tokens before processing authentication

**Features**:
- Validates token authenticity with Google OAuth API
- Extracts user profile information
- Attaches verified data to request object
- Handles verification errors gracefully

**Usage**: Applied as middleware to `/auth/google` route

### 2. Utilities: `/backend/utils/username.js`
**Purpose**: Generates unique usernames for new Google users

**Strategy**:
1. Try `firstName + lastName` (sanitized)
2. Try email username part (before @)
3. Try email username + random 2 digits
4. Fallback to email + timestamp

**Features**:
- Sanitizes usernames (lowercase, removes special chars)
- Checks database for uniqueness
- Respects 255 character limit

### 3. Model Functions: `/backend/models/usersModel.js`
**New Functions**:
- `findUserByGoogleId(googleId)` - Find user by Google ID
- `findUserByEmail(email)` - Find user by email address
- `createGoogleUser(googleUserData)` - Create new user from Google data
- `updateUserLastLogin(username, refreshToken)` - Update login time and token
- `usernameExists(username)` - Check username availability

### 4. Controller: `/backend/controllers/authController.js`
**Function**: `handleGoogleLogin(req, res)`

**Process**:
1. Receive verified Google user data from middleware
2. Check if user exists by `google_id`
3. If not found, check by `email` (account linking)
4. If no user found, create new user with:
   - Generated unique username
   - Google profile data
   - Default values for game progress fields
5. Generate JWT access and refresh tokens
6. Update database with refresh token and last_login
7. Set HTTP-only cookie with refresh token
8. Return tokens and sanitized user data

### 5. Routes: `/backend/routes/auth.js`
**New Route**: `POST /auth/google`

**Middleware Chain**:
```javascript
router.post('/google', verifyGoogleToken, authController.handleGoogleLogin)
```

## API Endpoint

### POST `/auth/google`

**Request Body**:
```json
{
  "credential": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjI3N...", // Google ID token
  // OR
  "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjI3N..."
}
```

**Success Response (200/201)**:
```json
{
  "success": true,
  "isNewUser": false,
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 123,
    "google_id": "1234567890",
    "name": "John Doe",
    "first_name": "John",
    "last_name": "Doe",
    "username": "johndoe",
    "email": "john@example.com",
    "experience": 0,
    "level": "N",
    "coin": 0,
    "energy": 5,
    "profile_picture_url": "https://lh3.googleusercontent.com/...",
    "section": { "section_id": 1 },
    "unit": { "unit_id": 1 },
    "repetition": { "repetition_id": 1 },
    "lesson": { "lesson_id": 1 },
    "last_login": "2025-10-15T12:00:00.000Z",
    "joined_date": "2025-10-15T12:00:00.000Z"
  }
}
```

**Error Responses**:

400 Bad Request:
```json
{
  "message": "Google ID token is required"
}
```

401 Unauthorized:
```json
{
  "message": "Invalid Google token",
  "error": "Token verification failed"
}
```

500 Internal Server Error:
```json
{
  "message": "Internal server error during Google authentication",
  "error": "Error details"
}
```

## Environment Variables

Add to your `.env` file:
```env
GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
ACCESS_TOKEN_SECRET=your_secret_here
REFRESH_TOKEN_SECRET=your_secret_here
```

## Database Schema

The implementation uses these user fields:
- `google_id` - Stores Google user identifier
- `email` - User's email from Google
- `first_name` - From Google profile
- `last_name` - From Google profile  
- `name` - Full name from Google
- `username` - Auto-generated unique username
- `password` - Placeholder for Google users
- `profile_picture_url` - Google profile picture URL
- `refresh_token` - JWT refresh token
- `last_login` - Last authentication timestamp
- Default game progress fields (section_id, unit_id, etc.)

## Security Features

1. **Token Verification**: All Google tokens verified with Google's OAuth API
2. **HTTP-Only Cookies**: Refresh token stored in secure, HTTP-only cookie
3. **JWT Expiration**: 
   - Access token: 1 hour
   - Refresh token: 30 days
4. **CORS Protection**: Configured in corsOptions
5. **Secure Cookie Attributes**: 
   - `httpOnly: true`
   - `secure: true` 
   - `sameSite: 'None'`

## Account Linking

If a user signs up with email/password and later uses Google OAuth with the same email:
- The system links the Google ID to existing account
- User can now login with both methods
- Profile picture updated if not already set

## Frontend Integration Example

```javascript
// Using Google Sign-In with React (example)
import { GoogleLogin } from '@react-oauth/google';

function LoginPage() {
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await fetch('http://localhost:3500/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for cookies
        body: JSON.stringify({
          credential: credentialResponse.credential
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Store access token
        localStorage.setItem('accessToken', data.accessToken);
        // User data available in data.user
        console.log('Logged in:', data.user);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleGoogleSuccess}
      onError={() => console.log('Login Failed')}
    />
  );
}
```

## Testing

### Manual Testing Steps:

1. **Setup Google OAuth**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create OAuth 2.0 Client ID
   - Add to `.env` file

2. **Test New User Registration**:
   ```bash
   # Get Google ID token from frontend or Google OAuth Playground
   curl -X POST http://localhost:3500/auth/google \
     -H "Content-Type: application/json" \
     -d '{"credential": "YOUR_GOOGLE_ID_TOKEN"}'
   ```
   - Should return `isNewUser: true`
   - Check database for new user record

3. **Test Existing User Login**:
   - Use same Google account
   - Should return `isNewUser: false`
   - Verify `last_login` updated

4. **Test Account Linking**:
   - Create user with email/password
   - Login with Google using same email
   - Verify `google_id` added to existing user

### Error Cases to Test:
- Missing token
- Invalid token
- Expired token
- Network errors

## Troubleshooting

**"Invalid Google token"**:
- Verify GOOGLE_CLIENT_ID is correct
- Check token hasn't expired (Google tokens expire quickly)
- Ensure token audience matches your client ID

**Username conflicts**:
- System automatically adds random digits
- Check `usernameExists` function logic

**Cookie not set**:
- Verify CORS configuration allows credentials
- Check `secure: true` matches your HTTPS setup (use `false` for localhost)
- Frontend must use `credentials: 'include'`

## Additional Notes

- Password field for Google users is set to placeholder value
- Google users cannot use traditional login (no real password)
- Profile pictures automatically synced from Google
- Consider implementing Google token refresh for long-lived sessions
- Monitor Google OAuth quota limits

## Future Enhancements

1. **Email Verification**: Add email verification step for non-Google signups
2. **OAuth Providers**: Add Facebook, GitHub, etc.
3. **Account Merging**: UI for linking multiple OAuth providers
4. **Two-Factor Auth**: Add 2FA for password-based accounts
5. **Session Management**: Add device/session tracking
6. **Rate Limiting**: Add rate limiting to prevent abuse
