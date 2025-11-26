# 🔐 University Login - Mock Data

## 🚀 Quick Login (After Registration)

### IIT Kanpur ⭐ (Main Test Account)

**Email Address:**
```
iitkanpur@123.edu
```

**Password:**
```
IITKanpur@2024
```

---

## 📋 All Test Accounts (Complete Details)

### Account 1: IIT Kanpur ⭐
```
Email: iitkanpur@123.edu
Password: IITKanpur@2024
Wallet: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1
```

### Account 2: IIT Delhi
```
Email: iitdelhi@123.edu
Password: IITDelhi@2024
Wallet: 0x1234567890123456789012345678901234567890
```

### Account 3: IIT Bombay
```
Email: iitbombay@123.edu
Password: IITBombay@2024
Wallet: 0x2345678901234567890123456789012345678901
```

### Account 4: MIT
```
Email: mit@123.edu
Password: MIT@2024Pass
Wallet: 0x3456789012345678901234567890123456789012
```

### Account 5: Stanford
```
Email: stanford@123.edu
Password: Stanford@2024
Wallet: 0x4567890123456789012345678901234567890123
```

### Account 6: Harvard
```
Email: harvard@123.edu
Password: Harvard@2024
Wallet: 0x5678901234567890123456789012345678901234
```

### Account 7: Oxford
```
Email: oxford@123.edu
Password: Oxford@2024
Wallet: 0x6789012345678901234567890123456789012345
```

### Account 8: Cambridge
```
Email: cambridge@123.edu
Password: Cambridge@2024
Wallet: 0x7890123456789012345678901234567890123456
```

---

## 🎯 Step-by-Step Login

### Step 1: Email Address
Copy and paste:
```
iitkanpur@123.edu
```

### Step 2: Password
Copy and paste:
```
IITKanpur@2024
```

### Step 3: Click "Login"
You'll be redirected to the dashboard/home page

---

## 📊 Quick Reference Table

| University | Email | Password | Wallet (Last 4) |
|------------|-------|----------|----------------|
| IIT Kanpur | iitkanpur@123.edu | IITKanpur@2024 | ...bEb1 |
| IIT Delhi | iitdelhi@123.edu | IITDelhi@2024 | ...7890 |
| IIT Bombay | iitbombay@123.edu | IITBombay@2024 | ...8901 |
| MIT | mit@123.edu | MIT@2024Pass | ...9012 |
| Stanford | stanford@123.edu | Stanford@2024 | ...0123 |
| Harvard | harvard@123.edu | Harvard@2024 | ...1234 |
| Oxford | oxford@123.edu | Oxford@2024 | ...2345 |
| Cambridge | cambridge@123.edu | Cambridge@2024 | ...3456 |

---

## 🔄 Complete Workflow

### First Time User:

**Step 1: Register**
1. Click "Sign Up" or "Create Account"
2. Fill registration form
3. Submit

**Step 2: Login**
1. Use email and password from registration
2. Click "Login"
3. Access dashboard

### Returning User:

**Step 1: Login**
1. Enter email
2. Enter password
3. Click "Login"

---

## ⚡ Super Quick Test

Just copy these 2 lines:

**Email:**
```
iitkanpur@123.edu
```

**Password:**
```
IITKanpur@2024
```

Then click "Login"! ✅

---

## 💡 Field Requirements

### Email Address:
- ✅ Must include `@`
- ✅ Must match registered email
- ✅ Example: `iitkanpur@123.edu`
- ❌ Invalid: `iitkanpur` (missing @)

### Password:
- ✅ Must match registered password
- ✅ Case-sensitive
- ✅ Example: `IITKanpur@2024`
- ❌ Invalid: `iitkanpur@2024` (wrong case)

---

## ⚠️ Common Issues

### Issue 1: "Invalid credentials"
**Cause:** Email or password is wrong
**Fix:** 
- Check spelling
- Check case (passwords are case-sensitive)
- Make sure you registered first

### Issue 2: "User not found"
**Cause:** Account doesn't exist
**Fix:** 
- Register first using the signup page
- Use correct email address

### Issue 3: Network error
**Cause:** Backend not running
**Fix:** 
- Check backend is running on port 4001
- Restart backend if needed

---

## 🎓 Test Scenarios

### Scenario 1: First Time Login
1. Register with IIT Kanpur data
2. Login with same credentials
3. Access dashboard
4. Issue credentials

### Scenario 2: Multiple Universities
1. Register IIT Kanpur
2. Login as IIT Kanpur
3. Logout
4. Register IIT Delhi
5. Login as IIT Delhi
6. Test different accounts

### Scenario 3: Session Persistence
1. Login as IIT Kanpur
2. Navigate to different pages
3. Session should persist
4. Close browser
5. Reopen - should need to login again (auto-logout feature)

---

## 🔐 After Login

### What You Can Do:
1. **Issue Credentials** - Go to "Issue" page
2. **View Issued Credentials** - See all credentials you've issued
3. **Manage Account** - Update profile
4. **View Billing** - Check subscription status
5. **Logout** - End session

---

## 📝 Login vs Registration

### Registration (First Time):
```
Fields: University Name, Email, Wallet, Password, Confirm Password
Purpose: Create new account
Result: Account created, redirect to login
```

### Login (Returning):
```
Fields: Email, Password
Purpose: Access existing account
Result: Logged in, redirect to dashboard
```

---

## ✅ Successful Login Indicators

After successful login, you should see:
- ✅ Redirected to home/dashboard page
- ✅ University name displayed in header
- ✅ Navigation menu accessible
- ✅ "Logout" button visible
- ✅ Wallet address shown (if connected)

---

## 🎯 Quick Login Test

**Fastest way to test login:**

1. Make sure you registered first
2. Copy email: `iitkanpur@123.edu`
3. Copy password: `IITKanpur@2024`
4. Click "Login"
5. Done! ✅

---

## 🔄 If You Forgot Password

Currently in development mode:
1. Check the registration mock data file
2. Or register a new account
3. Production will have password reset feature

---

## 📱 Login from Different Devices

The same credentials work from:
- Desktop browser
- Mobile browser
- Different computers
- Different browsers

Just use the same email and password!

---

## 🎉 After Successful Login

### Next Steps:
1. **Issue Your First Credential**
   - Go to "Issue" page
   - Fill the form
   - Click "Issue"

2. **View Issued Credentials**
   - Go to "Issued Credentials" page
   - Enter your university wallet
   - See all credentials

3. **Check Subscription**
   - Go to "Billing" page
   - View subscription status
   - Activate if needed

---

## 🔒 Security Notes

### Development Mode:
- Sessions stored in sessionStorage
- Auto-logout on browser close
- No persistent sessions

### Production Mode:
- Secure JWT tokens
- HTTPS required
- Session management
- Password encryption

---

## ✅ Login Checklist

Before clicking "Login":
- [ ] Registered an account first
- [ ] Email is correct
- [ ] Password is correct (case-sensitive)
- [ ] Backend is running (port 4001)
- [ ] Frontend is running (port 5173)

---

## 🚀 Quick Reference

### Main Test Account (IIT Kanpur):
```
Email: iitkanpur@123.edu
Password: IITKanpur@2024
Wallet: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1
```

### After Login:
- Issue credentials
- View issued credentials (use wallet: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1)
- Manage account
- Check billing

---

## 📋 Complete University Wallet Addresses

### For "Issued Credentials" Page:

**IIT Kanpur:**
```
0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1
```

**IIT Delhi:**
```
0x1234567890123456789012345678901234567890
```

**IIT Bombay:**
```
0x2345678901234567890123456789012345678901
```

**MIT:**
```
0x3456789012345678901234567890123456789012
```

**Stanford:**
```
0x4567890123456789012345678901234567890123
```

**Harvard:**
```
0x5678901234567890123456789012345678901234
```

**Oxford:**
```
0x6789012345678901234567890123456789012345
```

**Cambridge:**
```
0x7890123456789012345678901234567890123456
```

---

**Ready to login! Use IIT Kanpur credentials for best results!** 🎓
