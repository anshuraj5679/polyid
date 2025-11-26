# 🎓 My Credentials - Complete Guide

## ✅ What's New

The "My Credentials" page now displays **full credential details** including student name, institution, description, and all information stored on the blockchain!

---

## 🚀 How It Works

### Step 1: Issue a Credential
First, issue a credential to a student from the "Issue Credential" page.

### Step 2: View Student Credentials
Go to "My Credentials" page and enter the student's wallet address to see all their credentials with complete details.

---

## 📝 Complete Test Flow

### Part 1: Issue a Credential

1. **Login as IIT Kanpur**
   - Email: `iitkanpur@123.edu`
   - Password: (your password)

2. **Go to "Issue" Page**

3. **Fill the Form:**
   ```
   Student Wallet: 0x1234567890123456789012345678901234567890
   Student Name: Rajesh Kumar
   Course/Name: Bachelor of Technology in Computer Science
   Issued By: IIT Kanpur
   Description: 4-year undergraduate degree in Computer Science with AI specialization. CGPA 9.2
   Date: 2024-01-15
   ```

4. **Click "Issue"**
   - Wait for success message
   - Note the Token ID

### Part 2: View the Credential

1. **Go to "My Credentials" Page**

2. **Enter Student Wallet Address:**
   ```
   0x1234567890123456789012345678901234567890
   ```

3. **Uncheck "On-chain mode"** (for development testing)

4. **Click "Load"**

5. **See Complete Credential Details:**
   ```
   ┌──────────────────────────────────────────────────┐
   │ #1  Bachelor of Technology in Computer Science  │
   │ Token ID: 123456                            ✅   │
   │                                                  │
   │ Student Name                                     │
   │ 👤 Rajesh Kumar                                  │
   │                                                  │
   │ Issued By Institution                            │
   │ 🏛️ IIT Kanpur                                    │
   │                                                  │
   │ Date Issued                                      │
   │ 📅 January 15, 2024                              │
   │                                                  │
   │ Credential Description                           │
   │ 4-year undergraduate degree in Computer          │
   │ Science with AI specialization. CGPA 9.2         │
   │                                                  │
   │ Student Wallet Address                           │
   │ 0x1234...7890                                    │
   │                                                  │
   │ 🔗 View Metadata                                 │
   └──────────────────────────────────────────────────┘
   ```

---

## 🎯 Quick Test Data

### Student 1 - Rajesh Kumar
**Issue with:**
```
Wallet: 0x1234567890123456789012345678901234567890
Name: Rajesh Kumar
Course: Bachelor of Technology in Computer Science
Issued By: IIT Kanpur
Description: 4-year undergraduate degree in Computer Science with AI specialization. CGPA 9.2
Date: 2024-01-15
```

**View with:**
```
0x1234567890123456789012345678901234567890
```

---

### Student 2 - Priya Sharma
**Issue with:**
```
Wallet: 0x2345678901234567890123456789012345678901
Name: Priya Sharma
Course: Master of Technology in Data Science
Issued By: IIT Kanpur
Description: 2-year postgraduate program in Data Science and Analytics. CGPA 9.5
Date: 2024-02-20
```

**View with:**
```
0x2345678901234567890123456789012345678901
```

---

### Student 3 - Amit Patel
**Issue with:**
```
Wallet: 0x3456789012345678901234567890123456789012
Name: Amit Patel
Course: Bachelor of Technology in Electrical Engineering
Issued By: IIT Kanpur
Description: 4-year degree in Electrical Engineering with Power Systems focus. CGPA 8.8
Date: 2024-03-10
```

**View with:**
```
0x3456789012345678901234567890123456789012
```

---

## 📊 What You'll See

### Credential Card Shows:
1. **Sequential Number** - #1, #2, #3, etc.
2. **Credential Name** - Course/degree title
3. **Token ID** - Unique identifier
4. **Status Badge** - ✅ Active or ❌ Revoked
5. **Student Name** - Full name with 👤 icon
6. **Issued By** - Institution name with 🏛️ icon
7. **Date Issued** - Full formatted date with 📅 icon
8. **Description** - Complete credential details
9. **Student Wallet** - Ethereum address
10. **Metadata Link** - View on IPFS (if available)
11. **Explorer Link** - View on blockchain explorer

---

## 🔄 Complete Workflow

### Scenario: Student Receives Multiple Credentials

1. **Issue 3 Credentials to Same Student:**
   - Bachelor's Degree (2020)
   - Master's Degree (2022)
   - Professional Certificate (2024)

2. **Student Views All Credentials:**
   - Enter wallet address
   - Click "Load"
   - See all 3 credentials in chronological order

3. **Each Credential Shows:**
   - Complete details
   - Institution information
   - Dates and descriptions
   - Status (active/revoked)

---

## 💡 Features

### Beautiful Display
- ✅ Color-coded status badges
- ✅ Sequential numbering
- ✅ Icons for visual clarity
- ✅ Hover effects
- ✅ Responsive design

### Complete Information
- ✅ Student name prominently displayed
- ✅ Institution details
- ✅ Full descriptions
- ✅ Issue dates
- ✅ Wallet addresses
- ✅ Token IDs

### Easy Navigation
- ✅ One-click metadata viewing
- ✅ Direct blockchain explorer links
- ✅ Clear status indicators
- ✅ Organized layout

---

## 🎓 Use Cases

### For Students:
1. View all your earned credentials
2. Share your wallet address with employers
3. Verify credential authenticity
4. Track your academic achievements

### For Universities:
1. Issue credentials to students
2. Track issued credentials
3. Verify student records
4. Manage credential lifecycle

### For Employers:
1. Verify candidate credentials
2. Check credential authenticity
3. View complete academic history
4. Confirm institution details

---

## 🔍 Two Ways to View Credentials

### 1. My Credentials (Student View)
- Enter **student wallet address**
- See credentials **received by** that student
- Shows: Name, institution, description, dates

### 2. Issued Credentials (University View)
- Enter **university wallet address**
- See credentials **issued by** that university
- Shows: All students who received credentials

---

## ⚙️ Settings

### On-chain Mode
- ✅ **Checked**: Fetch from blockchain (production)
- ❌ **Unchecked**: Fetch from API (development)

For testing, **uncheck "On-chain mode"** to use in-memory storage.

---

## 📝 Step-by-Step Example

### Complete Test (5 minutes):

**Step 1: Issue Credential (2 min)**
```
1. Login as IIT Kanpur
2. Go to "Issue" page
3. Paste:
   - Wallet: 0x1234567890123456789012345678901234567890
   - Name: Rajesh Kumar
   - Course: Bachelor of Technology in Computer Science
   - Issued By: IIT Kanpur
   - Description: 4-year CS degree with AI specialization
   - Date: 2024-01-15
4. Click "Issue"
5. See success message
```

**Step 2: View Credential (1 min)**
```
1. Go to "My Credentials" page
2. Paste wallet: 0x1234567890123456789012345678901234567890
3. Uncheck "On-chain mode"
4. Click "Load"
5. See complete credential details!
```

**Step 3: Issue More Credentials (2 min)**
```
1. Go back to "Issue" page
2. Issue 2 more credentials to same student
3. Return to "My Credentials"
4. Click "Load" again
5. See all 3 credentials displayed!
```

---

## ✅ Expected Results

After issuing and viewing credentials, you should see:

```
My Credentials Page
├── Student Wallet Input
├── On-chain Mode Toggle
├── Load Button
└── Credentials List
    ├── Credential #1
    │   ├── Token ID
    │   ├── Status Badge (✅ Active)
    │   ├── Student Name (👤 Rajesh Kumar)
    │   ├── Institution (🏛️ IIT Kanpur)
    │   ├── Date (📅 January 15, 2024)
    │   ├── Description
    │   ├── Wallet Address
    │   └── Links (Metadata, Explorer)
    ├── Credential #2
    └── Credential #3
```

---

## 🎉 Benefits

### For Students:
- **Portfolio**: Digital credential portfolio
- **Verification**: Easy credential verification
- **Sharing**: Share wallet address with anyone
- **Permanent**: Credentials stored on blockchain

### For Universities:
- **Efficiency**: Instant credential issuance
- **Tracking**: Track all issued credentials
- **Verification**: Employers can verify directly
- **Transparency**: Blockchain-based transparency

### For Employers:
- **Quick Verification**: Instant credential checks
- **Authenticity**: Blockchain-verified credentials
- **Complete Info**: Full academic details
- **Trust**: Tamper-proof records

---

## 🔧 Technical Details

### Backend:
- Credentials stored in memory (development)
- Fetched by student wallet address
- Sorted by date (newest first)
- Full credential details included

### Frontend:
- Beautiful card-based display
- Responsive design
- Color-coded status
- Interactive elements

### Data Flow:
```
Issue Page → Backend Storage → My Credentials Page
     ↓              ↓                    ↓
  Form Data → In-Memory Map → Display Details
```

---

## 📱 Mobile Friendly

The credential display is fully responsive:
- Cards stack vertically on mobile
- Touch-friendly buttons
- Readable text sizes
- Optimized layout

---

## 🎯 Quick Reference

### Issue Credential:
1. Login as university
2. Fill form with student details
3. Click "Issue"

### View Credentials:
1. Go to "My Credentials"
2. Enter student wallet
3. Uncheck "On-chain mode" (dev)
4. Click "Load"

### See Full Details:
- Student name
- Institution
- Course/degree
- Description
- Date issued
- Wallet address
- Status

---

**Everything is ready! Issue a credential and view it on the My Credentials page!** 🚀
