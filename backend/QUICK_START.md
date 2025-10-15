# Google OAuth - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Get Google Client ID (5 min)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create project or select existing
3. Go to **APIs & Services → Credentials**
4. Click **+ CREATE CREDENTIALS → OAuth client ID**
5. If prompted, configure OAuth consent screen:
   - User Type: **External**
   - App name: **IonianFarsi**
   - User support email: **your-email@example.com**
   - Developer contact: **your-email@example.com**
   - Click **Save and Continue** (skip scopes)
6. Back to Create OAuth client ID:
   - Application type: **Web application**
   - Name: **IonianFarsi Web Client**
   - Authorized JavaScript origins:
     - `http://localhost:3000` (for local dev)
     - `http://localhost:3500` (for backend)
   - Authorized redirect URIs:
     - `http://localhost:3000` (if needed)
7. Click **Create**
8. **Copy the Client ID** (looks like: `123456789-abcdef.apps.googleusercontent.com`)

### Step 2: Configure Backend (30 seconds)

1. Open or create `/home/matin/ionianfarsi/backend/.env`
2. Add this line:
   ```env
   GOOGLE_CLIENT_ID=paste_your_client_id_here.apps.googleusercontent.com
   ```

### Step 3: Test (2 min)

#### Option A: Using cURL + OAuth Playground

1. Go to [OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)
2. Click **⚙️ Settings** (gear icon top-right)
3. Check ✓ **Use your own OAuth credentials**
4. Enter your **Client ID** (Client Secret not needed for this test)
5. Close settings
6. In **Step 1**, select:
   - Google OAuth2 API v2
   - Check: `userinfo.email`
   - Check: `userinfo.profile`
7. Click **Authorize APIs**
8. Sign in with Google account
9. In **Step 2**, click **Exchange authorization code for tokens**
10. Copy the **id_token** value
11. Test in terminal:

```bash
cd /home/matin/ionianfarsi/backend
npm run dev

# In another terminal:
curl -X POST http://localhost:3500/auth/google \
  -H "Content-Type: application/json" \
  -d '{
    "credential": "PASTE_ID_TOKEN_HERE"
  }'
```

#### Option B: Using Frontend (React)

1. Install package:
   ```bash
   cd /home/matin/ionianfarsi/frontend
   npm install @react-oauth/google
   ```

2. Create test component `src/components/GoogleAuthTest.js`:
   ```jsx
   import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
   
   function GoogleAuthTest() {
     const handleSuccess = async (response) => {
       console.log('Token:', response.credential);
       
       const result = await fetch('http://localhost:3500/auth/google', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         credentials: 'include',
         body: JSON.stringify({ credential: response.credential })
       });
       
       const data = await result.json();
       console.log('Login result:', data);
       
       if (data.success) {
         alert(`Welcome ${data.user.username}!`);
         localStorage.setItem('accessToken', data.accessToken);
       }
     };
   
     return (
       <GoogleOAuthProvider clientId="YOUR_CLIENT_ID_HERE">
         <div style={{ padding: 50 }}>
           <h2>Test Google Login</h2>
           <GoogleLogin 
             onSuccess={handleSuccess}
             onError={() => alert('Login failed')}
           />
         </div>
       </GoogleOAuthProvider>
     );
   }
   
   export default GoogleAuthTest;
   ```

3. Import and use in `src/App.js`:
   ```jsx
   import GoogleAuthTest from './components/GoogleAuthTest';
   
   function App() {
     return (
       <div>
         <GoogleAuthTest />
       </div>
     );
   }
   ```

4. Start frontend:
   ```bash
   npm start
   ```

5. Click "Sign in with Google" button

### Step 4: Verify (1 min)

Check response includes:
```json
{
  "success": true,
  "isNewUser": true,  // First time
  "accessToken": "eyJ...",
  "user": {
    "id": 1,
    "google_id": "...",
    "username": "generated_username",
    "email": "your@gmail.com",
    ...
  }
}
```

Check database:
```sql
SELECT id, google_id, username, email, profile_picture_url 
FROM users 
WHERE google_id IS NOT NULL;
```

---

## ✅ Success Checklist

- [ ] Google Client ID obtained
- [ ] GOOGLE_CLIENT_ID in .env file
- [ ] Backend server running (npm run dev)
- [ ] Test request returns 200/201 status
- [ ] User created in database
- [ ] accessToken received
- [ ] Cookie set (check browser DevTools → Application → Cookies)

---

## ❌ Troubleshooting

### Error: "Invalid Google token"
**Solution:** Make sure:
- Client ID in .env matches Cloud Console
- Token is fresh (they expire in ~1 hour)
- Using correct token (id_token, not access_token)

### Error: "Google ID token is required"
**Solution:** Check request body has `credential` or `idToken` field

### Error: "Cannot read property 'googleUser'"
**Solution:** Ensure `verifyGoogleToken` middleware is applied to route

### No cookie set in browser
**Solution:**
- Frontend must use `credentials: 'include'`
- Check CORS allows credentials (already configured)
- For localhost, might need `secure: false` in cookie options

---

## 📝 What Happens Behind the Scenes

1. **Frontend**: User clicks Google login → Gets ID token
2. **Middleware**: Verifies token with Google → Extracts user data
3. **Controller**: 
   - Checks if user exists (by google_id or email)
   - If new: Creates user with auto-generated username
   - If existing: Updates last_login
   - Generates JWT tokens
4. **Response**: Returns tokens + user data
5. **Frontend**: Stores accessToken, cookie auto-stored

---

## 🎯 Next: Integrate into Your App

### Login Component
```jsx
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  
  const handleGoogleLogin = async (response) => {
    const result = await fetch('http://localhost:3500/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ credential: response.credential })
    });
    
    const data = await result.json();
    
    if (data.success) {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard');
    }
  };
  
  return (
    <div>
      <h1>Login</h1>
      <GoogleLogin 
        onSuccess={handleGoogleLogin}
        onError={() => console.error('Login failed')}
      />
    </div>
  );
}
```

### Protected API Calls
```javascript
const accessToken = localStorage.getItem('accessToken');

fetch('http://localhost:3500/api/lessons', {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  },
  credentials: 'include'
});
```

---

## 📚 More Info

- **Full Documentation**: `/backend/GOOGLE_OAUTH_IMPLEMENTATION.md`
- **Test Guide**: `/backend/tests/googleOAuth.test.guide.js`
- **Summary**: `/backend/IMPLEMENTATION_SUMMARY.md`

---

**Ready to go! 🚀**
