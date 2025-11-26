# PolyID Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Setup MetaMask
1. **Add Polygon Amoy Testnet to MetaMask:**
   - Network Name: `Polygon Amoy Testnet`
   - RPC URL: `https://rpc-amoy.polygon.technology`
   - Chain ID: `80002`
   - Currency: `MATIC`
   - Explorer: `https://amoy.polygonscan.com`

2. **Get Test MATIC:**
   - Visit https://faucet.polygon.technology/
   - Select Polygon Amoy and request tokens

### Step 2: Configure Environment
```bash
# Copy environment template
cp .env.example .env

# Edit .env and add your private key
PRIVATE_KEY=your_wallet_private_key_here
```

```bash
# Setup backend environment
cp .env.example backend/.env

# Edit backend/.env and add:
# - Your private key
# - MongoDB URI (or use default local)
# - Pinata JWT (get from https://pinata.cloud)
```

### Step 3: Install & Deploy
```bash
# Install dependencies
npm install
cd backend && npm install && cd ..
cd frontend && npm install && cd ..

# Run automated setup (compiles & deploys)
npm run setup
```

### Step 4: Start Services
```bash
# Start both backend and frontend
npm run dev
```

### Step 5: Create Admin Account
```bash
# Create an admin issuer
curl -X POST http://localhost:4000/api/auth/seed \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test University",
    "email": "admin@test.edu",
    "password": "password123",
    "walletAddress": "YOUR_WALLET_ADDRESS"
  }'
```

### Step 6: Authorize Issuer
1. Open http://localhost:5173
2. Connect your wallet
3. Go to Admin → Login with credentials above
4. Use Hardhat console or contract interaction to call:
   ```solidity
   setVerifiedIssuer("YOUR_WALLET_ADDRESS", true)
   ```

## 🎉 You're Ready!

- **Issue Credentials**: Go to Issue page
- **View Credentials**: Go to My Credentials page  
- **Verify Credentials**: Go to Verify page

## 🔧 Troubleshooting

**Backend won't start?**
- Check MongoDB is running
- Verify environment variables in backend/.env

**Contract deployment fails?**
- Ensure you have test MATIC on Polygon Amoy Testnet
- Check private key format (with or without 0x)

**Frontend network issues?**
- Make sure MetaMask is on Polygon Amoy Testnet (Chain ID 80002)
- Check contract address is set in frontend/.env

**Need help?** Check the detailed SETUP.md and METAMASK_SETUP.md guides.