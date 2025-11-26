# 🎓 PolyID - Blockchain Credential Management System

<div align="center">

![PolyID](https://img.shields.io/badge/PolyID-Blockchain%20Credentials-8B5CF6?style=for-the-badge)
![Polygon](https://img.shields.io/badge/Polygon-Amoy%20Testnet-8247E5?style=for-the-badge&logo=polygon)
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A decentralized platform for issuing, managing, and verifying academic credentials on the Polygon blockchain**

[Features](#-features) • [Quick Start](#-quick-start) • [Demo](#-demo) • [Documentation](#-documentation) • [API](#-api-endpoints)

</div>

---

## 📖 Overview

PolyID is a comprehensive blockchain-based credential management system that revolutionizes how educational institutions issue and verify academic credentials. Built on the Polygon blockchain, it provides a secure, transparent, and tamper-proof solution for managing digital credentials.

### 🎯 Problem Statement

Traditional paper-based credentials are:
- ❌ Easy to forge or tamper with
- ❌ Time-consuming to verify
- ❌ Difficult to share globally
- ❌ Prone to loss or damage
- ❌ Require manual verification processes

### ✅ Our Solution

PolyID leverages blockchain technology to provide:
- ✅ **Immutable Records**: Credentials stored on blockchain cannot be altered
- ✅ **Instant Verification**: Verify credentials in seconds, not days
- ✅ **Global Accessibility**: Access credentials from anywhere in the world
- ✅ **Cost-Effective**: Low gas fees on Polygon network
- ✅ **Decentralized**: No single point of failure
- ✅ **Privacy-Preserving**: Students control their own data

---

## ✨ Features

### 🏛️ For Universities

<table>
<tr>
<td width="50%">

**Registration & Authentication**
- Self-service university registration
- Secure JWT-based authentication
- Auto-logout for security
- Password hashing with bcrypt

</td>
<td width="50%">

**Credential Management**
- Issue blockchain-backed credentials
- Add student name, course, description
- Upload supporting documents
- Track all issued credentials

</td>
</tr>
<tr>
<td>

**Subscription System**
- Monthly subscription plans
- Crypto (MATIC) payment support
- Fiat payment integration (Stripe)
- Subscription status tracking

</td>
<td>

**Advanced Features**
- Credential revocation
- Bulk issuance (coming soon)
- Analytics dashboard
- IPFS document storage

</td>
</tr>
</table>

### 🎓 For Students

- **Wallet-Based Access**: Use MetaMask or any Web3 wallet
- **View Credentials**: See all credentials issued to you
- **Detailed Information**: Student name, course, institution, date
- **Privacy Control**: Wallet address not shown in public view
- **Lifetime Validity**: Credentials never expire
- **Portable**: Use across any platform that supports blockchain verification

### ✅ For Verifiers (Employers, Institutions)

- **Instant Verification**: Verify credentials in real-time
- **No Login Required**: Public verification without authentication
- **Blockchain Proof**: Cryptographic proof of authenticity
- **Revocation Checking**: See if credential has been revoked
- **Complete Details**: View all credential information
- **Explorer Integration**: Verify on Polygonscan

---

## 🚀 Quick Start

### Prerequisites

- Node.js v18 or higher
- npm or yarn
- MetaMask wallet (for blockchain features)
- MongoDB (optional - has in-memory fallback)

### Installation

```bash
# Clone the repository
git clone https://github.com/anshuraj5679/polyid.git
cd polyid

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Configuration

#### Backend (.env)
Create `backend/.env`:
```env
PORT=4001
MONGODB_URI=mongodb://localhost:27017/polyid
JWT_SECRET=your_jwt_secret_here
PINATA_JWT=your_pinata_jwt
CONTRACT_ADDRESS=0x757B359C814362e64A205F5D9B1d0eE8E1a1544F
POLYGON_AMOY_RPC=https://rpc-amoy.polygon.technology
ISSUER_WALLET_PRIVATE_KEY=your_private_key
ALLOWED_ORIGIN=*
```

#### Frontend (.env)
Create `frontend/.env`:
```env
VITE_API_BASE=http://localhost:4001
VITE_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
```

### Running the Application

```bash
# Terminal 1 - Start Backend
cd backend
npm start

# Terminal 2 - Start Frontend
cd frontend
npm run dev
```

### Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:4001
- **Health Check**: http://localhost:4001/api/health

---

## 🎬 Demo

### Test Credentials

**University Login:**
```
Email: iitkanpur@123.edu
Password: IITKanpur@2024
```

**Student Wallet Address:**
```
0x1234567890123456789012345678901234567890
```

### Quick Test Flow

1. **Register University**
   - Go to Sign Up page
   - Fill in university details
   - Create account

2. **Issue Credential**
   - Login as university
   - Navigate to "Issue Credential"
   - Fill student details
   - Click "Issue"

3. **View Credentials**
   - Go to "My Credentials"
   - Enter student wallet address
   - Uncheck "On-chain mode" (for development)
   - Click "Load"
   - Click "View Details"

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 with Vite
- **Web3**: RainbowKit + Wagmi + Ethers.js
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **State Management**: React Hooks
- **Routing**: React Router v6

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB (with in-memory fallback)
- **Authentication**: JWT + bcrypt
- **Blockchain**: Ethers.js v6
- **Storage**: Pinata (IPFS)
- **Payments**: Stripe

### Blockchain
- **Network**: Polygon Amoy Testnet
- **Smart Contracts**: Solidity
- **Token Standard**: ERC-721 (Soulbound Tokens)
- **RPC**: Polygon Amoy RPC

### DevOps
- **Version Control**: Git
- **Package Manager**: npm
- **Environment**: dotenv
- **Process Management**: PM2 (recommended)

---

## 📁 Project Structure

```
polyid/
├── backend/
│   ├── abi/                    # Smart contract ABIs
│   ├── config/                 # Configuration files
│   │   ├── db.js              # MongoDB connection
│   │   ├── ethers.js          # Blockchain setup
│   │   └── pinata.js          # IPFS configuration
│   ├── controllers/            # Business logic
│   │   ├── authController.js  # Authentication
│   │   ├── issueController.js # Credential issuance
│   │   └── verifyController.js# Verification
│   ├── middleware/             # Express middleware
│   │   ├── auth.js            # JWT verification
│   │   └── subscription.js    # Subscription check
│   ├── models/                 # Database models
│   │   ├── Issuer.js          # University model
│   │   └── Credential.js      # Credential model
│   ├── routes/                 # API routes
│   │   ├── auth.js            # Auth endpoints
│   │   ├── issue.js           # Issue endpoints
│   │   ├── verify.js          # Verify endpoints
│   │   └── billing.js         # Billing endpoints
│   ├── services/               # External services
│   ├── .env                    # Environment variables
│   ├── index.js                # Server entry point
│   └── package.json            # Dependencies
│
├── frontend/
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   │   ├── CredentialModal.jsx
│   │   │   └── CryptoSubscription.jsx
│   │   ├── pages/              # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── AdminLogin.jsx
│   │   │   ├── AdminSignup.jsx
│   │   │   ├── IssueCredential.jsx
│   │   │   ├── MyCredentials.jsx
│   │   │   ├── IssuedCredentials.jsx
│   │   │   ├── Verify.jsx
│   │   │   └── Billing.jsx
│   │   ├── lib/                # Utilities
│   │   │   ├── contract.js    # Contract config
│   │   │   └── explorer.js    # Explorer links
│   │   ├── App.jsx             # Main app component
│   │   ├── main.jsx            # Entry point
│   │   └── index.css           # Global styles
│   ├── .env                    # Environment variables
│   ├── vite.config.js          # Vite configuration
│   └── package.json            # Dependencies
│
├── contracts/                  # Smart contracts
│   └── PolyIDSubscription.sol # Subscription contract
│
├── docs/                       # Documentation
│   ├── QUICK_START.md
│   ├── TROUBLESHOOTING.md
│   ├── MOCK_DATA.md
│   └── ... (30+ guide files)
│
├── .gitignore                  # Git ignore rules
├── README.md                   # This file
└── push-to-github.bat         # Git push script
```

---

## 🌐 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/login` | University login | No |
| POST | `/api/auth/seed` | University registration | No |

### Credentials

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/issue` | Issue new credential | Yes |
| GET | `/api/verify/:address` | Get credentials by wallet | No |
| GET | `/api/credential/:tokenId` | Get credential by token ID | No |
| POST | `/api/credential/:tokenId/revoke` | Revoke credential | Yes |

### Issuers

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/issuers` | List verified universities | No |
| GET | `/api/issuer/:wallet/credentials` | Get credentials by issuer | No |

### Billing

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/billing/status` | Get subscription status | Yes |
| GET | `/api/billing/plans` | List available plans | No |
| POST | `/api/billing/checkout` | Create checkout session | Yes |
| GET | `/api/billing/portal` | Access customer portal | Yes |

---

## 📚 Documentation

### Getting Started
- **[QUICK_START.md](./QUICK_START.md)** - Get up and running in 5 minutes
- **[SERVERS_RUNNING_GUIDE.md](./SERVERS_RUNNING_GUIDE.md)** - Server management
- **[GIT_PUSH_GUIDE.md](./GIT_PUSH_GUIDE.md)** - Push to GitHub

### Features & Usage
- **[FEATURES_SUMMARY.md](./FEATURES_SUMMARY.md)** - Complete feature list
- **[UNIVERSITY_SIGNUP.md](./UNIVERSITY_SIGNUP.md)** - University registration
- **[STUDENT_NAME_FEATURE.md](./STUDENT_NAME_FEATURE.md)** - Student name field
- **[MY_CREDENTIALS_NEW_DESIGN.md](./MY_CREDENTIALS_NEW_DESIGN.md)** - Credential viewing

### Testing & Mock Data
- **[MASTER_MOCK_DATA.md](./MASTER_MOCK_DATA.md)** - All mock data in one place
- **[COMPLETE_MOCK_DATA.md](./COMPLETE_MOCK_DATA.md)** - University test data
- **[ISSUE_CREDENTIAL_COMPLETE_MOCK_DATA.md](./ISSUE_CREDENTIAL_COMPLETE_MOCK_DATA.md)** - Credential test data
- **[TEST_SCENARIOS.md](./TEST_SCENARIOS.md)** - Test cases

### Troubleshooting
- **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** - Comprehensive guide
- **[FIX_PORT_ERROR.md](./FIX_PORT_ERROR.md)** - Port conflict fixes
- **[FIX_NETWORK_ERROR.md](./FIX_NETWORK_ERROR.md)** - Network issues
- **[FIX_CREDENTIALS_NOT_SHOWING.md](./FIX_CREDENTIALS_NOT_SHOWING.md)** - Display issues
- **[FIX_BLOCKCHAIN_UPLOAD.md](./FIX_BLOCKCHAIN_UPLOAD.md)** - Blockchain issues

### Advanced Topics
- **[SUBSCRIPTION_GUIDE.md](./SUBSCRIPTION_GUIDE.md)** - Subscription system
- **[CRYPTO_PAYMENT_GUIDE.md](./CRYPTO_PAYMENT_GUIDE.md)** - Crypto payments
- **[DEPLOY_CRYPTO_PAYMENT.md](./DEPLOY_CRYPTO_PAYMENT.md)** - Payment deployment
- **[AUTO_LOGOUT.md](./AUTO_LOGOUT.md)** - Security features

---

## 🔐 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Session Management**: Auto-logout on browser close
- **Input Validation**: Server-side validation
- **CORS Protection**: Configurable origins
- **Subscription Verification**: Middleware checks
- **Blockchain Immutability**: Tamper-proof records
- **Private Key Security**: Environment variable storage

---

## 🐛 Troubleshooting

### Common Issues

#### Backend Won't Start
```bash
# Check if port is in use
netstat -ano | findstr :4001

# Kill the process
taskkill /F /PID <PID>

# Or use the restart script
cd backend
npm run restart
```

#### Network Error
```bash
# Restart backend
cd backend
npm start

# Check health
curl http://localhost:4001/api/health
```

#### Credentials Show "N/A"
1. Make sure "On-chain mode" is **UNCHECKED**
2. Re-issue credential with ALL fields filled
3. See [FIX_NA_IN_CREDENTIALS.md](./FIX_NA_IN_CREDENTIALS.md)

#### MongoDB Connection Failed
This is OK! Backend works without MongoDB using in-memory storage.
- Data is temporary (lost on restart)
- Install MongoDB for permanent storage

### More Help

See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for comprehensive solutions.

---

## 🎯 Roadmap

### ✅ Completed
- [x] University registration and authentication
- [x] Credential issuance with blockchain storage
- [x] Student credential viewing
- [x] Subscription management system
- [x] Crypto payment integration
- [x] Comprehensive documentation
- [x] Mock data for testing

### 🚧 In Progress
- [ ] Pinata IPFS integration
- [ ] Production deployment
- [ ] Mobile responsive improvements

### 📋 Planned
- [ ] Bulk credential issuance
- [ ] Analytics dashboard
- [ ] Email notifications
- [ ] Multi-language support
- [ ] Mobile app
- [ ] API rate limiting
- [ ] Advanced search and filters
- [ ] Credential templates
- [ ] QR code generation
- [ ] PDF export

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style
- Add comments for complex logic
- Update documentation for new features
- Test thoroughly before submitting
- Keep commits atomic and descriptive

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Anshu Raj**
- GitHub: [@anshuraj5679](https://github.com/anshuraj5679)
- Repository: [polyid](https://github.com/anshuraj5679/polyid)

---

## 🙏 Acknowledgments

- **Polygon** - For the scalable blockchain infrastructure
- **RainbowKit** - For the excellent wallet connection UI
- **Pinata** - For IPFS storage solutions
- **OpenZeppelin** - For secure smart contract libraries
- **React Community** - For the amazing ecosystem

---

## 📞 Support & Resources

### Quick Links
- **Health Check**: http://localhost:4001/api/health
- **Frontend**: http://localhost:5173
- **Polygon Explorer**: https://amoy.polygonscan.com/
- **Polygon Faucet**: https://faucet.polygon.technology/

### Documentation
- Read all `.md` files in the project root
- Check inline code comments
- Review test scenarios

### Getting Help
1. Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
2. Review relevant documentation
3. Check existing issues on GitHub
4. Create a new issue with details

---

## 🎉 Success Checklist

After setup, verify everything works:

- [ ] Backend starts without errors
- [ ] Frontend loads in browser
- [ ] Can access health check endpoint
- [ ] Can register new university
- [ ] Can login with test account
- [ ] Can issue test credential
- [ ] Can view credentials
- [ ] Can verify credentials
- [ ] Subscription status displays
- [ ] Auto-logout works on browser close

---

## 📊 Project Stats

- **Lines of Code**: 10,000+
- **Components**: 15+
- **API Endpoints**: 12+
- **Documentation Files**: 40+
- **Smart Contracts**: 2
- **Test Scenarios**: 20+

---

<div align="center">

**Built with ❤️ for decentralized education credentials**

⭐ Star this repo if you find it helpful!

[Report Bug](https://github.com/anshuraj5679/polyid/issues) • [Request Feature](https://github.com/anshuraj5679/polyid/issues) • [Documentation](./docs)

</div>
