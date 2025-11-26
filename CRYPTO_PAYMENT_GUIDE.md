# Crypto Payment with Polygon MATIC

## 🎯 Overview

Instead of Stripe (fiat currency), universities can pay subscription fees using **Polygon MATIC** tokens directly from their MetaMask wallet.

---

## 💰 Payment Flow

### Current System (Stripe - Fiat):
```
University → Stripe Checkout → Credit Card → USD Payment → Subscription Active
```

### Proposed System (Crypto - MATIC):
```
University → Connect MetaMask → Send MATIC → Smart Contract → Subscription Active
```

---

## 🔧 Implementation Plan

### Step 1: Create Payment Smart Contract

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PolyIDSubscription {
    address public owner;
    uint256 public monthlyPrice = 10 ether; // 10 MATIC per month
    
    struct Subscription {
        address university;
        uint256 expiryDate;
        bool active;
    }
    
    mapping(address => Subscription) public subscriptions;
    
    event SubscriptionPurchased(address indexed university, uint256 expiryDate);
    event SubscriptionRenewed(address indexed university, uint256 newExpiryDate);
    
    constructor() {
        owner = msg.sender;
    }
    
    // Purchase 1-month subscription
    function subscribe() external payable {
        require(msg.value >= monthlyPrice, "Insufficient payment");
        
        uint256 expiryDate;
        if (subscriptions[msg.sender].active && subscriptions[msg.sender].expiryDate > block.timestamp) {
            // Extend existing subscription
            expiryDate = subscriptions[msg.sender].expiryDate + 30 days;
        } else {
            // New subscription
            expiryDate = block.timestamp + 30 days;
        }
        
        subscriptions[msg.sender] = Subscription({
            university: msg.sender,
            expiryDate: expiryDate,
            active: true
        });
        
        emit SubscriptionPurchased(msg.sender, expiryDate);
    }
    
    // Check if subscription is active
    function isSubscriptionActive(address university) external view returns (bool) {
        Subscription memory sub = subscriptions[university];
        return sub.active && sub.expiryDate > block.timestamp;
    }
    
    // Get subscription details
    function getSubscription(address university) external view returns (Subscription memory) {
        return subscriptions[university];
    }
    
    // Owner can withdraw funds
    function withdraw() external {
        require(msg.sender == owner, "Only owner");
        payable(owner).transfer(address(this).balance);
    }
    
    // Update monthly price
    function setMonthlyPrice(uint256 newPrice) external {
        require(msg.sender == owner, "Only owner");
        monthlyPrice = newPrice;
    }
}
```

---

### Step 2: Deploy Contract

```javascript
// scripts/deploy-subscription.js
const hre = require("hardhat");

async function main() {
  const PolyIDSubscription = await hre.ethers.getContractFactory("PolyIDSubscription");
  const subscription = await PolyIDSubscription.deploy();
  await subscription.deployed();
  
  console.log("PolyIDSubscription deployed to:", subscription.address);
  console.log("Monthly price:", await subscription.monthlyPrice());
}

main();
```

---

### Step 3: Frontend Integration

```jsx
// components/CryptoSubscribe.jsx
import { useAccount, useContractWrite, useContractRead } from 'wagmi';
import { parseEther } from 'viem';

const SUBSCRIPTION_CONTRACT = "0x..."; // Your deployed contract
const SUBSCRIPTION_ABI = [...]; // Your contract ABI

export default function CryptoSubscribe() {
  const { address } = useAccount();
  
  // Read monthly price
  const { data: monthlyPrice } = useContractRead({
    address: SUBSCRIPTION_CONTRACT,
    abi: SUBSCRIPTION_ABI,
    functionName: 'monthlyPrice',
  });
  
  // Check if subscribed
  const { data: isActive } = useContractRead({
    address: SUBSCRIPTION_CONTRACT,
    abi: SUBSCRIPTION_ABI,
    functionName: 'isSubscriptionActive',
    args: [address],
  });
  
  // Subscribe function
  const { write: subscribe, isLoading } = useContractWrite({
    address: SUBSCRIPTION_CONTRACT,
    abi: SUBSCRIPTION_ABI,
    functionName: 'subscribe',
    value: monthlyPrice,
    onSuccess: () => {
      alert('Subscription successful!');
    },
  });
  
  return (
    <div className="p-6 rounded-xl border border-white/10 bg-white/5">
      <h2 className="text-2xl font-semibold mb-4">Pay with Crypto</h2>
      
      <div className="mb-4">
        <div className="text-sm text-neutral-400">Monthly Price</div>
        <div className="text-3xl font-bold">
          {monthlyPrice ? `${parseFloat(monthlyPrice) / 1e18} MATIC` : 'Loading...'}
        </div>
        <div className="text-sm text-neutral-400">≈ $10 USD</div>
      </div>
      
      <div className="mb-4">
        <div className="text-sm text-neutral-400">Status</div>
        <div className={`text-lg font-semibold ${isActive ? 'text-green-400' : 'text-yellow-400'}`}>
          {isActive ? '✅ Active' : '⚠️ No Subscription'}
        </div>
      </div>
      
      <button
        onClick={() => subscribe()}
        disabled={isLoading || !address}
        className="w-full py-3 rounded bg-polyPurple hover:opacity-90 disabled:opacity-50"
      >
        {isLoading ? 'Processing...' : 'Subscribe with MATIC'}
      </button>
      
      {!address && (
        <div className="mt-2 text-sm text-yellow-400">
          Connect your wallet first
        </div>
      )}
    </div>
  );
}
```

---

### Step 4: Backend Integration

```javascript
// services/cryptoSubscriptionService.js
import { ethers } from 'ethers';

const SUBSCRIPTION_CONTRACT = process.env.SUBSCRIPTION_CONTRACT_ADDRESS;
const SUBSCRIPTION_ABI = [...]; // Your contract ABI

const provider = new ethers.providers.JsonRpcProvider(
  process.env.POLYGON_AMOY_RPC
);

const contract = new ethers.Contract(
  SUBSCRIPTION_CONTRACT,
  SUBSCRIPTION_ABI,
  provider
);

export async function checkCryptoSubscription(walletAddress) {
  try {
    const isActive = await contract.isSubscriptionActive(walletAddress);
    const subscription = await contract.getSubscription(walletAddress);
    
    return {
      active: isActive,
      expiryDate: new Date(subscription.expiryDate.toNumber() * 1000),
      walletAddress: subscription.university
    };
  } catch (error) {
    console.error('Error checking crypto subscription:', error);
    return { active: false };
  }
}

// Listen for subscription events
contract.on('SubscriptionPurchased', (university, expiryDate) => {
  console.log(`New subscription: ${university} until ${new Date(expiryDate.toNumber() * 1000)}`);
  // Update your database
  // Send confirmation email
  // Activate features
});
```

---

### Step 5: Update Subscription Middleware

```javascript
// middleware/subscription.js
import { checkCryptoSubscription } from '../services/cryptoSubscriptionService.js';

export async function requireActiveSubscription(req, res, next) {
  try {
    const walletAddress = req.user?.walletAddress;
    if (!walletAddress) {
      return res.status(401).json({ error: "Wallet address required" });
    }
    
    // Check crypto subscription on blockchain
    const subscription = await checkCryptoSubscription(walletAddress);
    
    if (!subscription.active) {
      return res.status(402).json({
        error: "Active subscription required",
        message: "Please subscribe using MATIC to issue credentials",
        needsPayment: true
      });
    }
    
    req.subscription = subscription;
    next();
  } catch (err) {
    console.error("[subscription] Error:", err);
    // Development mode fallback
    req.subscription = { active: true, mode: 'development' };
    next();
  }
}
```

---

## 💳 Payment Options

### Option 1: Fixed MATIC Amount
```
Monthly: 10 MATIC
Yearly: 100 MATIC (save 20 MATIC)
```

### Option 2: USD-Pegged (Dynamic)
```
Monthly: $29 worth of MATIC
- Fetch MATIC/USD price from oracle
- Calculate required MATIC amount
- Update contract price regularly
```

### Option 3: Tiered Pricing
```
Basic: 5 MATIC/month
Pro: 15 MATIC/month
Enterprise: 50 MATIC/month
```

---

## 🌐 Getting Test MATIC

### For Polygon Amoy Testnet:

1. **Polygon Faucet:**
   ```
   https://faucet.polygon.technology/
   - Select "Polygon Amoy"
   - Enter your wallet address
   - Get free test MATIC
   ```

2. **Alchemy Faucet:**
   ```
   https://www.alchemy.com/faucets/polygon-amoy
   - Connect wallet
   - Request test MATIC
   ```

3. **QuickNode Faucet:**
   ```
   https://faucet.quicknode.com/polygon/amoy
   - Enter wallet address
   - Receive test tokens
   ```

---

## 🎨 UI/UX Flow

### Step 1: Billing Page
```
┌─────────────────────────────────────┐
│  Subscription Required              │
│                                     │
│  Status: ⚠️ No Subscription         │
│                                     │
│  Monthly Plan: 10 MATIC             │
│  (≈ $10 USD)                        │
│                                     │
│  [Connect Wallet]                   │
│  [Subscribe with MATIC]             │
└─────────────────────────────────────┘
```

### Step 2: Connect Wallet
```
┌─────────────────────────────────────┐
│  Connect Your Wallet                │
│                                     │
│  [MetaMask]  [WalletConnect]        │
│  [Coinbase]  [Trust Wallet]         │
└─────────────────────────────────────┘
```

### Step 3: Confirm Payment
```
┌─────────────────────────────────────┐
│  MetaMask Confirmation              │
│                                     │
│  Send: 10 MATIC                     │
│  To: PolyID Subscription Contract   │
│  Gas: ~0.001 MATIC                  │
│                                     │
│  [Confirm]  [Reject]                │
└─────────────────────────────────────┘
```

### Step 4: Success
```
┌─────────────────────────────────────┐
│  ✅ Subscription Active!            │
│                                     │
│  Valid until: Dec 19, 2024          │
│  Transaction: 0x1234...             │
│                                     │
│  You can now issue credentials!     │
│                                     │
│  [Start Issuing]                    │
└─────────────────────────────────────┘
```

---

## 📊 Comparison: Stripe vs Crypto

| Feature | Stripe (Fiat) | Crypto (MATIC) |
|---------|---------------|----------------|
| Payment Method | Credit Card | MetaMask Wallet |
| Currency | USD | MATIC |
| Transaction Fee | 2.9% + $0.30 | ~$0.01 gas |
| Settlement Time | 2-7 days | Instant |
| Chargebacks | Yes | No |
| KYC Required | Yes | No |
| Global Access | Limited | Worldwide |
| Setup Complexity | Medium | Low |
| Recurring Billing | Automatic | Manual |

---

## 🔐 Security Considerations

### Smart Contract Security:
- ✅ Audit contract before deployment
- ✅ Use OpenZeppelin libraries
- ✅ Implement access controls
- ✅ Add emergency pause function
- ✅ Test thoroughly on testnet

### Frontend Security:
- ✅ Verify contract address
- ✅ Check transaction before signing
- ✅ Display clear payment details
- ✅ Handle errors gracefully
- ✅ Protect against phishing

---

## 🚀 Implementation Steps

### Phase 1: Development (Current)
```
✅ Bypass subscription checks
✅ Test all features freely
✅ No payment required
```

### Phase 2: Smart Contract
```
1. Write subscription contract
2. Test on Amoy testnet
3. Deploy to testnet
4. Verify contract
5. Test payments with test MATIC
```

### Phase 3: Frontend Integration
```
1. Add crypto payment component
2. Integrate with wagmi/ethers
3. Connect to MetaMask
4. Test payment flow
5. Handle success/error states
```

### Phase 4: Backend Integration
```
1. Listen for blockchain events
2. Verify subscription on-chain
3. Update middleware
4. Sync with database
5. Send notifications
```

### Phase 5: Production
```
1. Deploy to Polygon mainnet
2. Set real MATIC prices
3. Enable for all users
4. Monitor transactions
5. Provide support
```

---

## 💡 Best Practices

1. **Clear Pricing:** Show MATIC amount and USD equivalent
2. **Gas Estimation:** Display estimated gas fees
3. **Transaction Status:** Show pending/confirmed states
4. **Error Handling:** Clear messages for failed transactions
5. **Refund Policy:** Define refund terms clearly
6. **Support:** Help users with wallet issues

---

## 📚 Resources

- **Polygon Docs:** https://docs.polygon.technology/
- **Wagmi Docs:** https://wagmi.sh/
- **Ethers.js:** https://docs.ethers.org/
- **OpenZeppelin:** https://docs.openzeppelin.com/
- **Hardhat:** https://hardhat.org/

---

**Crypto payments with MATIC provide a decentralized, low-cost alternative to traditional payment processors!** 💰
