# Deploy Crypto Payment System

## 🚀 Quick Setup Guide

Follow these steps to enable MATIC payments for subscriptions.

---

## Step 1: Deploy Smart Contract

### Option A: Using Remix (Easiest)

1. **Go to Remix IDE:**
   ```
   https://remix.ethereum.org/
   ```

2. **Create New File:**
   - Click "+" to create new file
   - Name it: `PolyIDSubscription.sol`
   - Copy content from `polyid/contracts/PolyIDSubscription.sol`

3. **Compile Contract:**
   - Click "Solidity Compiler" tab
   - Select compiler version: `0.8.0` or higher
   - Click "Compile PolyIDSubscription.sol"

4. **Deploy to Polygon Amoy:**
   - Click "Deploy & Run Transactions" tab
   - Environment: Select "Injected Provider - MetaMask"
   - Make sure MetaMask is on **Polygon Amoy Testnet**
   - Constructor parameter: `10000000000000000000` (10 MATIC in wei)
   - Click "Deploy"
   - Confirm transaction in MetaMask

5. **Copy Contract Address:**
   - After deployment, copy the contract address
   - Example: `0x1234567890123456789012345678901234567890`

---

### Option B: Using Hardhat (Advanced)

```bash
# Install Hardhat
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox

# Initialize Hardhat
npx hardhat

# Create deployment script
# scripts/deploy-subscription.js
```

```javascript
const hre = require("hardhat");

async function main() {
  const monthlyPriceInWei = hre.ethers.utils.parseEther("10"); // 10 MATIC
  
  const PolyIDSubscription = await hre.ethers.getContractFactory("PolyIDSubscription");
  const subscription = await PolyIDSubscription.deploy(monthlyPriceInWei);
  
  await subscription.deployed();
  
  console.log("PolyIDSubscription deployed to:", subscription.address);
  console.log("Monthly price:", hre.ethers.utils.formatEther(await subscription.monthlyPrice()), "MATIC");
}

main();
```

```bash
# Deploy
npx hardhat run scripts/deploy-subscription.js --network polygonAmoy
```

---

## Step 2: Configure Frontend

### Update Environment Variables

Create or update `polyid/frontend/.env`:

```env
VITE_API_BASE=http://localhost:4001
VITE_SUBSCRIPTION_CONTRACT=0xYOUR_CONTRACT_ADDRESS_HERE
VITE_WALLETCONNECT_PROJECT_ID=your_project_id
```

Replace `0xYOUR_CONTRACT_ADDRESS_HERE` with your deployed contract address.

---

## Step 3: Get Test MATIC

### For Testing on Polygon Amoy:

1. **Visit Polygon Faucet:**
   ```
   https://faucet.polygon.technology/
   ```

2. **Select Network:**
   - Choose "Polygon Amoy"

3. **Enter Your Wallet Address:**
   - Paste your MetaMask address

4. **Get Free MATIC:**
   - Click "Submit"
   - Receive 0.5 MATIC (enough for 0 subscriptions + gas)

5. **Alternative Faucets:**
   - Alchemy: https://www.alchemy.com/faucets/polygon-amoy
   - QuickNode: https://faucet.quicknode.com/polygon/amoy

---

## Step 4: Test the Payment Flow

### 1. Connect Wallet
```
1. Go to Billing page
2. Click "Connect Wallet" (top right)
3. Select MetaMask
4. Approve connection
```

### 2. Check Balance
```
Your Balance should show: X.XXXX MATIC
Need at least: 10 MATIC + gas (~0.001 MATIC)
```

### 3. Subscribe
```
1. Click "Subscribe with MATIC" button
2. MetaMask popup appears
3. Review transaction:
   - To: Contract Address
   - Amount: 10 MATIC
   - Gas: ~0.001 MATIC
4. Click "Confirm"
5. Wait for confirmation (~2-5 seconds)
```

### 4. Verify Success
```
✅ "Subscription successful!" message
✅ Can now issue credentials
✅ Subscription active for 30 days
```

---

## Step 5: Update Backend (Optional)

To check subscription on backend:

```javascript
// services/cryptoSubscriptionService.js
import { ethers } from 'ethers';

const SUBSCRIPTION_CONTRACT = process.env.SUBSCRIPTION_CONTRACT_ADDRESS;
const SUBSCRIPTION_ABI = [
  "function isSubscriptionActive(address university) view returns (bool)",
  "function getSubscription(address university) view returns (address, uint256, bool, uint256, uint256, uint256)"
];

const provider = new ethers.providers.JsonRpcProvider(
  process.env.POLYGON_AMOY_RPC
);

const contract = new ethers.Contract(
  SUBSCRIPTION_CONTRACT,
  SUBSCRIPTION_ABI,
  provider
);

export async function checkSubscription(walletAddress) {
  const isActive = await contract.isSubscriptionActive(walletAddress);
  const details = await contract.getSubscription(walletAddress);
  
  return {
    active: isActive,
    expiryDate: new Date(details[1].toNumber() * 1000),
    daysRemaining: details[5].toNumber()
  };
}
```

---

## 📊 Contract Functions

### For Users:

**subscribe()** - Pay MATIC to subscribe
```solidity
// Payable function
// Send 10 MATIC to subscribe for 30 days
```

**isSubscriptionActive(address)** - Check if active
```solidity
// Returns: bool
// true if subscription is active
```

**getSubscription(address)** - Get details
```solidity
// Returns: (address, uint256, bool, uint256, uint256, uint256)
// (university, expiryDate, active, totalPaid, count, daysRemaining)
```

### For Owner:

**setMonthlyPrice(uint256)** - Update price
```solidity
// Only owner can call
// Set new monthly price in wei
```

**withdraw()** - Withdraw funds
```solidity
// Only owner can call
// Withdraw all MATIC from contract
```

---

## 💰 Pricing Examples

### Set Different Prices:

**10 MATIC/month:**
```
Constructor: 10000000000000000000 (10 * 10^18)
```

**5 MATIC/month:**
```
Constructor: 5000000000000000000 (5 * 10^18)
```

**20 MATIC/month:**
```
Constructor: 20000000000000000000 (20 * 10^18)
```

---

## 🔍 Verify Contract on PolygonScan

1. **Go to PolygonScan Amoy:**
   ```
   https://amoy.polygonscan.com/
   ```

2. **Search Your Contract:**
   - Paste contract address
   - Click search

3. **Verify Contract:**
   - Click "Contract" tab
   - Click "Verify and Publish"
   - Select compiler version
   - Paste contract code
   - Submit

4. **Benefits:**
   - Users can read contract
   - Transparent pricing
   - Build trust

---

## ✅ Testing Checklist

- [ ] Contract deployed to Polygon Amoy
- [ ] Contract address added to frontend .env
- [ ] Got test MATIC from faucet
- [ ] Wallet connected in app
- [ ] Balance shows correctly
- [ ] Can click "Subscribe with MATIC"
- [ ] MetaMask popup appears
- [ ] Transaction confirms
- [ ] Success message shows
- [ ] Can issue credentials

---

## 🐛 Troubleshooting

### "Insufficient balance"
- Get more MATIC from faucet
- Need 10 MATIC + gas fees

### "Transaction failed"
- Check you're on Polygon Amoy network
- Ensure enough gas
- Try increasing gas limit

### "Contract not found"
- Verify contract address in .env
- Check contract is deployed
- Confirm on correct network

### "Wallet not connected"
- Click "Connect Wallet" first
- Approve connection in MetaMask
- Refresh page if needed

---

## 📚 Resources

- **Remix IDE:** https://remix.ethereum.org/
- **Polygon Faucet:** https://faucet.polygon.technology/
- **PolygonScan Amoy:** https://amoy.polygonscan.com/
- **MetaMask:** https://metamask.io/
- **Wagmi Docs:** https://wagmi.sh/

---

## 🎉 Success!

Once deployed, users can:
- ✅ Pay with MATIC directly from MetaMask
- ✅ Instant subscription activation
- ✅ No credit card needed
- ✅ Low fees (~$0.01)
- ✅ Decentralized payment
- ✅ Transparent on blockchain

---

**Your crypto payment system is ready!** 💰
