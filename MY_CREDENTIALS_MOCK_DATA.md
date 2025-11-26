# My Credentials Page - Mock Data

## 📋 What This Page Does

The "My Credentials" page allows you to:
- View all credentials for a specific wallet address
- Search by wallet address
- See credential details
- Verify credentials on blockchain

---

## 🎯 **Quick Copy Wallet Addresses**

### Student Wallet Addresses (Use These):

```
0xA1B2C3D4E5F6789012345678901234567890ABCD
```

```
0xB2C3D4E5F6789012345678901234567890ABCDEF
```

```
0xC3D4E5F6789012345678901234567890ABCDEF01
```

```
0xD4E5F6789012345678901234567890ABCDEF0123
```

```
0xE5F6789012345678901234567890ABCDEF012345
```

---

## 📝 **How to Use This Page**

### Step 1: Enter Wallet Address
```
1. Copy a wallet address from above
2. Paste into "Wallet Address" field
3. Make sure "On-chain mode" is checked
4. Click "Load" button
```

### Step 2: View Results
```
If credentials exist:
✅ Shows list of credentials
✅ Token IDs displayed
✅ "View Details" button for each
✅ "Explorer" link to blockchain

If no credentials:
ℹ️ "No credentials found"
```

---

## 🧪 **Test Scenarios**

### Scenario 1: View Credentials You Just Issued

```
1. Remember the student wallet you used when issuing
2. Paste that wallet address here
3. Click "Load"
4. Should see the credential you just issued!
```

**Example:**
```
If you issued to: 0xA1B2C3D4E5F6789012345678901234567890ABCD
Then search for: 0xA1B2C3D4E5F6789012345678901234567890ABCD
Result: Shows that credential ✅
```

---

### Scenario 2: Empty Wallet (No Credentials)

```
Wallet Address: 0xF6789012345678901234567890ABCDEF01234567
Result: "No credentials found"
```

This is normal if no credentials have been issued to this address yet.

---

### Scenario 3: Multiple Credentials

```
1. Issue 3 credentials to same wallet:
   - Computer Science Degree
   - Machine Learning Certificate
   - Data Science Certificate

2. Search for that wallet
3. Should see all 3 credentials listed!
```

---

## 🔍 **What You'll See**

### When Credentials Exist:

```
┌─────────────────────────────────────┐
│  Token #1                           │
│  Metadata available                 │
│  [View Details] [Explorer]          │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  Token #2                           │
│  Metadata available                 │
│  [View Details] [Explorer]          │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  Token #3                           │
│  Metadata available                 │
│  [View Details] [Explorer]          │
└─────────────────────────────────────┘
```

### When No Credentials:

```
┌─────────────────────────────────────┐
│  No credentials found.              │
└─────────────────────────────────────┘
```

---

## 💡 **Understanding the Fields**

### Wallet Address Field:
- **What to enter:** Ethereum wallet address (42 characters starting with 0x)
- **Example:** `0xA1B2C3D4E5F6789012345678901234567890ABCD`
- **Purpose:** Search for all credentials issued to this address

### On-chain Mode Checkbox:
- **Checked (✓):** Searches blockchain directly (more accurate)
- **Unchecked:** Searches API/database (faster)
- **Recommended:** Keep it checked

### Load Button:
- **Purpose:** Fetches credentials for the entered address
- **Important:** Must click this button to see results!

---

## 🎓 **Complete Test Flow**

### Full Test Scenario:

**Step 1: Issue a Credential**
```
Go to "Issue" page
Student Wallet: 0xA1B2C3D4E5F6789012345678901234567890ABCD
Course: Computer Science Degree
Issued By: MIT
Description: Test credential
Date: 2024-11-19
Click "Issue"
✅ Success! Token ID: 1
```

**Step 2: View the Credential**
```
Go to "My Credentials" page
Wallet Address: 0xA1B2C3D4E5F6789012345678901234567890ABCD
Check "On-chain mode"
Click "Load"
✅ Should see Token #1!
```

**Step 3: View Details**
```
Click "View Details" button
See full credential information:
- Course name
- Issued by
- Description
- Date
- Metadata
```

**Step 4: View on Blockchain**
```
Click "Explorer" button
Opens Polygon blockchain explorer
See transaction details
Verify on blockchain ✅
```

---

## 📊 **Sample Wallet Addresses with Expected Results**

### Wallet 1 (If you issued credentials):
```
Address: 0xA1B2C3D4E5F6789012345678901234567890ABCD
Expected: Shows credentials you issued to this address
```

### Wallet 2 (Empty):
```
Address: 0x0000000000000000000000000000000000000001
Expected: "No credentials found" (unless you issued to this address)
```

### Wallet 3 (Your Connected Wallet):
```
If you connected MetaMask:
- Your wallet address appears automatically
- Shows credentials issued to YOUR wallet
```

---

## 🔄 **Connect Wallet Feature**

### Option 1: Manual Entry
```
1. Type/paste wallet address
2. Click "Load"
```

### Option 2: Connect Wallet (If Available)
```
1. Click "Connect Wallet" button (top right)
2. Connect MetaMask
3. Your address auto-fills
4. Click "Load"
```

---

## ⚠️ **Common Issues**

### Issue 1: "No credentials found"

**Possible Reasons:**
- No credentials issued to this address yet
- Wrong wallet address
- Blockchain not synced yet (wait a moment)

**Solution:**
- Double-check wallet address
- Make sure you issued credentials to this address
- Try clicking "Load" again

---

### Issue 2: Loading Forever

**Possible Reasons:**
- Blockchain connection slow
- Network issues
- Invalid wallet address

**Solution:**
- Check wallet address format (0x + 40 characters)
- Refresh page
- Try again

---

### Issue 3: Can't Click Load

**Possible Reasons:**
- Wallet address field is empty
- Invalid format

**Solution:**
- Enter a valid wallet address
- Must start with 0x
- Must be 42 characters total

---

## 🎯 **Quick Test Data**

### Test Set 1: Single Credential
```
1. Issue credential to: 0xA1B2C3D4E5F6789012345678901234567890ABCD
2. Search for: 0xA1B2C3D4E5F6789012345678901234567890ABCD
3. Result: 1 credential found ✅
```

### Test Set 2: Multiple Credentials
```
1. Issue 3 credentials to: 0xB2C3D4E5F6789012345678901234567890ABCDEF
2. Search for: 0xB2C3D4E5F6789012345678901234567890ABCDEF
3. Result: 3 credentials found ✅
```

### Test Set 3: Empty Wallet
```
1. Search for: 0xF6789012345678901234567890ABCDEF01234567
2. Result: No credentials found ℹ️
```

---

## 📱 **What Each Button Does**

### Load Button:
```
Purpose: Fetch credentials for entered address
Action: Queries blockchain/database
Result: Shows list of credentials
```

### View Details Button:
```
Purpose: See full credential information
Action: Opens modal with details
Shows: Course, issuer, description, date, metadata
```

### Explorer Button:
```
Purpose: View on blockchain explorer
Action: Opens Polygon blockchain explorer
Shows: Transaction details, token info, verification
```

---

## ✅ **Success Indicators**

### Credentials Found:
```
✅ List of credentials appears
✅ Token IDs shown
✅ "View Details" buttons visible
✅ "Explorer" links available
✅ Metadata status shown
```

### No Credentials:
```
ℹ️ "No credentials found" message
ℹ️ This is normal for new/empty wallets
```

### Loading:
```
⏳ "Loading..." indicator
⏳ Wait for results
```

---

## 🎓 **Real-World Use Cases**

### Use Case 1: Student Checking Their Credentials
```
Student has wallet: 0xA1B2...ABCD
University issued degree to this wallet
Student enters their wallet address
Sees their degree credential ✅
Can share with employers
```

### Use Case 2: Employer Verifying Credentials
```
Candidate claims degree from MIT
Provides wallet address: 0xB2C3...CDEF
Employer enters address here
Verifies credential exists ✅
Checks issuer is MIT ✅
Checks not revoked ✅
```

### Use Case 3: University Checking Issued Credentials
```
University wants to verify what they issued
Enters student wallet address
Sees all credentials issued to that student
Can revoke if needed
```

---

## 💡 **Pro Tips**

1. **Always click "Load"** - Results don't appear automatically
2. **Keep "On-chain mode" checked** - More accurate
3. **Copy wallet addresses carefully** - One wrong character = wrong results
4. **Wait for loading** - Blockchain queries take a moment
5. **Use "View Details"** - See full credential information
6. **Check "Explorer"** - Verify on blockchain

---

## 📚 **Related Pages**

- **Issue Credential:** Create new credentials
- **Verify:** Verify credentials by address or token ID
- **My Credentials:** View credentials (this page)

---

**Just paste a wallet address and click "Load" to see credentials!** 🔍
