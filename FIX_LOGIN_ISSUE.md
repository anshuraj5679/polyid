# Fix: "Invalid Credentials" After Signup

## The Problem

You successfully signed up but get "Invalid credentials" when trying to login with the same email and password.

**Why this happens:**
- MongoDB is not running
- Signup returned success but didn't actually save your account
- Login couldn't find your account

## ✅ The Fix (Already Applied)

I've updated the authentication system to use **in-memory storage** when MongoDB is not available. This means:
- ✅ Signups are now saved in server memory
- ✅ Login will find your newly created account
- ✅ Works without MongoDB running
- ⚠️ Data is lost when server restarts (development only)

## 🔄 How to Apply the Fix

### Step 1: Restart the Backend

```bash
# Stop the backend (Ctrl+C)
# Then restart it
cd polyid/backend
npm start
```

You should see:
```
[auth] Created issuer in-memory: admin@test.edu
[auth] Total in-memory users: 1
```

### Step 2: Sign Up Again

1. Go to Sign Up page
2. Fill in the form (use fresh data or same as before)
3. Click "Create Account"
4. Wait for success message

### Step 3: Login

1. Go to Login page
2. Enter the **exact same** email and password you just used
3. Click "Login"
4. Should work now! ✅

## 🧪 Test It Works

### Quick Test:

**Sign Up:**
```
University Name: Test University
Email: test@example.edu
Wallet: 0x1234567890123456789012345678901234567890
Password: Test@2024
Confirm: Test@2024
```

**Login:**
```
Email: test@example.edu
Password: Test@2024
```

Should login successfully! ✅

## 📝 Important Notes

### In-Memory Storage Limitations

⚠️ **Data is temporary:**
- Accounts are stored in server memory
- Lost when you restart the backend
- Only for development/testing

⚠️ **To keep accounts permanently:**
- Install and run MongoDB
- Accounts will be saved to database
- Persist across server restarts

### Default Test Account

This account always works (even after restart):
```
Email: admin@test.edu
Password: password123
```

## 🔍 Verify the Fix

### Check Backend Logs

When you sign up, you should see:
```
[auth] Created issuer in-memory: your@email.edu
[auth] Total in-memory users: 2
```

When you login, you should see:
```
[auth] Login successful for: your@email.edu (in-memory)
```

### Check It's Working

1. **Sign up** with new account
2. **See success message**
3. **Login** with same credentials
4. **Should work!** ✅

## 🐛 Still Having Issues?

### Issue: Still getting "Invalid credentials"

**Check:**
1. Did you restart the backend after the fix?
2. Are you using the **exact same** email and password?
3. Check backend terminal for error messages

**Solution:**
```bash
# Kill and restart backend
cd polyid/backend
npm run kill-port
npm start

# Try signup again
```

### Issue: "Issuer exists" error

**This means:**
- Account already created (good!)
- Just go to login page
- Use those credentials

### Issue: Backend not starting

See [FIX_PORT_ERROR.md](./FIX_PORT_ERROR.md)

## 💾 Want Permanent Storage?

### Install MongoDB (Optional)

**Windows:**
1. Download: https://www.mongodb.com/try/download/community
2. Install MongoDB Community Server
3. Start MongoDB service:
   ```cmd
   net start MongoDB
   ```

**Mac:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**
```bash
sudo apt-get install mongodb
sudo systemctl start mongod
```

### Verify MongoDB is Running

```bash
# Check if MongoDB is accessible
mongosh
# or
mongo
```

### Restart Backend

Once MongoDB is running:
```bash
cd polyid/backend
npm start
```

You should see:
```
✅ MongoDB connected
```

Now all signups will be saved permanently!

## 🎯 Summary

### Before Fix:
- ❌ Signup succeeded but didn't save account
- ❌ Login failed with "Invalid credentials"
- ❌ Only default test account worked

### After Fix:
- ✅ Signup saves account in memory
- ✅ Login finds your account
- ✅ All new signups work
- ✅ Default test account still works
- ⚠️ Accounts lost on server restart (use MongoDB for permanent storage)

## ✅ Success Indicators

### Signup Success:
```
✓ Registration Successful!
Your account has been created. Redirecting to login...
```

### Backend Log (Signup):
```
[auth] Created issuer in-memory: your@email.edu
[auth] Total in-memory users: 2
```

### Login Success:
```
(Redirects to Issue page)
(Shows Logout button)
(Shows subscription status)
```

### Backend Log (Login):
```
[auth] Login successful for: your@email.edu (in-memory)
```

## 🔄 Testing Workflow

### Test 1: New Account
1. Restart backend
2. Sign up with new email
3. Login with same credentials
4. ✅ Should work

### Test 2: Multiple Accounts
1. Sign up account 1
2. Login with account 1 ✅
3. Logout
4. Sign up account 2
5. Login with account 2 ✅
6. Logout
7. Login with account 1 again ✅

### Test 3: After Restart
1. Sign up account
2. Login ✅
3. Restart backend
4. Login with same account ❌ (account lost)
5. Sign up again
6. Login ✅

## 💡 Pro Tips

1. **Use default test account** for quick testing:
   - Email: `admin@test.edu`
   - Password: `password123`

2. **Keep backend running** to keep accounts in memory

3. **Install MongoDB** for permanent storage

4. **Check backend logs** to see what's happening

5. **Restart backend** if something seems wrong

---

**The fix is already applied! Just restart your backend and try again.** 🚀
