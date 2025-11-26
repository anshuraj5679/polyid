# Issued Credentials Lookup - Mock Data

## Test Scenario: View Credentials Issued by IIT Kanpur

### University Details
- **University Name:** IIT Kanpur
- **Email:** iitkanpur@123.edu
- **Wallet Address:** `0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1`
- **Password:** (your password)

---

## Mock Credentials Data

When you enter the wallet address `0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1` in the Issued Credentials page, you should see these credentials:

### Credential #1
- **Token ID:** 123456
- **Student Wallet:** `0x1234567890123456789012345678901234567890`
- **Credential Name:** Bachelor of Technology in Computer Science
- **Description:** 4-year undergraduate degree program in Computer Science and Engineering with specialization in AI/ML
- **Issued By:** IIT Kanpur
- **Date Issued:** January 15, 2024
- **Status:** ✅ Active

### Credential #2
- **Token ID:** 234567
- **Student Wallet:** `0x2345678901234567890123456789012345678901`
- **Credential Name:** Master of Technology in Data Science
- **Description:** 2-year postgraduate degree program specializing in Data Science and Analytics
- **Issued By:** IIT Kanpur
- **Date Issued:** February 20, 2024
- **Status:** ✅ Active

### Credential #3
- **Token ID:** 345678
- **Student Wallet:** `0x3456789012345678901234567890123456789012`
- **Credential Name:** Bachelor of Technology in Electrical Engineering
- **Description:** 4-year undergraduate degree in Electrical Engineering with focus on Power Systems
- **Issued By:** IIT Kanpur
- **Date Issued:** March 10, 2024
- **Status:** ✅ Active

### Credential #4
- **Token ID:** 456789
- **Student Wallet:** `0x4567890123456789012345678901234567890123`
- **Credential Name:** PhD in Artificial Intelligence
- **Description:** Doctoral research program in Artificial Intelligence and Machine Learning
- **Issued By:** IIT Kanpur
- **Date Issued:** April 5, 2024
- **Status:** ✅ Active

### Credential #5
- **Token ID:** 567890
- **Student Wallet:** `0x5678901234567890123456789012345678901234`
- **Credential Name:** Bachelor of Technology in Mechanical Engineering
- **Description:** 4-year undergraduate program in Mechanical Engineering with specialization in Robotics
- **Issued By:** IIT Kanpur
- **Date Issued:** May 18, 2024
- **Status:** ✅ Active

---

## How to Test

### Step 1: Issue Credentials (First Time Setup)
1. Login as IIT Kanpur university
2. Go to "Issue Credential" page
3. Issue credentials to the student wallet addresses listed above
4. Use the credential names and descriptions provided

### Step 2: View Issued Credentials
1. Go to "Issued Credentials" page
2. Enter wallet address: `0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1`
3. Click "Load" button
4. You should see all 5 credentials displayed sequentially

### Step 3: Use "My Wallet" Feature
1. Make sure you're logged in as IIT Kanpur
2. Connect your MetaMask wallet with address `0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1`
3. Click "Use My Wallet" button
4. Click "Load" to see your issued credentials

---

## Quick Issue Form Data

Copy and paste these into the Issue Credential form:

### Credential 1
```
Student Wallet: 0x1234567890123456789012345678901234567890
Name: Bachelor of Technology in Computer Science
Description: 4-year undergraduate degree program in Computer Science and Engineering with specialization in AI/ML
Issued By: IIT Kanpur
Date: 2024-01-15
```

### Credential 2
```
Student Wallet: 0x2345678901234567890123456789012345678901
Name: Master of Technology in Data Science
Description: 2-year postgraduate degree program specializing in Data Science and Analytics
Issued By: IIT Kanpur
Date: 2024-02-20
```

### Credential 3
```
Student Wallet: 0x3456789012345678901234567890123456789012
Name: Bachelor of Technology in Electrical Engineering
Description: 4-year undergraduate degree in Electrical Engineering with focus on Power Systems
Issued By: IIT Kanpur
Date: 2024-03-10
```

### Credential 4
```
Student Wallet: 0x4567890123456789012345678901234567890123
Name: PhD in Artificial Intelligence
Description: Doctoral research program in Artificial Intelligence and Machine Learning
Issued By: IIT Kanpur
Date: 2024-04-05
```

### Credential 5
```
Student Wallet: 0x5678901234567890123456789012345678901234
Name: Bachelor of Technology in Mechanical Engineering
Description: 4-year undergraduate program in Mechanical Engineering with specialization in Robotics
Issued By: IIT Kanpur
Date: 2024-05-18
```

---

## Expected Display

When you load the credentials, you should see:

```
┌─────────────────────────────────────────────────────┐
│ Credentials Issued by University    Total: 5 Credentials │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ #1  Bachelor of Technology in Computer Science  ✅ Active │
│ Token ID: 123456                                     │
│ Student: 0x1234...7890                              │
│ Issued By: IIT Kanpur                               │
│ Date: January 15, 2024                              │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ #2  Master of Technology in Data Science       ✅ Active │
│ Token ID: 234567                                     │
│ Student: 0x2345...8901                              │
│ Issued By: IIT Kanpur                               │
│ Date: February 20, 2024                             │
└─────────────────────────────────────────────────────┘

... and so on for all 5 credentials
```

---

## Testing Different Scenarios

### Scenario 1: Empty Results
- Enter a wallet address that hasn't issued any credentials
- Example: `0x9999999999999999999999999999999999999999`
- Expected: "No credentials issued by this university yet"

### Scenario 2: Invalid Address
- Leave the wallet address field empty
- Click "Load"
- Expected: "Please enter a wallet address"

### Scenario 3: Multiple Universities
- Create another university account
- Issue credentials from that account
- Search for both wallet addresses
- Verify each shows only their own issued credentials

---

## Notes

- All credentials are stored in memory during development
- When backend restarts, you'll need to re-issue the credentials
- The wallet address is case-insensitive
- Credentials are sorted by date (newest first)
- Each credential shows complete details in a sequential format
