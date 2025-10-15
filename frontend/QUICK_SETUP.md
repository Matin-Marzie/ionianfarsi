# Frontend Google OAuth - Quick Setup ⚡

## 🚀 Setup in 2 Minutes

### Step 1: Create .env File

Create `/frontend/.env` with:
```env
REACT_APP_GOOGLE_CLIENT_ID=705437424149-42j0di57b45mjg3ncbefu7v6p669ja1v.apps.googleusercontent.com
```

⚠️ **Use the SAME Client ID as your backend!**

### Step 2: Start the App

```bash
cd /home/matin/ionianfarsi/frontend
npm start
```

App will open at `http://localhost:3000`

### Step 3: Test

1. Go to `http://localhost:3000/login`
2. Click **"Sign in with Google"** button
3. Select your Google account
4. Should redirect to `/learn` page

**That's it!** ✅

---

## 🧪 Quick Test Checklist

### Login Page (`/login`)
- [ ] Google button visible below the login form
- [ ] Button says "Sign in with Google"
- [ ] Clicking opens Google OAuth popup
- [ ] Selecting account redirects to `/learn`
- [ ] User data appears in app (check profile)
- [ ] Cookie set in browser (DevTools → Application → Cookies → `jwt`)

### Register Page (`/register`)
- [ ] Google button visible at bottom
- [ ] Button says "Sign up with Google"
- [ ] Same flow as login
- [ ] New users created automatically
- [ ] Redirects to `/learn` after signup

### Error Handling
- [ ] Wrong/expired token → Shows error message
- [ ] Backend down → Shows "No server response"
- [ ] Network error → Shows error message
- [ ] Error focuses on error message (accessibility)

---

## 🐛 Common Issues & Quick Fixes

### 1. Button Not Showing
**Fix**: Check .env file exists and has correct Client ID
```bash
cat frontend/.env
# Should show: REACT_APP_GOOGLE_CLIENT_ID=...
```

If missing, create it and **restart** `npm start`

### 2. "Invalid Client ID"
**Fix**: Verify Client ID matches Google Cloud Console
1. Go to https://console.cloud.google.com/
2. APIs & Services → Credentials
3. Copy the Client ID
4. Paste in `.env` file
5. Restart `npm start`

### 3. "Origin not allowed"
**Fix**: Add `http://localhost:3000` to authorized origins
1. Google Cloud Console → Credentials
2. Click your OAuth Client ID
3. Authorized JavaScript origins → Add:
   - `http://localhost:3000`
4. Save
5. Try again (may take a few minutes)

### 4. Redirects but not logged in
**Fix**: Check browser console for errors
```bash
# Common cause: Backend not running
cd backend
npm run dev
```

---

## 📋 What Was Changed

### Files Modified:
1. ✅ `/frontend/src/api/UserApi.js` - Added `loginWithGoogle()` function
2. ✅ `/frontend/src/components/Login.js` - Added Google login button & logic
3. ✅ `/frontend/src/components/Register.js` - Added Google signup button & logic

### Files Created:
1. ✅ `/frontend/.env.example` - Environment variable template
2. ✅ `/frontend/GOOGLE_OAUTH_FRONTEND.md` - Full documentation

### No Breaking Changes:
- Traditional login/register still works
- All existing features preserved
- Google login is **additional** option

---

## 🎨 UI Preview

### Login Page
```
┌────────────────────────────────┐
│         Sign in                │
├────────────────────────────────┤
│ Username: [____________]       │
│ Password: [____________]       │
│ [        Login        ]        │
│                                │
│ Don't have an account? Sign Up │
│                                │
│ ───────── or ─────────        │
│                                │
│  [🔵 Sign in with Google]     │
└────────────────────────────────┘
```

### Register Page
```
┌────────────────────────────────┐
│    Create an Account           │
├────────────────────────────────┤
│ Name: [____________]           │
│ Username: [____________]       │
│ Password: [____________]       │
│ Confirm: [____________]        │
│ [      Register       ]        │
│                                │
│ Already have account? Login    │
│                                │
│ ───────── or ─────────        │
│                                │
│  [🔵 Sign up with Google]     │
└────────────────────────────────┘
```

---

## 🔐 Security Notes

✅ **Safe**:
- Access token stored in memory (auth context)
- Refresh token in HTTP-only cookie (can't be accessed by JS)
- Google verifies identity
- Backend validates all tokens

⚠️ **Production**:
- Must use HTTPS
- Update authorized origins to production domain
- Set secure cookies

---

## 📊 User Flow

```
Click "Sign in with Google"
    ↓
Google OAuth Popup
    ↓
User Selects Account
    ↓
Google Returns Token
    ↓
Send to Backend /auth/google
    ↓
Backend Verifies & Creates/Finds User
    ↓
Returns accessToken + user data
    ↓
Store in Auth Context + React Query
    ↓
Navigate to /learn
    ↓
✅ User Logged In!
```

---

## 🎯 Testing Commands

### Check Environment
```bash
# Should show your client ID
echo $REACT_APP_GOOGLE_CLIENT_ID

# If empty, check .env file
cat .env
```

### Open App
```bash
npm start
# Opens http://localhost:3000
```

### Check Backend Running
```bash
# In another terminal
cd ../backend
npm run dev
# Should say "Server running at :3500"
```

### Test API Directly (optional)
```bash
# Get a token from Google (use the one you provided earlier)
curl -X POST http://localhost:3500/auth/google \
  -H "Content-Type: application/json" \
  -d '{"credential": "YOUR_GOOGLE_TOKEN_HERE"}'

# Should return user data and tokens
```

---

## ✅ Success Indicators

When it works, you'll see:

1. **Console Logs**:
   ```
   Login result: { success: true, accessToken: "...", user: {...} }
   ```

2. **Network Tab** (DevTools):
   - POST `/auth/google` → Status 200 or 201
   - Response contains `accessToken` and `user`

3. **Application Tab** (DevTools):
   - Cookies → `jwt` cookie present
   - Local Storage → `accessToken` (if you store it there)

4. **Visual**:
   - Redirects to `/learn` page
   - User profile shows your Google name/picture
   - Navigation bar shows logged-in state

---

## 📚 Full Documentation

For detailed information, see:
- **Frontend Guide**: `/frontend/GOOGLE_OAUTH_FRONTEND.md`
- **Backend Guide**: `/backend/GOOGLE_OAUTH_IMPLEMENTATION.md`
- **Quick Start**: `/backend/QUICK_START.md`

---

## 🎉 You're Done!

Everything is ready. Just:
1. Add `.env` file with Client ID
2. Run `npm start`
3. Test the Google login button

Happy coding! 🚀
