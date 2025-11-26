# ✅ Servers Running - Quick Guide

## 🎉 Both Servers Are Now Running!

### Backend Server ✅
- **Port:** 4001
- **URL:** http://localhost:4001
- **Status:** Running
- **Health Check:** http://localhost:4001/api/health

### Frontend Server ✅
- **Port:** 5174 (Note: Changed from 5173)
- **URL:** http://localhost:5174
- **Status:** Running
- **Access:** Open in browser

---

## 🚀 What to Do Now

### Step 1: Open Frontend
Open your browser and go to:
```
http://localhost:5174
```

### Step 2: Refresh the Page
Press `Ctrl + Shift + R` to hard refresh

### Step 3: Try Registration Again
Use the mock data:
```
University: IIT Kanpur
Email: iitkanpur@123.edu
Wallet: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1
Password: IITKanpur@2024
Confirm: IITKanpur@2024
```

### Step 4: Click "Create Account"
Should work now! ✅

---

## 🔍 Why Network Error Happened

### Root Cause:
Both backend and frontend servers were stopped.

### What We Fixed:
1. ✅ Killed process blocking port 4001
2. ✅ Restarted backend server
3. ✅ Started frontend server
4. ✅ Verified both are running

---

## 📊 Server Status

### Backend (Port 4001):
```
✅ Running
✅ MongoDB: Not required (using in-memory)
✅ Contract: Configured
✅ Health: OK
```

### Frontend (Port 5174):
```
✅ Running
✅ Vite dev server active
✅ Hot reload enabled
✅ Ready for connections
```

---

## 🔄 If Servers Stop Again

### Quick Restart Commands:

**Backend:**
```bash
cd polyid/backend
npm start
```

**Frontend:**
```bash
cd polyid/frontend
npm run dev
```

---

## 🎯 Testing Checklist

Now that servers are running:
- [ ] Open http://localhost:5174
- [ ] Try registration
- [ ] Try login
- [ ] Issue a credential
- [ ] View credentials

---

## 💡 Important Notes

### Port Change:
- Frontend moved from 5173 to 5174
- This is normal (port 5173 was in use)
- Use **5174** from now on

### Backend Port:
- Always on port 4001
- Don't change this

### Auto-Restart:
- Servers don't auto-restart
- Need manual restart if they stop
- Keep terminal windows open

---

## ✅ Verification

### Check Backend:
```bash
curl http://localhost:4001/api/health
```
Should return: `{"ok":true}`

### Check Frontend:
Open browser: http://localhost:5174
Should see the PolyID homepage

---

## 🚨 Common Issues

### Issue 1: "Cannot connect to backend"
**Fix:** Backend stopped, restart it

### Issue 2: "Page not loading"
**Fix:** Frontend stopped, restart it

### Issue 3: "Port already in use"
**Fix:** Kill the process using that port

---

## 🎉 You're All Set!

Both servers are running and ready to use:
- **Backend:** http://localhost:4001 ✅
- **Frontend:** http://localhost:5174 ✅

Try registering again - it should work now! 🚀
