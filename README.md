# PolyID - Blockchain-Based Credential Verification System

A decentralized platform for universities to issue and verify educational credentials on the Polygon blockchain.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
# Backend
cd polyid/backend
npm install

# Frontend
cd polyid/frontend
npm install
```

### 2. Start Servers
```bash
# Terminal 1 - Backend
cd polyid/backend
npm start

# Terminal 2 - Frontend
cd polyid/frontend
npm run dev
```

### 3. Access Application
- Frontend: http://localhost:5173
- Backend: http://localhost:4001
- Health Check: http://localhost:4001/api/health

### 4. Login or Sign Up
- **Test Account:** admin@test.edu / password123
- **Or Sign Up:** Click "Sign Up" to create new university account

---

## 📚 Documentation

### Getting Started
- **[QUICK_START.md](./QUICK_START.md)** - Get up and running in 3 steps
- **[FIX_PORT_ERROR.md](./FIX_PORT_ERROR.md)** - Fix common port issues
- **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** - Comprehensive troubleshooting guide

### Features & Usage
- **[UNIVERSITY_SIGNUP.md](./UNIVERSITY_SIGNUP.md)** - How universities can register
- **[FEATURES_SUMMARY.md](./FEATURES_SUMMARY.md)** - Complete feature list
- **[SUBSCRIPTION_STATUS.md](./SUBSCRIPTION_STATUS.md)** - Billing and subscriptions
- **[AUTO_LOGOUT.md](./AUTO_LOGOUT.md)** - Security features

### Testing
- **[MOCK_DATA.md](./MOCK_DATA.md)** - Test accounts and sample data
- **[TEST_SCENARIOS.md](./TEST_SCENARIOS.md)** - Comprehensive test cases

---

## ✨ Key Features

### For Universities
- ✅ Self-service registration
- ✅ Issue verifiable credentials
- ✅ Blockchain-backed authenticity
- ✅ IPFS document storage
- ✅ Subscription management
- ✅ Credential revocation

### For Students
- ✅ Wallet-based access
- ✅ Self-sovereign credentials
- ✅ Lifetime validity
- ✅ Portable across platforms
- ✅ Privacy-preserving

### For Verifiers
- ✅ Instant verification
- ✅ No login required
- ✅ Blockchain proof
- ✅ Revocation checking
- ✅ Public transparency

---

## 🛠️ Tech Stack

### Frontend
- React + Vite
- RainbowKit (Wallet Connection)
- Wagmi (Web3 Hooks)
- TailwindCSS
- Framer Motion

### Backend
- Node.js + Express
- MongoDB (optional)
- JWT Authentication
- Stripe (Billing)
- Pinata (IPFS)

### Blockchain
- Polygon Amoy Testnet
- Ethers.js
- Smart Contracts (Solidity)
- Soulbound Tokens (SBT)

---

## 📋 Prerequisites

- Node.js v18+ 
- npm or yarn
- MetaMask or Web3 wallet
- MongoDB (optional, has fallback)

---

## 🔧 Configuration

### Backend Environment (.env)
```env
PORT=4001
MONGODB_URI=mongodb://localhost:27017/polyid
JWT_SECRET=supersecret
PINATA_JWT=your_jwt_here
CONTRACT_ADDRESS=0x757B359C814362e64A205F5D9B1d0eE8E1a1544F
POLYGON_AMOY_RPC=https://rpc-amoy.polygon.technology
ISSUER_WALLET_PRIVATE_KEY=your_private_key
ALLOWED_ORIGIN=*
```

### Frontend Environment (.env)
```env
VITE_API_BASE=http://localhost:4001
VITE_WALLETCONNECT_PROJECT_ID=your_project_id
```

---

## 🎯 Common Tasks

### Issue a Credential
1. Login as university admin
2. Go to "Issue" page
3. Enter student wallet address
4. Fill in credential details
5. Click "Issue"

### Verify a Credential
1. Go to "Verify" page
2. Enter wallet address or token ID
3. Click "Verify" or "Lookup"
4. View credential details

### Manage Subscription
1. Login as university admin
2. Go to "Billing" page
3. View current status
4. Subscribe or manage plan

---

## 🐛 Troubleshooting

### Network Error (Backend Not Running)
```bash
cd polyid/backend
npm start
```
See [FIX_NETWORK_ERROR.md](./FIX_NETWORK_ERROR.md)

### Port Already in Use (Quick Fix)
```bash
cd polyid/backend
npm run restart
```
Or see [QUICK_FIX.md](./QUICK_FIX.md) for more options

### Backend Won't Start
See [FIX_PORT_ERROR.md](./FIX_PORT_ERROR.md)

### "Invalid Credentials" After Signup
See [FIX_LOGIN_ISSUE.md](./FIX_LOGIN_ISSUE.md)
- Restart backend after signup
- Accounts stored in memory (lost on restart)
- Install MongoDB for permanent storage

### MongoDB Connection Failed
This is OK! Backend works without MongoDB using in-memory storage.
- Signups work but data is temporary
- Install MongoDB for permanent storage

### More Issues?
See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

---

## 📖 Usage Examples

### Test Login
```
Email: admin@test.edu
Password: password123
```

### Test Student Wallet
```
0xA1B2C3D4E5F6789012345678901234567890ABCD
```

### Create University Account
1. Click "Sign Up"
2. Fill in university details
3. Create account
4. Login and start issuing

---

## 🔐 Security Features

- ✅ Password hashing (bcrypt)
- ✅ JWT authentication
- ✅ Session auto-logout
- ✅ Subscription verification
- ✅ Input validation
- ✅ CORS protection
- ✅ Blockchain immutability

---

## 📦 Project Structure

```
polyid/
├── backend/
│   ├── config/          # Database, blockchain config
│   ├── controllers/     # Business logic
│   ├── middleware/      # Auth, validation
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── services/        # External services
│   └── start-backend.js # Server entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── lib/         # Utilities
│   │   └── App.jsx      # Main app
│   └── index.html
│
└── docs/                # Documentation (this folder)
```

---

## 🚦 Development Workflow

### Daily Development
```bash
# Start backend
cd polyid/backend && npm start

# Start frontend (new terminal)
cd polyid/frontend && npm run dev

# Access at http://localhost:5173
```

### Before Committing
```bash
# Check for errors
npm run lint

# Run tests (if available)
npm test

# Build for production
npm run build
```

---

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/seed` - Register university

### Credentials
- `POST /api/issue` - Issue credential
- `GET /api/verify/:address` - Verify by address
- `GET /api/credential/:tokenId` - Get credential
- `POST /api/credential/:tokenId/revoke` - Revoke

### Billing
- `GET /api/billing/status` - Subscription status
- `GET /api/billing/plans` - Available plans
- `POST /api/billing/checkout` - Start checkout
- `POST /api/billing/portal` - Customer portal

---

## 🎓 Learning Resources

### Blockchain Basics
- [Polygon Documentation](https://docs.polygon.technology/)
- [Ethers.js Guide](https://docs.ethers.org/)
- [Web3 Concepts](https://ethereum.org/en/developers/docs/)

### Project Documentation
- All `.md` files in this directory
- Inline code comments
- API endpoint documentation

---

## 🤝 Contributing

### Reporting Issues
1. Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
2. Search existing issues
3. Create new issue with details

### Feature Requests
1. Check [FEATURES_SUMMARY.md](./FEATURES_SUMMARY.md)
2. Describe use case
3. Explain expected behavior

---

## 📄 License

MIT License - See LICENSE file for details

---

## 🆘 Support

### Documentation
- Read all `.md` files in `/polyid/` directory
- Check code comments
- Review test scenarios

### Common Issues
- Port conflicts: See [FIX_PORT_ERROR.md](./FIX_PORT_ERROR.md)
- General issues: See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- Setup help: See [QUICK_START.md](./QUICK_START.md)

---

## 🎉 Success Checklist

- [ ] Backend starts successfully
- [ ] Frontend loads in browser
- [ ] Can login with test account
- [ ] Can create new university account
- [ ] Can issue test credential
- [ ] Can verify credential
- [ ] Subscription status shows
- [ ] Auto-logout works

---

## 📞 Quick Links

- **Health Check:** http://localhost:4001/api/health
- **Frontend:** http://localhost:5173
- **Polygon Explorer:** https://amoy.polygonscan.com/
- **Pinata Dashboard:** https://app.pinata.cloud/

---

**Built with ❤️ for decentralized education credentials**
