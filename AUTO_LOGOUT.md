# Auto Logout Feature

## Overview
The application now automatically logs out university administrators when they close the browser tab or window.

## Changes Made

### 1. Session Storage Instead of Local Storage
- Changed from `localStorage` to `sessionStorage` for storing JWT tokens
- `sessionStorage` automatically clears when the browser tab/window is closed
- `localStorage` persists across browser sessions (old behavior)

### 2. Files Updated
- `frontend/src/pages/AdminLogin.jsx` - Login now saves to sessionStorage
- `frontend/src/pages/Billing.jsx` - Reads token from sessionStorage
- `frontend/src/pages/IssueCredential.jsx` - Reads token from sessionStorage
- `frontend/src/pages/Verify.jsx` - Reads token from sessionStorage
- `frontend/src/App.jsx` - Added logout button and beforeunload handler

### 3. Features Added
- **Auto Logout on Close**: When the browser tab/window closes, the session is cleared
- **Manual Logout Button**: A red "Logout" button appears in the header when logged in
- **Session Cleanup**: `beforeunload` event ensures session is cleared on page refresh/close

## How It Works

1. **Login**: University logs in → JWT token saved to `sessionStorage`
2. **Active Session**: Token remains valid while tab is open
3. **Close Tab/Window**: `sessionStorage` automatically clears → user is logged out
4. **Manual Logout**: Click "Logout" button → token removed → redirected to home

## Additional Fix: My Credentials Page

### Issue
The "My Credentials" page was automatically loading and displaying tokens even when users didn't explicitly request them. This happened because:
- When a wallet was connected, it auto-filled the address field
- Credentials were loaded automatically without user action

### Solution
Added a `hasLoaded` flag that requires users to explicitly click the "Load" button before credentials are fetched and displayed. Now:
- Connecting a wallet fills the address field but doesn't load credentials
- Users must click "Load" to view credentials
- Prevents accidental exposure of credential data

## Testing

To test the auto-logout feature:
1. Login as a university admin
2. Close the browser tab
3. Reopen the application
4. You should be logged out and need to login again

To test the My Credentials fix:
1. Connect your wallet
2. Navigate to "My Credentials"
3. Address field should be filled but no tokens displayed
4. Click "Load" button to view credentials

## Security Benefits

- Prevents unauthorized access if someone leaves their computer unattended
- Ensures sessions don't persist indefinitely
- Reduces risk of session hijacking
- Forces re-authentication for each browser session
- Prevents automatic display of sensitive credential data
