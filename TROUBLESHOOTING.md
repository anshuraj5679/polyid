# Troubleshooting Guide

## Backend Issues

### Error: `ERR_SOCKET_BAD_PORT` or Port Issues

**Problem:** Backend fails to start with port-related errors

**Solutions:**

#### Solution 1: Kill Process on Port 4001 (Windows)
```cmd
netstat -ano | findstr :4001
taskkill /PID <PID_NUMBER> /F
```

#### Solution 2: Kill Process on Port 4001 (Mac/Linux)
```bash
lsof -ti:4001 | xargs kill -9
```

#### Solution 3: Change Port
Edit `polyid/backend/.env`:
```
PORT=4002
```

Then update frontend `.env` to match:
```
VITE_API_BASE=http://localhost:4002
```

#### Solution 4: Restart Everything
1. Close all terminals
2. Close VS Code / IDE
3. Reopen and start fresh

---

### Error: MongoDB Connection Failed

**Problem:** `MongoDB not connected` warning

**This is OK!** The backend works without MongoDB using mock authentication.

**To fix (optional):**
1. Install MongoDB: https://www.mongodb.com/try/download/community
2. Start MongoDB service:
   - Windows: `net start MongoDB`
   - Mac: `brew services start mongodb-community`
   - Linux: `sudo systemctl start mongod`

---

### Error: Cannot find module

**Problem:** Missing dependencies

**Solution:**
```bash
cd polyid/backend
npm install
```

---

### Error: PINATA_JWT not set

**Problem:** IPFS upload fails

**Solution:**
1. Get Pinata API key from https://pinata.cloud
2. Add to `polyid/backend/.env`:
```
PINATA_JWT=your_jwt_token_here
```

---

## Frontend Issues

### Error: Cannot connect to backend

**Problem:** Frontend can't reach API

**Check:**
1. Is backend running? Look for `✅ Backend listening on http://localhost:4001`
2. Check frontend `.env`:
```
VITE_API_BASE=http://localhost:4001
```
3. Check browser console for CORS errors

**Solution:**
```bash
# Terminal 1 - Backend
cd polyid/backend
npm start

# Terminal 2 - Frontend  
cd polyid/frontend
npm run dev
```

---

### Error: Wallet connection fails

**Problem:** RainbowKit/Wagmi errors

**Solution:**
1. Install MetaMask browser extension
2. Switch to Polygon Amoy testnet
3. Get test MATIC from faucet: https://faucet.polygon.technology/

---

### Error: Build fails

**Problem:** `npm run build` fails

**Solution:**
```bash
cd polyid/frontend
rm -rf node_modules
npm install
npm run build
```

---

## Common Issues

### Issue: "Login required" when trying to issue

**Problem:** Not logged in or token expired

**Solution:**
1. Go to Login page
2. Login with: `admin@test.edu` / `password123`
3. Token expires after 12 hours - login again

---

### Issue: "No Subscription" warning

**Problem:** University doesn't have active subscription

**Solution:**
1. Click on subscription badge
2. Go to Billing page
3. Subscribe to a plan
4. In development: This is expected, you can still test

---

### Issue: Credentials not showing in "My Credentials"

**Problem:** Forgot to click "Load" button

**Solution:**
1. Enter wallet address or connect wallet
2. Click the "Load" button
3. Credentials will appear

---

### Issue: Transaction fails on blockchain

**Problem:** Insufficient gas or network issues

**Solution:**
1. Check you have test MATIC in wallet
2. Get from faucet: https://faucet.polygon.technology/
3. Check network is Polygon Amoy
4. Wait a moment and try again

---

## Environment Setup Issues

### Missing .env files

**Backend `.env` should have:**
```env
PORT=4001
MONGODB_URI=mongodb://localhost:27017/polyid
JWT_SECRET=supersecret
PINATA_JWT=your_jwt_here
CONTRACT_ADDRESS=0x757B359C814362e64A205F5D9B1d0eE8E1a1544F
POLYGON_AMOY_RPC=https://rpc-amoy.polygon.technology
ISSUER_WALLET_PRIVATE_KEY=your_private_key_here
ALLOWED_ORIGIN=*
```

**Frontend `.env` should have:**
```env
VITE_API_BASE=http://localhost:4001
VITE_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

---

## Quick Fixes

### Reset Everything
```bash
# Stop all processes (Ctrl+C in terminals)

# Backend
cd polyid/backend
rm -rf node_modules
npm install
npm start

# Frontend (new terminal)
cd polyid/frontend
rm -rf node_modules
npm install
npm run dev
```

### Clear Browser Data
1. Open DevTools (F12)
2. Application tab
3. Clear Storage
4. Reload page

### Check Ports
```bash
# Windows
netstat -ano | findstr :4001
netstat -ano | findstr :5173

# Mac/Linux
lsof -i :4001
lsof -i :5173
```

---

## Error Messages Explained

### `ERR_SOCKET_BAD_PORT`
- Port number is invalid or malformed
- Usually means port is already in use
- Kill the process or change port

### `EADDRINUSE`
- Port is already being used by another process
- Kill that process or use different port

### `ECONNREFUSED`
- Backend is not running
- Start the backend server

### `Network Error`
- Backend not reachable
- Check backend is running
- Check CORS settings
- Check firewall

### `401 Unauthorized`
- Not logged in or token expired
- Login again

### `402 Payment Required`
- No active subscription
- Subscribe on Billing page

### `404 Not Found`
- API endpoint doesn't exist
- Check API_BASE URL
- Check route is correct

---

## Getting Help

### Before Asking for Help

1. Check this troubleshooting guide
2. Check browser console (F12)
3. Check terminal output
4. Check all .env files exist
5. Try restarting everything

### Information to Provide

When reporting issues, include:
- Error message (full text)
- Browser console output
- Terminal output
- Operating system
- Node version: `node --version`
- npm version: `npm --version`
- Steps to reproduce

### Useful Commands

```bash
# Check Node version
node --version

# Check npm version  
npm --version

# Check if port is in use (Windows)
netstat -ano | findstr :4001

# Check if port is in use (Mac/Linux)
lsof -i :4001

# View backend logs
cd polyid/backend
npm start

# View frontend logs
cd polyid/frontend
npm run dev

# Test backend health
curl http://localhost:4001/api/health
```

---

## Prevention Tips

### Best Practices

1. **Always run backend first**, then frontend
2. **Use separate terminals** for backend and frontend
3. **Check .env files** are configured correctly
4. **Keep dependencies updated**: `npm update`
5. **Clear cache** when things act weird
6. **Restart servers** after .env changes
7. **Check logs** for error messages
8. **Test with mock data** before real data

### Development Workflow

```bash
# Day 1 - Setup
cd polyid/backend && npm install
cd polyid/frontend && npm install

# Every day - Start servers
# Terminal 1
cd polyid/backend && npm start

# Terminal 2  
cd polyid/frontend && npm run dev

# When done - Stop servers
# Press Ctrl+C in each terminal
```

---

## Still Having Issues?

1. Check documentation:
   - `QUICK_START.md`
   - `MOCK_DATA.md`
   - `UNIVERSITY_SIGNUP.md`

2. Review code:
   - Check `polyid/backend/start-backend.js`
   - Check `polyid/frontend/src/App.jsx`

3. Test with mock data:
   - Login: `admin@test.edu` / `password123`
   - Student wallet: `0xA1B2C3D4E5F6789012345678901234567890ABCD`

4. Create GitHub issue with:
   - Full error message
   - Steps to reproduce
   - Environment details
   - Screenshots if helpful
