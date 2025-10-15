/**
 * Google OAuth Integration Test Guide
 * 
 * This file contains test scenarios and example requests for testing
 * the Google OAuth implementation.
 */

// ============================================
// Test Setup
// ============================================

/**
 * Prerequisites:
 * 1. Set GOOGLE_CLIENT_ID in .env file
 * 2. Start the backend server: npm run dev
 * 3. Have a Google account for testing
 */

// ============================================
// Getting a Google ID Token for Testing
// ============================================

/**
 * Method 1: Using Google OAuth Playground
 * 
 * 1. Go to: https://developers.google.com/oauthplayground/
 * 2. Click settings (gear icon)
 * 3. Check "Use your own OAuth credentials"
 * 4. Enter your Client ID and Client Secret
 * 5. In Step 1, select "Google OAuth2 API v2" -> userinfo.email, userinfo.profile
 * 6. Click "Authorize APIs"
 * 7. In Step 2, click "Exchange authorization code for tokens"
 * 8. Copy the "id_token" from the response
 */

/**
 * Method 2: Using Frontend Integration (Recommended)
 * 
 * Install in your frontend:
 * npm install @react-oauth/google
 * 
 * Then use the GoogleLogin component as shown in the documentation
 */

// ============================================
// Test Cases
// ============================================

// Test 1: New User Registration
const testNewUserRegistration = {
  description: "First time Google login - should create new user",
  endpoint: "POST http://localhost:3500/auth/google",
  headers: {
    "Content-Type": "application/json"
  },
  body: {
    credential: "PASTE_YOUR_GOOGLE_ID_TOKEN_HERE"
  },
  expectedResponse: {
    status: 201,
    body: {
      success: true,
      isNewUser: true,
      accessToken: "jwt_token_here",
      user: {
        id: "number",
        google_id: "string",
        username: "auto_generated",
        email: "user@gmail.com",
        // ... other fields
      }
    }
  },
  curlExample: `
curl -X POST http://localhost:3500/auth/google \\
  -H "Content-Type: application/json" \\
  -d '{
    "credential": "PASTE_YOUR_GOOGLE_ID_TOKEN_HERE"
  }'
  `
};

// Test 2: Existing User Login
const testExistingUserLogin = {
  description: "Second login with same Google account - should return existing user",
  endpoint: "POST http://localhost:3500/auth/google",
  expectedResponse: {
    status: 200,
    body: {
      success: true,
      isNewUser: false,
      // ... same structure as above
    }
  },
  verification: [
    "Check that user ID is same as first registration",
    "Verify last_login timestamp is updated",
    "Confirm new refresh_token in database"
  ]
};

// Test 3: Missing Token
const testMissingToken = {
  description: "Request without Google ID token - should return 400",
  endpoint: "POST http://localhost:3500/auth/google",
  body: {},
  expectedResponse: {
    status: 400,
    body: {
      message: "Google ID token is required"
    }
  },
  curlExample: `
curl -X POST http://localhost:3500/auth/google \\
  -H "Content-Type: application/json" \\
  -d '{}'
  `
};

// Test 4: Invalid Token
const testInvalidToken = {
  description: "Request with fake/invalid token - should return 401",
  endpoint: "POST http://localhost:3500/auth/google",
  body: {
    credential: "invalid_token_123"
  },
  expectedResponse: {
    status: 401,
    body: {
      message: "Invalid Google token",
      error: "Token verification failed"
    }
  }
};

// Test 5: Account Linking
const testAccountLinking = {
  description: "User exists with email/password, logs in with Google using same email",
  setup: [
    "1. Create user via POST /register with email: test@gmail.com",
    "2. Login with Google using test@gmail.com"
  ],
  expectedBehavior: [
    "Should find existing user by email",
    "Should link google_id to existing account",
    "Should return isNewUser: false",
    "User can now login with both methods"
  ],
  verification: [
    "Check database: google_id should be populated",
    "Check database: profile_picture_url updated if was null"
  ]
};

// ============================================
// Database Verification Queries
// ============================================

const databaseQueries = {
  checkNewUser: `
    SELECT 
      id, google_id, username, email, first_name, last_name,
      profile_picture_url, last_login, joined_date
    FROM users 
    WHERE google_id = 'GOOGLE_ID_FROM_RESPONSE'
  `,
  
  checkRefreshToken: `
    SELECT username, refresh_token, last_login
    FROM users
    WHERE username = 'USERNAME_FROM_RESPONSE'
  `,
  
  checkAccountLinking: `
    SELECT google_id, email, username, password
    FROM users
    WHERE email = 'test@gmail.com'
  `,
  
  checkUsernameUniqueness: `
    SELECT username, COUNT(*) as count
    FROM users
    GROUP BY username
    HAVING count > 1
  `
};

// ============================================
// Postman/Thunder Client Collection
// ============================================

const postmanCollection = {
  info: {
    name: "IonianFarsi Google OAuth",
    description: "Test collection for Google OAuth endpoints"
  },
  item: [
    {
      name: "Google Login - New User",
      request: {
        method: "POST",
        url: "{{baseUrl}}/auth/google",
        header: [
          {
            key: "Content-Type",
            value: "application/json"
          }
        ],
        body: {
          mode: "raw",
          raw: JSON.stringify({
            credential: "{{googleIdToken}}"
          }, null, 2)
        }
      }
    },
    {
      name: "Google Login - Existing User",
      request: {
        method: "POST",
        url: "{{baseUrl}}/auth/google",
        header: [
          {
            key: "Content-Type",
            value: "application/json"
          }
        ],
        body: {
          mode: "raw",
          raw: JSON.stringify({
            credential: "{{googleIdToken}}"
          }, null, 2)
        }
      }
    },
    {
      name: "Google Login - Missing Token",
      request: {
        method: "POST",
        url: "{{baseUrl}}/auth/google",
        header: [
          {
            key: "Content-Type",
            value: "application/json"
          }
        ],
        body: {
          mode: "raw",
          raw: "{}"
        }
      }
    }
  ],
  variable: [
    {
      key: "baseUrl",
      value: "http://localhost:3500"
    },
    {
      key: "googleIdToken",
      value: "PASTE_YOUR_TOKEN_HERE"
    }
  ]
};

// ============================================
// Frontend Test Component (React Example)
// ============================================

const frontendTestComponent = `
import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

function GoogleAuthTest() {
  const handleSuccess = async (credentialResponse) => {
    console.log('Google Credential:', credentialResponse);
    
    try {
      const response = await fetch('http://localhost:3500/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important!
        body: JSON.stringify({
          credential: credentialResponse.credential
        })
      });
      
      const data = await response.json();
      console.log('Backend Response:', data);
      
      if (data.success) {
        // Store access token
        localStorage.setItem('accessToken', data.accessToken);
        
        // Show user info
        console.log('User:', data.user);
        console.log('Is New User:', data.isNewUser);
        
        alert(\`Login successful! Welcome \${data.user.username}\`);
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed: ' + error.message);
    }
  };

  const handleError = () => {
    console.error('Google Login Failed');
    alert('Google Login Failed');
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div style={{ padding: '20px' }}>
        <h2>Google OAuth Test</h2>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          useOneTap
        />
      </div>
    </GoogleOAuthProvider>
  );
}

export default GoogleAuthTest;
`;

// ============================================
// Expected Console Logs (Success Case)
// ============================================

const expectedConsoleLogs = {
  middleware: {
    log: "Google user data verified and attached to request",
    data: {
      googleId: "1234567890",
      email: "user@gmail.com",
      firstName: "John",
      lastName: "Doe",
      // ...
    }
  },
  controller: {
    newUser: "Creating new Google user with username: johndoe",
    existingUser: "Existing user found, updating last login"
  }
};

// ============================================
// Common Issues and Solutions
// ============================================

const troubleshooting = {
  issue1: {
    symptom: "401 Invalid Google token",
    possibleCauses: [
      "GOOGLE_CLIENT_ID doesn't match the token's audience",
      "Token has expired (Google ID tokens expire quickly)",
      "Token from wrong Google Cloud project"
    ],
    solutions: [
      "Verify .env GOOGLE_CLIENT_ID matches Cloud Console",
      "Get a fresh token (they expire in ~1 hour)",
      "Check token audience using jwt.io"
    ]
  },
  
  issue2: {
    symptom: "Cookie not being set in frontend",
    possibleCauses: [
      "CORS not allowing credentials",
      "Frontend not sending credentials: 'include'",
      "SameSite=None requires Secure=true and HTTPS"
    ],
    solutions: [
      "Check corsOptions allows credentials",
      "Add credentials: 'include' to fetch request",
      "For localhost testing, use secure: false temporarily"
    ]
  },
  
  issue3: {
    symptom: "Database error on user creation",
    possibleCauses: [
      "Required fields missing default values",
      "Username too long (>255 chars)",
      "Unique constraint violation"
    ],
    solutions: [
      "Check all NOT NULL fields have values",
      "Username sanitization should limit to 255 chars",
      "Check usernameExists function is working"
    ]
  }
};

// ============================================
// Export for documentation
// ============================================

module.exports = {
  testNewUserRegistration,
  testExistingUserLogin,
  testMissingToken,
  testInvalidToken,
  testAccountLinking,
  databaseQueries,
  postmanCollection,
  frontendTestComponent,
  troubleshooting
};
