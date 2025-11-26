# PolyID Setup Guide

## Prerequisites
1. Node.js >= 18
2. MongoDB running locally or MongoDB Atlas
3. MetaMask wallet with Polygon zkEVM Testnet configured
4. Pinata account for IPFS storage

## Step 1: Add Polygon Amoy Testnet to MetaMask

### Manual Method:
1. Open MetaMask
2. Click network dropdown → "Add Network"
3. Fill in these details:
   - **Network Name**: Polygon Amoy Testnet
   - **New RPC URL**: https://rpc-amoy.polygon.technology
   - **Chain ID**: 80002
   - **Currency Symbol**: MATIC
   - **Block Explorer**: https://amoy.polygonscan.com

### Automatic Method:
Visit https://chainlist.org and search for "Polygon Amoy Testnet" to add automatically.

## Step 2: Get Test MATIC
1. Visit https://faucet.polygon.technology/
2. Select "Polygon Amoy" network
3. Enter your wallet address and request tokens
4. Alternative faucets: Alchemy, QuickNode, Chainlink

## Step 3: Environment Setup

1. Copy environment files:
```bash
cp .env.example .env
cp .env.example backend/.env
```

2. Fill in your private keys and API keys in both `.env` files

3. Get Pinata JWT:
   - Sign up at https://pinata.cloud
   - Go to API Keys → Create New Key
   - Copy the JWT token to PINATA_JWT in backend/.env

## Step 4: Install Dependencies
```bash
# Root (Hardhat)
npm install

# Backend
cd backend && npm install && cd ..

# Frontend  
cd frontend && npm install && cd ..
```

## Step 5: Deploy Contract
```bash
npx hardhat compile
npx hardhat run scripts/deploy.js --network amoyTestnet
```

Copy the deployed contract address to:
- `.env` → CONTRACT_ADDRESS
- `backend/.env` → CONTRACT_ADDRESS  
- `frontend/.env` → VITE_CONTRACT_ADDRESS

## Step 6: Start Services

Terminal 1 - Backend:
```bash
cd backend && npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend && npm run dev
```

## Step 7: Create Admin Issuer
```bash
curl -X POST http://localhost:4000/api/auth/seed \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test University",
    "email": "admin@test.edu", 
    "password": "password123",
    "walletAddress": "YOUR_WALLET_ADDRESS"
  }'
```

## Step 8: Set Verified Issuer on Contract
Use Hardhat console or frontend to call `setVerifiedIssuer(address, true)` with your wallet address.

## Troubleshooting

### Backend won't start:
- Check MongoDB is running
- Verify all environment variables are set
- Check port 4000 is available

### Contract deployment fails:
- Ensure you have test MATIC on Polygon Amoy Testnet
- Check private key is correct in .env
- Verify RPC URL is working

### Frontend network issues:
- Make sure MetaMask is connected to Polygon Amoy Testnet
- Check contract address is set in frontend/.env
- Verify RPC URL matches in all configs