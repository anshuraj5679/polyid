# Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Start the Application
```bash
# Terminal 1 - Backend
cd polyid/backend
npm start

# Terminal 2 - Frontend
cd polyid/frontend
npm run dev
```

### 2. Login or Sign Up

#### Option A: Use Test Account (Quick)
- Click "Login" in navigation
- Email: `admin@test.edu`
- Password: `password123`
- Click "Login"

#### Option B: Create New Account
- Click "Sign Up" in navigation
- Fill in:
  - University Name: `Your University`
  - Email: `admin@youruniversity.edu`
  - Wallet: `0x1234567890123456789012345678901234567890`
  - Password: `yourpassword` (min 8 chars)
  - Confirm Password: `yourpassword`
- Click "Create Account"
- Login with your new credentials

### 3. Issue a Credential
After login, you'll be on the "Issue" page:
- Student Wallet: `0xA1B2C3D4E5F6789012345678901234567890ABCD`
- Course/Name: `Computer Science Degree`
- Issued By: `Test University`
- Description: `Bachelor's degree in CS`
- Date: `2024-11-19`
- Click "Issue"

---

## 📋 Quick Reference

### Default Test Account
```
Email:    admin@test.edu
Password: password123
```

### Test Student Wallets
```
Student 1: 0xA1B2C3D4E5F6789012345678901234567890ABCD
Student 2: 0xB2C3D4E5F6789012345678901234567890ABCDEF
Student 3: 0xC3D4E5F6789012345678901234567890ABCDEF01
```

### Key Features
- ✓ Auto-logout when tab closes
- ✓ Subscription status in header
- ✓ Manual logout button
- ✓ Blockchain credential storage
- ✓ IPFS metadata storage

### Navigation
- **Home** - Landing page
- **Issue** - Issue new credentials (requires login)
- **My Credentials** - View credentials by wallet
- **Verify** - Verify credentials by address or token ID
- **Sign Up** - Register new university account (only visible when logged out)
- **Login** - Login page (shows "Account" when logged in)
- **Billing** - Subscription management (requires login)

---

## 🔍 Testing Checklist

### Signup Flow
- [ ] Click "Sign Up" in navigation
- [ ] Fill in all required fields
- [ ] Password validation works
- [ ] See success message
- [ ] Redirected to login page

### Login Flow
- [ ] Login with test account or new account
- [ ] See "Logout" button appear
- [ ] See subscription status badge
- [ ] Redirected to Issue page
- [ ] "Sign Up" button hidden when logged in

### Issue Credential
- [ ] Fill in student wallet address
- [ ] Fill in credential details
- [ ] Click "Issue" button
- [ ] See success message with token ID
- [ ] Copy transaction hash

### View Credentials
- [ ] Go to "My Credentials"
- [ ] Enter wallet address or connect wallet
- [ ] Click "Load" button
- [ ] See list of credentials
- [ ] Click "View Details" on a credential

### Verify Credential
- [ ] Go to "Verify" page
- [ ] Enter wallet address
- [ ] Click "Verify Address"
- [ ] See credential list
- [ ] Or enter token ID and click "Lookup Token"

### Logout
- [ ] Click "Logout" button
- [ ] Verify redirected to home
- [ ] Verify "Logout" button gone
- [ ] Try to access Issue page (should require login)

### Auto-Logout
- [ ] Login
- [ ] Close browser tab
- [ ] Reopen application
- [ ] Verify logged out

---

## 🛠️ Common Commands

### Backend
```bash
# Start backend
npm start

# Check if running
curl http://localhost:4001/api/health
```

### Frontend
```bash
# Start frontend
npm run dev

# Build for production
npm run build
```

### Create New Admin Account
```bash
curl -X POST http://localhost:4001/api/auth/seed \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My University",
    "email": "admin@myuni.edu",
    "password": "mypassword",
    "walletAddress": "0x1234567890123456789012345678901234567890"
  }'
```

---

## 📚 More Information

- **University Signup**: See `UNIVERSITY_SIGNUP.md`
- **Full Mock Data**: See `MOCK_DATA.md`
- **Test Scenarios**: See `TEST_SCENARIOS.md`
- **Auto-Logout Feature**: See `AUTO_LOGOUT.md`
- **Subscription Status**: See `SUBSCRIPTION_STATUS.md`

---

## ⚠️ Troubleshooting

**Can't login?**
- Check backend is running on port 4001
- Verify credentials are correct (case-sensitive)
- Check browser console for errors

**No credentials showing?**
- Make sure you clicked "Load" button
- Verify wallet address is correct
- Check if credentials exist for that address

**Subscription shows "No Subscription"?**
- This is normal for test accounts
- Go to Billing page to see subscription options
- Subscription is required to issue credentials in production

**Auto-logout not working?**
- Clear browser cache and sessionStorage
- Make sure you're using the latest code
- Check browser console for errors
