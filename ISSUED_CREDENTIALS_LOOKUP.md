# Issued Credentials Lookup Feature

## Overview
The Issued Credentials page now allows you to view all credentials issued by any university by entering their wallet address.

## How to Use

### 1. Navigate to Issued Credentials Page
- Go to the "Issued Credentials" page from the navigation menu

### 2. Enter University Wallet Address
- Enter the university's wallet address in the input field
- Format: `0x...` (Ethereum wallet address)
- Click "Use My Wallet" button if you want to see credentials you've issued

### 3. Load Credentials
- Click the "Load" button to fetch all credentials
- The system will display all credentials issued by that university wallet

## What You'll See

Each credential is displayed in a detailed card showing:

### Sequential Information
1. **Credential Number** - Sequential number (#1, #2, #3, etc.)
2. **Token ID** - Unique identifier for the credential
3. **Status** - Active ✅ or Revoked ❌
4. **Credential Name** - Course or credential title
5. **Student Wallet Address** - The student who received the credential
6. **Issued By** - Institution name
7. **Description** - Details about the credential
8. **Date Issued** - Full date when credential was issued
9. **Time Issued** - Exact time of issuance
10. **Metadata Link** - IPFS link (if available)

## Features

### Visual Design
- Color-coded status badges (green for active, red for revoked)
- Sequential numbering for easy tracking
- Detailed information cards with hover effects
- Total count display at the top

### Sorting
- Credentials are sorted by date (newest first)
- Easy to track the most recent issuances

### Wallet Integration
- "Use My Wallet" button for quick access to your own issued credentials
- Works with connected MetaMask wallet

## Technical Details

### Backend Endpoint
```
GET /api/issuer/:walletAddress/credentials
```

### Response Format
```json
{
  "issuerWallet": "0x...",
  "count": 5,
  "credentials": [
    {
      "tokenId": "123456",
      "studentAddress": "0x...",
      "name": "Computer Science Degree",
      "description": "Bachelor's degree in Computer Science",
      "issuedBy": "MIT",
      "dateIssued": "2024-01-15",
      "createdAt": "2024-01-15T10:30:00Z",
      "revoked": false
    }
  ]
}
```

### Storage
- Development mode: In-memory storage (resets on server restart)
- Production mode: Will query blockchain when contract is deployed

## Example Workflow

1. University issues credentials to students
2. Anyone can look up what credentials a university has issued
3. Enter the university's wallet address
4. View complete history of all issued credentials
5. See detailed information about each student credential

## Notes

- In development mode, credentials are stored in memory
- When the backend restarts, the credential history is cleared
- Once the smart contract is deployed, credentials will be permanent on the blockchain
- The wallet address lookup is case-insensitive
