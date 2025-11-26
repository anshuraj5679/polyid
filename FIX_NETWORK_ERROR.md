# Fix: Network Error

## ❌ The Problem

You see "Network Error" when trying to:
- Sign up
- Login
- Issue credentials
- Any other action

## 🎯 The Cause

**Backend is not running!**

The frontend (React app) can't connect to the backend (Node.js server) because the backend isn't started.

---

## ✅ Quick Fix

### Step 1: Start the Backend

```bash
cd polyid/backend
npm start
```

### Step 2: Verify It's Running

You should see:
```
✅ Backend listening on http://localhost:4001
🏥 Health check: http://localhost:4001/api/health
```

### Step 3: Try Again

Go back to your browser and try the action again. Network error should be gone!

---

## 🔍 How to Check if Backend is Running

### Method 1: Look for Terminal Output

Check your terminal for:
```
✅ Backend listening on http://localhost:4001
```

### Method 2: Open in Browser

Visit: http://localhost:4001/api/health

Should show:
```json
{"ok":true}
```

### Method 3: Check Terminal

Look for a terminal window running the backend with output like:
```
> polyid-backend@1.0.0 start
> node start-backend.js
✅ Backend listening on http://localhost:4001
```

---

## 🚀 Proper Startup Sequence

### Always Start Backend First!

```bash
# Terminal 1 - Backend (Start FIRST)
cd polyid/backend
npm start

# Wait for: ✅ Backend listening on http://localhost:4001

# Terminal 2 - Frontend (Start SECOND)
cd polyid/frontend
npm run dev
```

---

## 🐛 Common Scenarios

### Scenario 1: Backend Never Started

**Symptoms:**
- Network Error on all actions
- Can't sign up, login, or do anything

**Solution:**
```bash
cd polyid/backend
npm start
```

---

### Scenario 2: Backend Crashed

**Symptoms:**
- Was working, now Network Error
- Backend terminal shows error or closed

**Solution:**
```bash
cd polyid/backend
npm run restart
```

---

### Scenario 3: Port Already in Use

**Symptoms:**
- Backend won't start
- Error: "Port 4001 is already in use"

**Solution:**
```bash
cd polyid/backend
npm run kill-port
npm start
```

---

### Scenario 4: Wrong Port

**Symptoms:**
- Backend running on different port
- Frontend looking at wrong port

**Check:**
```bash
# Backend .env
PORT=4001

# Frontend .env
VITE_API_BASE=http://localhost:4001
```

**Both should match!**

---

## 📊 Network Error vs Other Errors

### Network Error:
```
❌ Network Error
Cause: Backend not running
Solution: Start backend
```

### Invalid Credentials:
```
❌ Invalid credentials
Cause: Wrong email/password
Solution: Check credentials
```

### Subscription Error:
```
❌ Failed to verify subscription
Cause: Subscription check issue
Solution: Already fixed (bypassed in dev mode)
```

### Validation Error:
```
❌ All fields are required
Cause: Empty fields
Solution: Fill all fields
```

---

## 🔄 Restart Everything

If nothing works, restart both:

```bash
# Stop everything (Ctrl+C in all terminals)

# Terminal 1 - Backend
cd polyid/backend
npm run restart

# Terminal 2 - Frontend
cd polyid/frontend
npm run dev
```

---

## ✅ Success Indicators

### Backend Running:
```
✅ Backend listening on http://localhost:4001
✅ Health check works
✅ No "Network Error" in frontend
```

### Frontend Running:
```
✅ Opens in browser
✅ Shows PolyID interface
✅ Can navigate pages
```

### Both Connected:
```
✅ Can sign up
✅ Can login
✅ Can issue credentials
✅ No network errors
```

---

## 💡 Pro Tips

### 1. Always Check Backend First
When you see "Network Error", first check if backend is running.

### 2. Keep Backend Terminal Open
Don't close the terminal where backend is running.

### 3. Use Two Terminals
- Terminal 1: Backend (keep running)
- Terminal 2: Frontend (keep running)

### 4. Check Logs
Backend terminal shows useful error messages.

### 5. Restart When in Doubt
```bash
npm run restart
```

---

## 🎯 Quick Checklist

When you see "Network Error":

- [ ] Is backend running?
- [ ] Check terminal for "Backend listening"
- [ ] Visit http://localhost:4001/api/health
- [ ] If not running, start it: `npm start`
- [ ] Try action again
- [ ] Still not working? Restart both servers

---

## 📚 Related Issues

- **Port Error:** See [FIX_PORT_ERROR.md](./FIX_PORT_ERROR.md)
- **Login Error:** See [FIX_LOGIN_ISSUE.md](./FIX_LOGIN_ISSUE.md)
- **All Issues:** See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- **Quick Fix:** See [QUICK_FIX.md](./QUICK_FIX.md)

---

## 🆘 Still Having Issues?

### Check These:

1. **Backend Port:**
   ```bash
   # Should be 4001
   echo $PORT  # Mac/Linux
   echo %PORT% # Windows
   ```

2. **Frontend API URL:**
   ```bash
   # Check frontend/.env
   VITE_API_BASE=http://localhost:4001
   ```

3. **Firewall:**
   - Allow Node.js through firewall
   - Allow port 4001

4. **Antivirus:**
   - May block local servers
   - Add exception for Node.js

---

**Backend is now running! Try your action again.** 🚀
