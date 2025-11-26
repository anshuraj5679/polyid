# Quick Fix Commands

## ⚡ Port 4001 Already in Use

### Quick Fix (One Command)
```bash
cd polyid/backend
npm run restart
```

This will:
1. Kill any process on port 4001
2. Start the backend

---

## 🔧 Manual Fix

### Option 1: Kill Port Script
```bash
cd polyid/backend
npm run kill-port
npm start
```

### Option 2: Windows Batch File
```cmd
cd polyid/backend
restart.bat
```

### Option 3: Mac/Linux Shell Script
```bash
cd polyid/backend
chmod +x restart.sh
./restart.sh
```

---

## 🎯 What Just Happened

### The Error:
```
❌ Port 4001 is already in use
💡 Try: kill the process using port 4001 or change PORT in .env
```

### The Fix:
```
✅ Killed process 13884
✅ Port 4001 is now free!
✅ Backend listening on http://localhost:4001
```

---

## ✅ Backend is Running When You See:

```
✅ Backend listening on http://localhost:4001
🏥 Health check: http://localhost:4001/api/health
📋 Contract status: DEPLOYED
```

**MongoDB warning is OK:**
```
⚠️  MongoDB not connected: ...
📝 Backend will work without MongoDB (limited functionality)
```

This means:
- ✅ Backend is working
- ✅ You can sign up and login
- ✅ Accounts stored in memory
- ⚠️ Data lost on restart (install MongoDB for permanent storage)

---

## 🚀 Quick Start Workflow

### Every Time You Start Development:

```bash
# Terminal 1 - Backend
cd polyid/backend
npm run restart

# Terminal 2 - Frontend
cd polyid/frontend
npm run dev
```

---

## 🔍 Check Backend is Working

### Method 1: Browser
Open: http://localhost:4001/api/health

Should show:
```json
{"ok":true}
```

### Method 2: Command Line
```bash
curl http://localhost:4001/api/health
```

---

## 🛑 Stop Backend

Press `Ctrl+C` in the terminal where backend is running

---

## 📝 Available Commands

### In `polyid/backend/`:

```bash
npm start          # Start backend
npm run kill-port  # Kill process on port 4001
npm run restart    # Kill port + start backend
npm run dev        # Start with auto-reload
```

---

## 🐛 Still Having Issues?

### Backend won't start after killing port?

**Check if port is really free:**
```bash
# Windows
netstat -ano | findstr :4001

# Mac/Linux
lsof -i :4001
```

**If still in use, manually kill:**
```bash
# Windows
taskkill /PID <PID> /F

# Mac/Linux
kill -9 <PID>
```

### Different error?

See:
- [FIX_PORT_ERROR.md](./FIX_PORT_ERROR.md) - Port issues
- [FIX_LOGIN_ISSUE.md](./FIX_LOGIN_ISSUE.md) - Login problems
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - All issues

---

## 💡 Pro Tips

### 1. Always Use Restart Command
```bash
npm run restart
```
This ensures port is free before starting.

### 2. Check Backend Logs
Look for these success indicators:
- ✅ Backend listening on http://localhost:4001
- ✅ Using real contract issue endpoint
- ✅ Contract status: DEPLOYED

### 3. MongoDB Warning is OK
You'll see:
```
⚠️  MongoDB not connected
📝 Backend will work without MongoDB
```
This is normal! Backend works fine without it.

### 4. Keep Terminal Open
Don't close the terminal where backend is running.

### 5. Use Two Terminals
- Terminal 1: Backend (`npm run restart`)
- Terminal 2: Frontend (`npm run dev`)

---

## 🎉 Success Checklist

- [ ] Port 4001 is free
- [ ] Backend started successfully
- [ ] See "Backend listening on http://localhost:4001"
- [ ] Health check works: http://localhost:4001/api/health
- [ ] Frontend can connect to backend
- [ ] Can sign up and login

---

## 📚 Related Documentation

- **Quick Start:** [QUICK_START.md](./QUICK_START.md)
- **Port Errors:** [FIX_PORT_ERROR.md](./FIX_PORT_ERROR.md)
- **Login Issues:** [FIX_LOGIN_ISSUE.md](./FIX_LOGIN_ISSUE.md)
- **All Issues:** [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- **Main Guide:** [README.md](./README.md)

---

**Your backend is now running! You can start using the application.** 🚀
