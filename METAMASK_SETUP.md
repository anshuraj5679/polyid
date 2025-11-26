# MetaMask Setup for Polygon Amoy Testnet

## Method 1: Automatic Setup (Recommended)

1. **Visit Chainlist.org**
   - Go to https://chainlist.org
   - Search for "Polygon Amoy Testnet"
   - Click "Add to MetaMask" button
   - Approve the network addition in MetaMask

## Method 2: Manual Setup

1. **Open MetaMask**
   - Click on the network dropdown (usually shows "Ethereum Mainnet")
   - Click "Add Network" or "Custom RPC"

2. **Enter Network Details:**
   ```
   Network Name: Polygon Amoy Testnet
   New RPC URL: https://rpc-amoy.polygon.technology
   Chain ID: 80002
   Currency Symbol: MATIC
   Block Explorer URL: https://amoy.polygonscan.com
   ```

3. **Save and Switch**
   - Click "Save"
   - MetaMask will automatically switch to the new network

## Method 3: Using the Frontend (Automatic)

1. **Start the PolyID Frontend**
   ```bash
   cd frontend
   npm run dev
   ```

2. **Connect Your Wallet**
   - Click "Connect Wallet" in the top right
   - Choose MetaMask
   - The app will automatically detect you're on the wrong network

3. **Auto-Switch Network**
   - A yellow banner will appear saying you need to switch networks
   - Click "Fix Network" button
   - Approve the network addition and switch in MetaMask

## Getting Test MATIC

### Option 1: Official Polygon Faucet
1. Visit https://faucet.polygon.technology/
2. Select "Polygon Amoy" network
3. Enter your wallet address
4. Complete captcha and request tokens

### Option 2: Alternative Faucets
- Alchemy Faucet: https://www.alchemy.com/faucets/polygon-amoy
- QuickNode Faucet: https://faucet.quicknode.com/polygon/amoy
- Chainlink Faucet: https://faucets.chain.link/polygon-amoy

## Verify Setup

1. **Check Network**
   - MetaMask should show "Polygon Amoy Testnet" in the network dropdown
   - Chain ID should be 80002

2. **Check Balance**
   - You should see MATIC balance
   - Minimum 0.1 MATIC recommended for testing

3. **Test Transaction**
   - Try sending a small amount to another address
   - Check transaction on https://amoy.polygonscan.com

## Troubleshooting

### Network Not Appearing
- Clear MetaMask cache: Settings → Advanced → Reset Account
- Try adding network again
- Ensure RPC URL is correct: https://rpc-amoy.polygon.technology

### RPC Issues
- If RPC is slow, try alternative endpoints:
  - https://rpc-amoy.polygon.technology
  - https://polygon-amoy.g.alchemy.com/v2/demo
  - https://rpc.ankr.com/polygon_amoy

### Transaction Failures
- Ensure you have enough MATIC for gas fees
- Gas limit should be at least 21000 for simple transfers
- Check if the network is experiencing congestion

## Important Notes

- **Currency is MATIC** on Polygon Amoy
- **Chain ID 80002** is for Amoy testnet
- **Block explorer** is https://amoy.polygonscan.com
- **Gas fees** are paid in MATIC, very low cost

## Next Steps

After setting up MetaMask:

1. **Get your wallet address** from MetaMask
2. **Add it to the .env files** in the project
3. **Deploy the smart contract** using your funded wallet
4. **Start the backend and frontend** services
5. **Create an admin issuer** account
6. **Begin issuing credentials**

Your wallet is now ready to interact with the PolyID application!