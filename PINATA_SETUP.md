# 🌐 Pinata IPFS Setup Guide

## What is Pinata?
Pinata is a service that makes it easy to store files on IPFS (InterPlanetary File System). In PolyID, we use it to store:
- Credential metadata (JSON)
- Uploaded files (certificates, documents)

## Why Do You Need It?
- **Decentralized Storage**: Files stored on IPFS are distributed and permanent
- **Blockchain Integration**: Smart contracts can reference IPFS hashes
- **Cost Effective**: Much cheaper than storing files directly on blockchain

## Setup Instructions

### Step 1: Create Pinata Account
1. Visit https://pinata.cloud/
2. Sign up for a free account
3. Verify your email address

### Step 2: Get API Credentials

#### Option A: JWT Token (Recommended)
1. Go to https://app.pinata.cloud/keys
2. Click "New Key" → "Admin"
3. Give it a name like "PolyID"
4. Copy the JWT token
5. Add to `backend/.env`:
   ```
   PINATA_JWT=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

#### Option B: API Keys (Legacy)
1. Go to https://app.pinata.cloud/keys
2. Click "New Key" → "Admin"
3. Copy both API Key and Secret Key
4. Add to `backend/.env`:
   ```
   PINATA_API_KEY=your_api_key_here
   PINATA_SECRET_KEY=your_secret_key_here
   ```

### Step 3: Test Configuration
```bash
# From backend directory
node -e "
import('./config/pinata.js').then(async (pinata) => {
  const result = await pinata.testPinataConnection();
  console.log('Pinata test:', result);
});
"
```

## Current Status (Without Pinata)
✅ **Backend Works**: Uses fallback data URIs
✅ **File Uploads**: Converted to base64 data URIs
✅ **Metadata Storage**: Stored as base64 JSON
⚠️ **Limitation**: Files stored in blockchain metadata (size limited)

## With Pinata Configured
✅ **True IPFS Storage**: Files stored on distributed network
✅ **Unlimited File Sizes**: No blockchain size limits
✅ **Permanent Storage**: Files persist even if your server goes down
✅ **Global Access**: Files accessible from anywhere via IPFS gateways

## Free Tier Limits
- **Storage**: 1 GB
- **Bandwidth**: 100 GB/month
- **Requests**: 100 requests/second

This is more than enough for testing and small-scale deployment!

## Testing Your Setup

### 1. Check Backend Logs
After adding Pinata credentials, restart backend and look for:
```
[pinata] Connection test successful
```

### 2. Test File Upload
1. Go to your frontend
2. Click "Issue" credential
3. Upload a small file
4. Check backend logs for:
   ```
   [issue] File uploaded to IPFS: QmXXXXXX...
   [issue] Metadata uploaded to IPFS: QmYYYYYY...
   ```

### 3. Verify on Pinata Dashboard
1. Go to https://app.pinata.cloud/pinmanager
2. You should see your uploaded files

## Troubleshooting

### "No Pinata credentials" Error
- Make sure you added PINATA_JWT or both PINATA_API_KEY + PINATA_SECRET_KEY
- Restart the backend after adding credentials

### "Authentication failed" Error
- Check if your JWT/API keys are correct
- Make sure there are no extra spaces in the .env file
- Try regenerating the keys on Pinata dashboard

### Files Not Appearing
- Check the Pinata dashboard for upload status
- Verify your account hasn't exceeded free tier limits
- Check backend logs for detailed error messages

## Alternative: Continue Without Pinata
Your application works perfectly without Pinata using:
- **Base64 Data URIs**: Files embedded directly in metadata
- **JSON Storage**: Metadata stored as base64 strings
- **Blockchain Storage**: Everything stored on-chain (with size limits)

This is fine for testing and small files, but Pinata is recommended for production use.