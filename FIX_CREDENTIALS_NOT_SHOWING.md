# 🔧 Fix: Credentials Showing N/A

## ❌ Problem
Credentials are showing but details display as "N/A":
- Issued By Institution: N/A
- Date Issued: N/A
- Missing student name and description

## 🔍 Root Cause
The backend was restarted, which cleared the in-memory storage. Credentials need to be re-issued.

## ✅ Solution: Re-Issue Credentials

### Step 1: Login as University
```
Email: iitkanpur@123.edu
Password: IITKanpur@2024
```

### Step 2: Go to "Issue Credential" Page
Click "Issue" in the navigation menu

### Step 3: Issue a Credential
Use this complete data:

**Student Wallet Address:**
```
0x1234567890123456789012345678901234567890
```

**Student Name:**
```
Rajesh Kumar
```

**Course / Name:**
```
Bachelor of Technology in Computer Science
```

**Issued By:**
```
IIT Kanpur
```

**Description:**
```
4-year undergraduate degree in Computer Science with AI specialization. CGPA 9.2
```

**Date:**
```
2024-01-15
```

### Step 4: Click "Issue"
Wait for success message with Token ID

### Step 5: View on "My Credentials"
1. Go to "My Credentials" page
2. Enter student wallet: `0x1234567890123456789012345678901234567890`
3. **IMPORTANT: Uncheck "On-chain mode"**
4. Click "Load"

### Step 6: See Complete Details
You should now see:
```
✅ Student Name: 👤 Rajesh Kumar
✅ Issued By: 🏛️ IIT Kanpur
✅ Date Issued: 📅 January 15, 2024
✅ Description: Full text
✅ Status: Active
```

---

## 🎯 Quick Test Data

### Issue This Credential:
```
Student Wallet: 0x1234567890123456789012345678901234567890
Student Name: Rajesh Kumar
Course: Bachelor of Technology in Computer Science
Issued By: IIT Kanpur
Description: 4-year undergraduate degree in Computer Science with AI specialization. CGPA 9.2
Date: 2024-01-15
```

### Then View With:
```
Wallet: 0x1234567890123456789012345678901234567890
On-chain mode: ❌ UNCHECKED
```

---

## ⚠️ Important Notes

### 1. In-Memory Storage
- Credentials are stored in memory during development
- **Backend restart = data cleared**
- Need to re-issue credentials after restart

### 2. On-Chain Mode
- **Must be UNCHECKED** for development
- Checked = tries to read from blockchain
- Unchecked = reads from in-memory storage

### 3. Complete Form
- **All fields must be filled** when issuing
- Missing fields = N/A in display
- Especially important: Student Name, Issued By, Date

---

## 🔄 Complete Workflow

### 1. Issue Credential (University Side)
```
Login → Issue Page → Fill ALL fields → Click Issue → Success!
```

### 2. View Credential (Student Side)
```
My Credentials → Enter wallet → Uncheck on-chain → Load → See details!
```

---

## 📋 Checklist for Issuing

When issuing a credential, make sure ALL fields are filled:
- [ ] Student Wallet Address (42 chars, starts with 0x)
- [ ] Student Name (e.g., "Rajesh Kumar")
- [ ] Course / Name (e.g., "Bachelor of Technology...")
- [ ] Issued By (e.g., "IIT Kanpur")
- [ ] Description (full details)
- [ ] Date (YYYY-MM-DD format)

---

## 📋 Checklist for Viewing

When viewing credentials:
- [ ] Entered correct student wallet address
- [ ] **On-chain mode is UNCHECKED** ⚠️
- [ ] Clicked "Load" button
- [ ] Credential was issued AFTER last backend restart

---

## 🎓 Multiple Credentials Test

### Issue 3 Credentials to Same Student:

**Credential 1:**
```
Wallet: 0x1234567890123456789012345678901234567890
Name: Rajesh Kumar
Course: Bachelor of Technology in Computer Science
Issued By: IIT Kanpur
Description: 4-year CS degree with AI specialization. CGPA 9.2
Date: 2024-01-15
```

**Credential 2:**
```
Wallet: 0x1234567890123456789012345678901234567890
Name: Rajesh Kumar
Course: Machine Learning Certificate
Issued By: IIT Kanpur
Description: 6-month intensive ML program. Completed with distinction.
Date: 2024-06-20
```

**Credential 3:**
```
Wallet: 0x1234567890123456789012345678901234567890
Name: Rajesh Kumar
Course: Data Science Workshop
Issued By: IIT Kanpur
Description: 2-week workshop on Big Data and Analytics.
Date: 2024-09-10
```

Then view all 3 on "My Credentials" page!

---

## 🔍 Debugging Steps

### If Still Showing N/A:

**Step 1: Check Backend Logs**
Look for:
```
✅ Test credential issued: { tokenId: '123456', ... }
```

**Step 2: Check Browser Console**
Press F12 and look for:
- Network errors
- API response data
- Console logs

**Step 3: Verify API Response**
In browser console, check what data is returned:
```javascript
// Should see full credential object with all fields
{
  tokenId: "123456",
  studentName: "Rajesh Kumar",
  issuedBy: "IIT Kanpur",
  dateIssued: "2024-01-15",
  description: "...",
  ...
}
```

**Step 4: Check On-Chain Mode**
Make sure the checkbox is **UNCHECKED** ⚠️

---

## 💡 Why This Happens

### Development Mode:
- Uses in-memory storage (not database)
- Data cleared on backend restart
- Fast for testing but not persistent

### Production Mode:
- Uses blockchain (permanent storage)
- Data never lost
- Requires deployed smart contract

---

## ✅ Expected Result

After issuing and viewing, you should see:

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
└──────────────────────────────────────────────────┘
```

---

## 🚀 Quick Fix Summary

1. **Issue a new credential** with ALL fields filled
2. **Go to My Credentials** page
3. **Enter student wallet** address
4. **UNCHECK "On-chain mode"** ⚠️
5. **Click "Load"**
6. **See complete details!** ✅

---

**The backend is running. Just re-issue credentials and they'll show up with full details!** 🎉
