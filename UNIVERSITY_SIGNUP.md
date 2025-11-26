# University Signup Guide

## Overview
Universities can now self-register on the PolyID platform to start issuing verifiable credentials to their students.

## How to Sign Up

### Step 1: Navigate to Sign Up Page
1. Open the PolyID application in your browser
2. Click on **"Sign Up"** in the navigation menu
3. Or click **"Sign up here"** link on the Login page

### Step 2: Fill in Registration Form
Complete all required fields:

#### University Name
- Enter your institution's full official name
- Example: `Massachusetts Institute of Technology`
- This will appear on all credentials you issue

#### Email Address
- Use your official university email address
- Example: `admin@university.edu`
- This will be your login username
- Must be a valid email format

#### Wallet Address
- Enter your university's Ethereum wallet address
- Must start with `0x` and be 42 characters long
- Example: `0x1234567890123456789012345678901234567890`
- This wallet will be used for blockchain transactions

#### Password
- Create a strong password (minimum 8 characters)
- Use a mix of letters, numbers, and special characters
- Example: `MySecurePass123!`

#### Confirm Password
- Re-enter your password to confirm
- Must match the password field exactly

### Step 3: Submit Registration
1. Review all information for accuracy
2. Click **"Create Account"** button
3. Wait for confirmation message
4. You'll be automatically redirected to the login page

### Step 4: Login
1. Enter your registered email and password
2. Click **"Login"**
3. You'll be redirected to the Issue Credential page
4. Start issuing credentials!

---

## Registration Form Example

```
University Name: Stanford University
Email Address: admin@stanford.edu
Wallet Address: 0x2345678901234567890123456789012345678901
Password: Stanford2024!
Confirm Password: Stanford2024!
```

---

## Validation Rules

### Email Address
- ✓ Must be valid email format (contains @ and domain)
- ✓ Example: `admin@university.edu`
- ✗ Invalid: `admin@university` (missing domain extension)

### Wallet Address
- ✓ Must start with `0x`
- ✓ Must be exactly 42 characters long
- ✓ Example: `0x1234567890123456789012345678901234567890`
- ✗ Invalid: `1234567890` (too short, missing 0x)

### Password
- ✓ Minimum 8 characters
- ✓ Recommended: Mix of uppercase, lowercase, numbers, symbols
- ✗ Invalid: `pass` (too short)

### All Fields Required
- All fields must be filled in
- Empty fields will show an error message

---

## Common Errors & Solutions

### "All fields are required"
**Problem:** One or more fields are empty  
**Solution:** Fill in all fields before submitting

### "Password must be at least 8 characters"
**Problem:** Password is too short  
**Solution:** Create a longer password (8+ characters)

### "Passwords do not match"
**Problem:** Password and Confirm Password fields don't match  
**Solution:** Make sure both password fields are identical

### "Please enter a valid email address"
**Problem:** Email format is incorrect  
**Solution:** Use format: `name@domain.com`

### "Please enter a valid Ethereum wallet address"
**Problem:** Wallet address format is incorrect  
**Solution:** 
- Must start with `0x`
- Must be 42 characters total
- Example: `0x1234567890123456789012345678901234567890`

### "Issuer exists" or "Email already registered"
**Problem:** An account with this email already exists  
**Solution:** 
- Use a different email address
- Or login with existing credentials
- Contact support if you forgot your password

---

## After Registration

### 1. Verify Your Account
- Check your email for verification (if email verification is enabled)
- Click the verification link

### 2. Subscribe to a Plan
- Navigate to the **Billing** page
- Choose a subscription plan
- Complete payment setup
- **Note:** Active subscription required to issue credentials

### 3. Start Issuing Credentials
- Go to **Issue** page
- Enter student wallet address
- Fill in credential details
- Upload supporting documents (optional)
- Click **Issue**

---

## Security Best Practices

### Password Security
- ✓ Use a unique password (don't reuse from other sites)
- ✓ Use a password manager
- ✓ Include uppercase, lowercase, numbers, and symbols
- ✓ Change password regularly
- ✗ Don't share your password
- ✗ Don't use simple passwords like "password123"

### Email Security
- ✓ Use official university email
- ✓ Enable two-factor authentication on your email
- ✓ Monitor for suspicious login attempts
- ✗ Don't use personal email addresses

### Wallet Security
- ✓ Use a hardware wallet for production
- ✓ Keep private keys secure
- ✓ Use multi-signature wallets for institutions
- ✓ Backup wallet recovery phrases
- ✗ Never share private keys
- ✗ Don't store private keys in plain text

---

## Quick Start After Signup

### Test Credential Issuance
1. **Login** with your new account
2. **Navigate** to Issue page
3. **Enter test student wallet:**
   ```
   0xA1B2C3D4E5F6789012345678901234567890ABCD
   ```
4. **Fill in details:**
   ```
   Course/Name: Test Certificate
   Issued By: Your University Name
   Description: Test credential for verification
   Date: 2024-11-19
   ```
5. **Click Issue**
6. **Verify** the credential was created

### Subscribe to a Plan
1. **Navigate** to Billing page
2. **Review** available plans
3. **Click** "Subscribe Monthly"
4. **Complete** payment (Stripe checkout)
5. **Verify** subscription status shows "Active"

---

## API Endpoint (For Developers)

### Registration Endpoint
```
POST /api/auth/seed
Content-Type: application/json

Body:
{
  "name": "University Name",
  "email": "admin@university.edu",
  "password": "securepassword",
  "walletAddress": "0x1234567890123456789012345678901234567890"
}

Response (Success):
{
  "issuer": {
    "_id": "...",
    "name": "University Name",
    "email": "admin@university.edu",
    "walletAddress": "0x1234...",
    "verified": true,
    "createdAt": "2024-11-19T..."
  }
}

Response (Error):
{
  "error": "Issuer exists"
}
```

---

## Troubleshooting

### Can't access signup page?
- Clear browser cache
- Try a different browser
- Check if JavaScript is enabled
- Verify backend is running

### Registration not working?
- Check all fields are filled correctly
- Verify internet connection
- Check browser console for errors
- Ensure backend API is accessible

### Not receiving confirmation?
- Check spam/junk folder
- Verify email address is correct
- Wait a few minutes and try again
- Contact support if issue persists

---

## Support

### Need Help?
- Check the documentation: `MOCK_DATA.md`, `QUICK_START.md`
- Review test scenarios: `TEST_SCENARIOS.md`
- Contact technical support
- Report issues on GitHub

### Forgot Password?
- Password reset feature (coming soon)
- Contact administrator for manual reset
- Create new account with different email (temporary solution)

---

## Next Steps After Signup

1. ✓ Complete registration
2. ✓ Login to your account
3. ✓ Subscribe to a plan (Billing page)
4. ✓ Issue your first credential
5. ✓ Verify credential on blockchain
6. ✓ Share credentials with students
7. ✓ Monitor subscription status
8. ✓ Manage billing details

---

## Features Available After Registration

### Credential Issuance
- Issue verifiable credentials to students
- Upload supporting documents
- Store metadata on IPFS
- Record on Polygon blockchain

### Credential Management
- View issued credentials
- Revoke credentials if needed
- Verify credential authenticity
- Export credential data

### Subscription Management
- View current plan
- Upgrade/downgrade plans
- Manage payment methods
- View billing history

### Account Settings
- Update university information
- Change password (coming soon)
- Manage wallet address
- View activity logs

---

## Production Considerations

### Before Going Live
- [ ] Use production wallet with real funds
- [ ] Set up proper email verification
- [ ] Configure production Stripe account
- [ ] Set up backup and recovery procedures
- [ ] Train staff on credential issuance
- [ ] Test thoroughly with test credentials
- [ ] Set up monitoring and alerts
- [ ] Prepare student communication materials

### Compliance
- Ensure GDPR/privacy compliance
- Follow educational credential standards
- Maintain audit logs
- Implement access controls
- Regular security audits
