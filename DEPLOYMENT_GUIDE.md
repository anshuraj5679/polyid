# 🚀 PolyID Deployment Guide

## Current Status
✅ Contract compiled successfully  
✅ Network configured for Polygon Amoy  
✅ Private key configured  
❌ **Wallet needs test MATIC for deployment**

## 📋 Wallet Information
- **Address:** `0x8aDEc9885b3A4E5824f329fCCC3026BaFdce6B8F`
- **Network:** Polygon Amoy Testnet (Chain ID: 80002)
- **Current Balance:** 0 MATIC
- **Required:** ~0.1 MATIC for deployment

## 🚰 Get Test MATIC

### Option 1: Official Polygon Faucet (Recommended)
1. Visit: https://faucet.polygon.technology/
2. Select **"Polygon Amoy"** from network dropdown
3. Enter wallet address: `0x8aDEc9885b3A4E5824f329fCCC3026BaFdce6B8F`
4. Complete captcha and click "Submit"
5. Wait 1-2 minutes for tokens to arrive

### Option 2: Alchemy Faucet
1. Visit: https://www.alchemy.com/faucets/polygon-amoy
2. Enter wallet address: `0x8aDEc9885b3A4E5824f329fCCC3026BaFdce6B8F`
3. Complete verification and request tokens

### Option 3: QuickNode Faucet
1. Visit: https://faucet.quicknode.com/polygon/amoy
2. Enter wallet address: `0x8aDEc9885b3A4E5824f329fCCC3026BaFdce6B8F`
3. Request test MATIC

## 🔍 Check Balance
After requesting from faucet, check if tokens arrived:
```bash
node get-wallet-info.js
```

## 🚀 Deploy Contract
Once you have test MATIC (≥0.1 MATIC):
```bash
# Deploy the contract
npx hardhat run scripts/deploy.js --network amoyTestnet

# Or use automated setup
npm run setup
```

## 📝 After Deployment
The deployment will:
1. Deploy PolyIDSBT contract to Polygon Amoy
2. Print the contract address
3. Automatically update all .env files with the contract address

## 🔧 Verify Deployment
After successful deployment, you can:
1. View contract on explorer: https://amoy.polygonscan.com
2. Start the application: `npm run dev`
3. Create admin issuer account
4. Begin issuing credentials

## 🆘 Troubleshooting

### Faucet not working?
- Try different faucets listed above
- Some faucets have daily limits
- Check if you've used the faucet recently

### Deployment still fails?
- Ensure balance is ≥0.1 MATIC
- Check network connection
- Verify private key is correct

### Need more help?
- Check the main SETUP.md guide
- Review METAMASK_SETUP.md for wallet configuration

---

**Next Step:** Get test MATIC from faucet using the wallet address above! 🚰