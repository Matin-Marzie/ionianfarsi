# Google OAuth Frontend Integration - Documentation

## ✅ Implementation Complete

This document describes the Google OAuth integration in the IonianFarsi frontend application.

---

## 📁 Files Modified

### 1. **API Layer** - `/frontend/src/api/UserApi.js`
Added new function:
```javascript
export const loginWithGoogle = async ({ credential }) => {
    const response = await api.post(
        '/auth/google',
        JSON.stringify({ credential }),
        {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        }
    );
    return response.data;
};
```

### 2. **Login Component** - `/frontend/src/components/Login.js`
**Changes:**
- ✅ Imported `GoogleLogin` component from `@react-oauth/google`
- ✅ Imported `loginWithGoogle` from UserApi
- ✅ Added Google OAuth mutation with success/error handling
- ✅ Added `handleGoogleSuccess` and `handleGoogleError` handlers
- ✅ Added Google Login button with "Sign in with Google" text
- ✅ Added visual divider ("or") between traditional and Google login

**Features:**
- Authenticates users via Google OAuth
- Sets auth context with access token
- Stores user data in React Query cache
- Navigates to previous location or default route
- Shows appropriate error messages
- Works for both new and existing users

### 3. **Register Component** - `/frontend/src/components/Register.js`
**Changes:**
- ✅ Imported `useAuth` and `useQueryClient` hooks
- ✅ Imported `loginWithGoogle` from UserApi
- ✅ Added location state management for navigation
- ✅ Added Google OAuth mutation identical to Login component
- ✅ Updated Google Login button to use proper handlers
- ✅ Added error handling for Google signup

**Features:**
- Registers new users via Google OAuth
- Automatically logs in and sets auth context
- Same user experience as traditional registration
- Navigates to `/learn` after successful signup

### 4. **Environment Configuration** - `/frontend/.env.example`
Created template file with required environment variables.

---

## 🔑 Key Features

### Unified Authentication Flow
✅ **Same API endpoint for login & registration**: `/auth/google`  
✅ **Backend handles user creation**: No separate signup flow needed  
✅ **Automatic login**: User is authenticated immediately after Google OAuth  
✅ **Session management**: Sets access token and refresh token (via cookie)  
✅ **State preservation**: Navigates to previous route after login  

### User Experience
✅ **Seamless integration**: Google button matches app styling  
✅ **Error handling**: User-friendly error messages  
✅ **Loading states**: Handled by TanStack Query mutations  
✅ **Accessibility**: Proper ARIA attributes and screen reader support  

### Security
✅ **Credentials included**: `withCredentials: true` for cookies  
✅ **Token verification**: Backend verifies Google ID tokens  
✅ **No password storage**: Google users don't need passwords  

---

## 🚀 Setup Instructions

### 1. Environment Variables

Create `/frontend/.env` file:
```env
REACT_APP_GOOGLE_CLIENT_ID=705437424149-42j0di57b45mjg3ncbefu7v6p669ja1v.apps.googleusercontent.com
```

⚠️ **Important**: Use the same Client ID as your backend!

### 2. Verify GoogleOAuthProvider Wrapper

The `App.js` already wraps the app with `GoogleOAuthProvider`:
```javascript
<GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
  <BrowserRouter>
    {/* Routes */}
  </BrowserRouter>
</GoogleOAuthProvider>
```

### 3. Install Dependencies (if needed)

Dependencies are already in `package.json`:
```json
{
  "@react-oauth/google": "^0.12.2",
  "@tanstack/react-query": "^5.83.0"
}
```

If you need to reinstall:
```bash
cd frontend
npm install
```

### 4. Start the Application

```bash
cd frontend
npm start
```

The app will start on `http://localhost:3000`

---

## 📊 User Flow Diagrams

### Login Flow
```
User clicks "Sign in with Google"
         ↓
Google OAuth popup appears
         ↓
User selects Google account
         ↓
Google returns credential (ID token)
         ↓
handleGoogleSuccess called
         ↓
googleMutate({ credential })
         ↓
POST /auth/google (backend)
         ↓
Backend verifies token & finds/creates user
         ↓
Returns { accessToken, user, isNewUser }
         ↓
setAuth (stores access token)
         ↓
setQueryData (stores user info)
         ↓
Navigate to /learn (or previous route)
```

### Registration Flow
```
User clicks "Sign up with Google"
         ↓
[Same as Login Flow - backend handles creation]
         ↓
Backend creates new user if doesn't exist
         ↓
Returns { accessToken, user, isNewUser: true }
         ↓
[Same navigation and state management]
```

---

## 🎨 UI Components

### Login Page Google Button
```jsx
<GoogleLogin
  onSuccess={handleGoogleSuccess}
  onError={handleGoogleError}
  text="signin_with"
  size="large"
  width="280"
/>
```

**Button Text**: "Sign in with Google"  
**Size**: Large (better visibility)  
**Width**: 280px (centered in container)  

### Register Page Google Button
```jsx
<GoogleLogin
  onSuccess={handleGoogleSuccess}
  onError={handleGoogleError}
  text="signup_with"
  size="large"
  width="280"
/>
```

**Button Text**: "Sign up with Google"  
**Same styling as Login page**  

---

## 🔍 Code Walkthrough

### API Function (`UserApi.js`)

```javascript
export const loginWithGoogle = async ({ credential }) => {
    const response = await api.post(
        '/auth/google',
        JSON.stringify({ credential }),
        {
            headers: { "Content-Type": "application/json" },
            withCredentials: true  // Important: Allows cookies
        }
    );
    return response.data;
};
```

**Parameters:**
- `credential`: Google ID token from OAuth flow

**Returns:**
```javascript
{
  success: true,
  isNewUser: boolean,
  accessToken: "jwt_token",
  user: {
    id: number,
    google_id: string,
    username: string,
    email: string,
    // ...other user fields
  }
}
```

### Mutation Handler (Login.js / Register.js)

```javascript
const { mutate: googleMutate } = useMutation({
    mutationFn: loginWithGoogle,
    onSuccess: (data) => {
        // 1. Add reset flag to trigger data sync
        const userWithResetFlag = {
            ...data.user,
            reset_data: true,
        };

        // 2. Set access token in auth context
        setAuth(prev => ({
            ...prev,
            accessToken: data?.accessToken
        }));

        // 3. Cache user data in React Query
        queryClient.setQueryData(["user"], userWithResetFlag);

        // 4. Clear any error messages
        setErrorMsg('');

        // 5. Navigate to previous route or /learn
        navigate(previous_route_location, { replace: true });
    },
    onError: (err) => {
        // Handle errors with user-friendly messages
        if (!err?.response) {
            setErrorMsg('No server response');
        } else if (err.response?.status === 400) {
            setErrorMsg('Invalid Google token');
        } else if (err.response?.status === 401) {
            setErrorMsg('Google authentication failed');
        } else {
            setErrorMsg('Google login failed. Please try again.');
        }
        errRef.current.focus(); // Accessibility
    }
});
```

### Success Handler

```javascript
const handleGoogleSuccess = (credentialResponse) => {
    const credential = credentialResponse.credential;
    googleMutate({ credential });
};
```

**Parameters from Google:**
```javascript
credentialResponse = {
    credential: "eyJhbGc...",  // JWT ID token
    clientId: "705437424149-...",
    select_by: "btn"
}
```

We only need the `credential` field.

---

## 🧪 Testing

### Manual Testing Steps

1. **Start Backend**:
   ```bash
   cd backend
   npm run dev
   ```

2. **Start Frontend**:
   ```bash
   cd frontend
   npm start
   ```

3. **Test Login Page**:
   - Navigate to `http://localhost:3000/login`
   - Click "Sign in with Google" button
   - Select Google account
   - Verify redirect to `/learn`
   - Check browser DevTools:
     - **Application → Local Storage**: `accessToken` should be set
     - **Application → Cookies**: `jwt` cookie should be set
     - **Network → XHR**: Check `/auth/google` request

4. **Test Register Page**:
   - Navigate to `http://localhost:3000/register`
   - Click "Sign up with Google" button
   - Same verification steps as login

5. **Test Existing User**:
   - Login with Google once
   - Logout
   - Login with Google again
   - Should work seamlessly (isNewUser: false)

### Error Testing

1. **No Internet**:
   - Disconnect internet
   - Try Google login
   - Should show: "No server response"

2. **Invalid Token** (harder to test):
   - Backend would reject
   - Should show: "Invalid Google token"

3. **Backend Down**:
   - Stop backend server
   - Try Google login
   - Should show: "No server response"

---

## 🐛 Troubleshooting

### Button Not Appearing

**Issue**: Google Login button doesn't render  
**Causes**:
- Missing `REACT_APP_GOOGLE_CLIENT_ID` in .env
- GoogleOAuthProvider not wrapping app
- Import error

**Solution**:
```bash
# Check .env file exists
cat frontend/.env

# Should contain:
REACT_APP_GOOGLE_CLIENT_ID=your_client_id_here

# Restart dev server after adding .env
```

### "Invalid Client ID" Error

**Issue**: Google popup shows invalid client error  
**Causes**:
- Wrong client ID in .env
- Client ID doesn't match Google Console
- Authorized JavaScript origins not configured

**Solution**:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to APIs & Services → Credentials
3. Click on your OAuth Client ID
4. Verify **Authorized JavaScript origins** includes:
   - `http://localhost:3000`
5. Copy Client ID and update .env

### Authentication Succeeds but Navigation Fails

**Issue**: Google login works but stays on same page  
**Causes**:
- Navigation blocked by route guards
- Auth context not updated
- Query cache not set

**Solution**:
Check console for errors and verify:
```javascript
// Auth context should be set
console.log('Auth set:', data.accessToken);

// User should be cached
console.log('User cached:', queryClient.getQueryData(["user"]));
```

### Cookie Not Set

**Issue**: `jwt` cookie not appearing in browser  
**Causes**:
- `withCredentials: true` missing
- Backend CORS not allowing credentials
- SameSite policy blocking cookie

**Solution**:
1. Verify `withCredentials: true` in API call ✅ (already added)
2. Check backend CORS config allows credentials
3. For localhost, backend should set `secure: false` in cookie

### User Data Not Syncing

**Issue**: User info doesn't appear in app  
**Causes**:
- `reset_data` flag missing
- Query cache key mismatch
- Component not reading from cache

**Solution**:
```javascript
// Verify reset flag is added
const userWithResetFlag = {
    ...data.user,
    reset_data: true, // Must be here
};

// Verify cache key matches
queryClient.setQueryData(["user"], userWithResetFlag);
// Other components should use: useQuery({ queryKey: ["user"] })
```

---

## 📱 Mobile Considerations

### Responsive Design
- Google button width: 280px (fits mobile screens)
- Button centered with `flex justify-center`
- Touch-friendly size: `size="large"`

### Testing on Mobile
```bash
# Find your local IP
ifconfig | grep "inet "

# Access from mobile device
http://YOUR_IP:3000/login
```

⚠️ **Note**: Google OAuth might not work on mobile with localhost. Use production domain or ngrok for testing.

---

## 🔒 Security Best Practices

### ✅ Implemented
- Credentials included in requests (`withCredentials: true`)
- HTTPS required in production (Google OAuth requirement)
- No sensitive data in localStorage (only accessToken)
- Refresh token in HTTP-only cookie
- Token verification on backend

### ⚠️ Recommendations
- Implement token refresh flow
- Add rate limiting on backend
- Monitor failed login attempts
- Implement PKCE for enhanced security
- Add CSP headers in production

---

## 📚 Additional Resources

- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [@react-oauth/google NPM](https://www.npmjs.com/package/@react-oauth/google)
- [TanStack Query Documentation](https://tanstack.com/query/latest)

---

## 🎯 Next Steps

### Optional Enhancements

1. **Loading States**:
   ```javascript
   const { mutate: googleMutate, isPending } = useMutation({...});
   
   // Show loading spinner
   {isPending && <Spinner />}
   ```

2. **Success Notifications**:
   ```javascript
   onSuccess: (data) => {
       if (data.isNewUser) {
           toast.success(`Welcome ${data.user.username}!`);
       } else {
           toast.success('Welcome back!');
       }
       // ... rest of logic
   }
   ```

3. **One-Tap Login**:
   ```javascript
   <GoogleLogin
       onSuccess={handleGoogleSuccess}
       onError={handleGoogleError}
       useOneTap  // Adds one-tap feature
   />
   ```

4. **Auto-login**:
   - Check if user has valid refresh token
   - Auto-redirect authenticated users from login/register pages

---

## ✅ Implementation Checklist

- [x] API function created (`loginWithGoogle`)
- [x] Login component updated with Google OAuth
- [x] Register component updated with Google OAuth
- [x] Error handling implemented
- [x] Navigation logic added
- [x] Auth context integration
- [x] React Query cache management
- [x] .env.example created
- [x] Documentation written
- [ ] **TODO**: Add `REACT_APP_GOOGLE_CLIENT_ID` to .env
- [ ] **TODO**: Test login flow
- [ ] **TODO**: Test registration flow
- [ ] **TODO**: Test error scenarios

---

**Status**: ✅ Ready for Testing  
**Implementation Date**: October 15, 2025  
**Dependencies**: @react-oauth/google v0.12.2, @tanstack/react-query v5.83.0
