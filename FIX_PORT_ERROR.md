# Fix Port Error - Quick Guide

## The Error You're Seeing

```
ERR_SOCKET_BAD_PORT
Failed running 'start-backend.js'
```

This means port 4001 is already being used by another process.

---

## Quick Fix (Choose One)

### Option 1: Use the Kill Port Script (Easiest)

```bash
cd polyid/backend
npm run kill-port
npm start
```

This will automatically find and kill any process using port 4001.

---

### Option 2: Manual Kill (Windows)

```cmd
# Find the process
netstat -ano | findstr :4001

# Kill it (replace <PID> with the number from above)
taskkill /PID <PID> /F

# Start backend
npm start
```

**Example:**
```cmd
C:\> netstat -ano | findstr :4001
  TCP    0.0.0.0:4001    0.0.0.0:0    LISTENING    12345

C:\> taskkill /PID 12345 /F
SUCCESS: The process with PID 12345 has been terminated.

C:\> npm start
```

---

### Option 3: Manual Kill (Mac/Linux)

```bash
# Find and kill the process
lsof -ti:4001 | xargs kill -9

# Start backend
npm start
```

---

### Option 4: Change the Port

If you want to use a different port:

1. Edit `polyid/backend/.env`:
```env
PORT=4002
```

2. Edit `polyid/frontend/.env`:
```env
VITE_API_BASE=http://localhost:4002
```

3. Restart both servers

---

## Step-by-Step Solution

### Step 1: Stop Everything
- Press `Ctrl+C` in all terminal windows
- Close any running Node processes

### Step 2: Kill Port 4001
```bash
cd polyid/backend
npm run kill-port
```

### Step 3: Start Backend
```bash
npm start
```

You should see:
```
✅ Backend listening on http://localhost:4001
```

### Step 4: Start Frontend (New Terminal)
```bash
cd polyid/frontend
npm run dev
```

---

## Why This Happens

Common causes:
1. **Previous server didn't stop properly** - Most common
2. **Another app using port 4001** - Less common
3. **Multiple terminals running the server** - Check all terminals

---

## Prevention

### Always Stop Servers Properly
- Use `Ctrl+C` to stop servers
- Don't just close the terminal
- Check no processes are running before starting

### Use the Kill Script Before Starting
```bash
npm run kill-port && npm start
```

### Check What's Running
```bash
# Windows
netstat -ano | findstr :4001

# Mac/Linux  
lsof -i :4001
```

---

## Still Not Working?

### Try a Complete Reset

```bash
# 1. Kill all Node processes
# Windows: Open Task Manager, end all Node.js processes
# Mac/Linux: killall node

# 2. Clear everything
cd polyid/backend
rm -rf node_modules
npm install

# 3. Start fresh
npm run kill-port
npm start
```

### Check for Other Issues

1. **Is Node.js installed?**
   ```bash
   node --version
   ```
   Should show v18 or higher

2. **Are dependencies installed?**
   ```bash
   cd polyid/backend
   npm install
   ```

3. **Is .env file present?**
   ```bash
   # Check file exists
   ls .env
   
   # View contents (Windows)
   type .env
   
   # View contents (Mac/Linux)
   cat .env
   ```

---

## Success Indicators

When backend starts successfully, you'll see:

```
🚀 Starting backend on port 4001...
⚠️  MongoDB not connected: ... (This is OK!)
📝 Backend will work without MongoDB (limited functionality)
✅ Backend listening on http://localhost:4001
🏥 Health check: http://localhost:4001/api/health
📋 Contract status: DEPLOYED
```

---

## Test Backend is Working

Open browser or use curl:
```bash
curl http://localhost:4001/api/health
```

Should return:
```json
{"ok":true}
```

---

## Need More Help?

See `TROUBLESHOOTING.md` for comprehensive guide.
