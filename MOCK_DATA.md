# Mock Data & Test Accounts

## Admin Login Credentials

### Default Mock Account (Always Available)
This account works even without MongoDB connection:

```
Email: admin@test.edu
Password: password123
Wallet: 0x8aDEc9885b3A4E5824f329fCCC3026BaFdce6B8F
```

### Additional Test Accounts
You can create these using the seed endpoint (see below):

#### University 1 - MIT
```
Name: Massachusetts Institute of Technology
Email: admin@mit.edu
Password: mit2024
Wallet: 0x1234567890123456789012345678901234567890
```

#### University 2 - Stanford
```
Name: Stanford University
Email: admin@stanford.edu
Password: stanford2024
Wallet: 0x2345678901234567890123456789012345678901
```

#### University 3 - Harvard
```
Name: Harvard University
Email: admin@harvard.edu
Password: harvard2024
Wallet: 0x3456789012345678901234567890123456789012
```

#### University 4 - Oxford
```
Name: Oxford University
Email: admin@oxford.edu
Password: oxford2024
Wallet: 0x4567890123456789012345678901234567890123
```

#### University 5 - Cambridge
```
Name: Cambridge University
Email: admin@cambridge.edu
Password: cambridge2024
Wallet: 0x5678901234567890123456789012345678901234
```

#### University 6 - Yale
```
Name: Yale University
Email: admin@yale.edu
Password: yale2024
Wallet: 0x6789012345678901234567890123456789012345
```

#### University 7 - Princeton
```
Name: Princeton University
Email: admin@princeton.edu
Password: princeton2024
Wallet: 0x7890123456789012345678901234567890123456
```

#### University 8 - Caltech
```
Name: California Institute of Technology
Email: admin@caltech.edu
Password: caltech2024
Wallet: 0x8901234567890123456789012345678901234567
```

#### University 9 - ETH Zurich
```
Name: ETH Zurich
Email: admin@ethz.ch
Password: ethz2024
Wallet: 0x9012345678901234567890123456789012345678
```

#### University 10 - Tokyo University
```
Name: University of Tokyo
Email: admin@u-tokyo.ac.jp
Password: tokyo2024
Wallet: 0xA012345678901234567890123456789012345678
```

## How to Use Mock Accounts

### Method 1: Use Default Account (Easiest)
1. Go to the Admin page
2. Enter:
   - Email: `admin@test.edu`
   - Password: `password123`
3. Click "Login"
4. You're now logged in!

### Method 2: Create Custom Accounts via API

#### Using cURL (Command Line)
```bash
curl -X POST http://localhost:4001/api/auth/seed \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Massachusetts Institute of Technology",
    "email": "admin@mit.edu",
    "password": "mit2024",
    "walletAddress": "0x1234567890123456789012345678901234567890"
  }'
```

#### Using Postman or Thunder Client
```
POST http://localhost:4001/api/auth/seed
Content-Type: application/json

Body:
{
  "name": "Massachusetts Institute of Technology",
  "email": "admin@mit.edu",
  "password": "mit2024",
  "walletAddress": "0x1234567890123456789012345678901234567890"
}
```

#### Using JavaScript/Axios
```javascript
const axios = require('axios');

async function createTestAccount() {
  try {
    const response = await axios.post('http://localhost:4001/api/auth/seed', {
      name: "Massachusetts Institute of Technology",
      email: "admin@mit.edu",
      password: "mit2024",
      walletAddress: "0x1234567890123456789012345678901234567890"
    });
    console.log('Account created:', response.data);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

createTestAccount();
```

## Testing Login Flow

### Step-by-Step Test
1. **Open the application** in your browser
2. **Navigate to Admin page** (click "Admin" in navigation)
3. **Enter credentials**:
   - Email: `admin@test.edu`
   - Password: `password123`
4. **Click "Login"**
5. **Verify success**:
   - You should be redirected to the "Issue" page
   - A "Logout" button appears in the header
   - Subscription status badge appears (if billing is configured)

### Expected Behavior After Login
- ✓ JWT token stored in sessionStorage
- ✓ "Logout" button visible in header
- ✓ Subscription status badge visible (green or yellow)
- ✓ Can access "Issue Credential" page
- ✓ Can access "Billing" page

### Testing Logout
1. Click the "Logout" button in the header
2. Verify:
   - Redirected to Home page
   - "Logout" button disappears
   - Subscription badge disappears
   - sessionStorage cleared

### Testing Auto-Logout (Close Tab)
1. Login with any account
2. Close the browser tab
3. Reopen the application
4. Verify you are logged out (need to login again)

## Mock Student Wallet Addresses

Use these for testing credential issuance:

```
Student 1 - Alice Johnson: 0xA1B2C3D4E5F6789012345678901234567890ABCD
Student 2 - Bob Smith: 0xB2C3D4E5F6789012345678901234567890ABCDEF
Student 3 - Carol Williams: 0xC3D4E5F6789012345678901234567890ABCDEF01
Student 4 - David Brown: 0xD4E5F6789012345678901234567890ABCDEF0123
Student 5 - Emma Davis: 0xE5F6789012345678901234567890ABCDEF012345
Student 6 - Frank Miller: 0xF6789012345678901234567890ABCDEF01234567
Student 7 - Grace Wilson: 0x0123456789012345678901234567890ABCDEF012
Student 8 - Henry Moore: 0x1234567890123456789012345678901234ABCDEF0
Student 9 - Iris Taylor: 0x234567890123456789012345678901234ABCDEF01
Student 10 - Jack Anderson: 0x34567890123456789012345678901234ABCDEF012
Student 11 - Kate Thomas: 0x4567890123456789012345678901234ABCDEF0123
Student 12 - Leo Jackson: 0x567890123456789012345678901234ABCDEF01234
Student 13 - Mia White: 0x67890123456789012345678901234ABCDEF012345
Student 14 - Noah Harris: 0x7890123456789012345678901234ABCDEF0123456
Student 15 - Olivia Martin: 0x890123456789012345678901234ABCDEF01234567
```

## Sample Credential Data

### Example 1: Computer Science Degree
```
Student Wallet: 0xA1B2C3D4E5F6789012345678901234567890ABCD
Course/Name: Bachelor of Science in Computer Science
Issued By: Massachusetts Institute of Technology
Description: Completed 4-year undergraduate program with honors
Date: 2024-05-15
```

### Example 2: Certificate Course
```
Student Wallet: 0xB2C3D4E5F6789012345678901234567890ABCDEF
Course/Name: Advanced Machine Learning Certificate
Issued By: Stanford University
Description: 6-month intensive program in ML and AI
Date: 2024-11-19
```

### Example 3: PhD Degree
```
Student Wallet: 0xC3D4E5F6789012345678901234567890ABCDEF01
Course/Name: Doctor of Philosophy in Physics
Issued By: Harvard University
Description: Research in Quantum Computing and Cryptography
Date: 2024-06-30
```

### Example 4: MBA Degree
```
Student Wallet: 0xD4E5F6789012345678901234567890ABCDEF0123
Course/Name: Master of Business Administration
Issued By: Stanford University
Description: Specialization in Entrepreneurship and Innovation
Date: 2024-08-20
```

### Example 5: Engineering Degree
```
Student Wallet: 0xE5F6789012345678901234567890ABCDEF012345
Course/Name: Bachelor of Engineering in Electrical Engineering
Issued By: MIT
Description: Focus on Robotics and Automation Systems
Date: 2024-05-25
```

### Example 6: Medical Degree
```
Student Wallet: 0xF6789012345678901234567890ABCDEF01234567
Course/Name: Doctor of Medicine (MD)
Issued By: Harvard Medical School
Description: Completed medical degree with clinical rotations
Date: 2024-06-15
```

### Example 7: Law Degree
```
Student Wallet: 0x0123456789012345678901234567890ABCDEF012
Course/Name: Juris Doctor (JD)
Issued By: Yale Law School
Description: Specialization in Constitutional Law
Date: 2024-05-30
```

### Example 8: Data Science Certificate
```
Student Wallet: 0x1234567890123456789012345678901234ABCDEF0
Course/Name: Professional Certificate in Data Science
Issued By: Caltech
Description: 9-month program covering ML, AI, and Big Data
Date: 2024-10-15
```

### Example 9: Cybersecurity Bootcamp
```
Student Wallet: 0x234567890123456789012345678901234ABCDEF01
Course/Name: Cybersecurity Professional Bootcamp
Issued By: MIT Professional Education
Description: Intensive 12-week program in ethical hacking and security
Date: 2024-09-01
```

### Example 10: Blockchain Development Course
```
Student Wallet: 0x34567890123456789012345678901234ABCDEF012
Course/Name: Advanced Blockchain Development Certificate
Issued By: Stanford Online
Description: Smart contracts, DeFi, and Web3 development
Date: 2024-11-10
```

### Example 11: Master's in AI
```
Student Wallet: 0x4567890123456789012345678901234ABCDEF0123
Course/Name: Master of Science in Artificial Intelligence
Issued By: Oxford University
Description: Research in Natural Language Processing and Computer Vision
Date: 2024-07-20
```

### Example 12: Chemistry PhD
```
Student Wallet: 0x567890123456789012345678901234ABCDEF01234
Course/Name: Doctor of Philosophy in Chemistry
Issued By: Cambridge University
Description: Thesis on Sustainable Energy Materials
Date: 2024-08-30
```

### Example 13: Architecture Degree
```
Student Wallet: 0x67890123456789012345678901234ABCDEF012345
Course/Name: Bachelor of Architecture
Issued By: Princeton University
Description: Focus on Sustainable Urban Design
Date: 2024-05-18
```

### Example 14: Psychology Degree
```
Student Wallet: 0x7890123456789012345678901234ABCDEF0123456
Course/Name: Master of Science in Clinical Psychology
Issued By: Yale University
Description: Specialization in Cognitive Behavioral Therapy
Date: 2024-06-25
```

### Example 15: Economics Degree
```
Student Wallet: 0x890123456789012345678901234ABCDEF01234567
Course/Name: Bachelor of Arts in Economics
Issued By: University of Tokyo
Description: Focus on International Trade and Development Economics
Date: 2024-03-31
```

## API Endpoints Reference

### Authentication
```
POST /api/auth/login
Body: { "email": "admin@test.edu", "password": "password123" }
Response: { "token": "jwt_token_here" }

POST /api/auth/seed
Body: { "name": "...", "email": "...", "password": "...", "walletAddress": "..." }
Response: { "issuer": {...} }
```

### Billing Status
```
GET /api/billing/status
Headers: { "Authorization": "Bearer <token>" }
Response: { "active": true/false, "subscription": {...} }
```

### Issue Credential
```
POST /api/issue
Headers: { "Authorization": "Bearer <token>" }
Body: FormData with credential details
Response: { "tokenId": "1", "transactionHash": "0x..." }
```

## Troubleshooting

### "Invalid credentials" error
- Double-check email and password (case-sensitive)
- Ensure backend is running on port 4001
- Check browser console for errors

### "Login required" error
- Token may have expired (12-hour expiration)
- Try logging in again
- Check sessionStorage in browser DevTools

### Account already exists
- Use a different email address
- Or login with existing credentials

## Batch Testing Scripts

### Create All University Accounts (Node.js)
```javascript
const axios = require('axios');

const universities = [
  { name: "Massachusetts Institute of Technology", email: "admin@mit.edu", password: "mit2024", walletAddress: "0x1234567890123456789012345678901234567890" },
  { name: "Stanford University", email: "admin@stanford.edu", password: "stanford2024", walletAddress: "0x2345678901234567890123456789012345678901" },
  { name: "Harvard University", email: "admin@harvard.edu", password: "harvard2024", walletAddress: "0x3456789012345678901234567890123456789012" },
  { name: "Oxford University", email: "admin@oxford.edu", password: "oxford2024", walletAddress: "0x4567890123456789012345678901234567890123" },
  { name: "Cambridge University", email: "admin@cambridge.edu", password: "cambridge2024", walletAddress: "0x5678901234567890123456789012345678901234" },
  { name: "Yale University", email: "admin@yale.edu", password: "yale2024", walletAddress: "0x6789012345678901234567890123456789012345" },
  { name: "Princeton University", email: "admin@princeton.edu", password: "princeton2024", walletAddress: "0x7890123456789012345678901234567890123456" },
  { name: "California Institute of Technology", email: "admin@caltech.edu", password: "caltech2024", walletAddress: "0x8901234567890123456789012345678901234567" },
  { name: "ETH Zurich", email: "admin@ethz.ch", password: "ethz2024", walletAddress: "0x9012345678901234567890123456789012345678" },
  { name: "University of Tokyo", email: "admin@u-tokyo.ac.jp", password: "tokyo2024", walletAddress: "0xA012345678901234567890123456789012345678" }
];

async function seedAllUniversities() {
  for (const uni of universities) {
    try {
      const response = await axios.post('http://localhost:4001/api/auth/seed', uni);
      console.log(`✓ Created: ${uni.name}`);
    } catch (error) {
      console.error(`✗ Failed: ${uni.name} - ${error.response?.data?.error || error.message}`);
    }
  }
}

seedAllUniversities();
```

### Bash Script to Create All Accounts
```bash
#!/bin/bash

API_BASE="http://localhost:4001/api/auth/seed"

# Array of universities
declare -a universities=(
  '{"name":"Massachusetts Institute of Technology","email":"admin@mit.edu","password":"mit2024","walletAddress":"0x1234567890123456789012345678901234567890"}'
  '{"name":"Stanford University","email":"admin@stanford.edu","password":"stanford2024","walletAddress":"0x2345678901234567890123456789012345678901"}'
  '{"name":"Harvard University","email":"admin@harvard.edu","password":"harvard2024","walletAddress":"0x3456789012345678901234567890123456789012"}'
  '{"name":"Oxford University","email":"admin@oxford.edu","password":"oxford2024","walletAddress":"0x4567890123456789012345678901234567890123"}'
  '{"name":"Cambridge University","email":"admin@cambridge.edu","password":"cambridge2024","walletAddress":"0x5678901234567890123456789012345678901234"}'
  '{"name":"Yale University","email":"admin@yale.edu","password":"yale2024","walletAddress":"0x6789012345678901234567890123456789012345"}'
  '{"name":"Princeton University","email":"admin@princeton.edu","password":"princeton2024","walletAddress":"0x7890123456789012345678901234567890123456"}'
  '{"name":"California Institute of Technology","email":"admin@caltech.edu","password":"caltech2024","walletAddress":"0x8901234567890123456789012345678901234567"}'
  '{"name":"ETH Zurich","email":"admin@ethz.ch","password":"ethz2024","walletAddress":"0x9012345678901234567890123456789012345678"}'
  '{"name":"University of Tokyo","email":"admin@u-tokyo.ac.jp","password":"tokyo2024","walletAddress":"0xA012345678901234567890123456789012345678"}'
)

# Create each university account
for uni in "${universities[@]}"
do
  echo "Creating account..."
  curl -X POST "$API_BASE" \
    -H "Content-Type: application/json" \
    -d "$uni"
  echo ""
done

echo "All accounts created!"
```

### PowerShell Script (Windows)
```powershell
$API_BASE = "http://localhost:4001/api/auth/seed"

$universities = @(
    @{name="Massachusetts Institute of Technology"; email="admin@mit.edu"; password="mit2024"; walletAddress="0x1234567890123456789012345678901234567890"},
    @{name="Stanford University"; email="admin@stanford.edu"; password="stanford2024"; walletAddress="0x2345678901234567890123456789012345678901"},
    @{name="Harvard University"; email="admin@harvard.edu"; password="harvard2024"; walletAddress="0x3456789012345678901234567890123456789012"},
    @{name="Oxford University"; email="admin@oxford.edu"; password="oxford2024"; walletAddress="0x4567890123456789012345678901234567890123"},
    @{name="Cambridge University"; email="admin@cambridge.edu"; password="cambridge2024"; walletAddress="0x5678901234567890123456789012345678901234"},
    @{name="Yale University"; email="admin@yale.edu"; password="yale2024"; walletAddress="0x6789012345678901234567890123456789012345"},
    @{name="Princeton University"; email="admin@princeton.edu"; password="princeton2024"; walletAddress="0x7890123456789012345678901234567890123456"},
    @{name="California Institute of Technology"; email="admin@caltech.edu"; password="caltech2024"; walletAddress="0x8901234567890123456789012345678901234567"},
    @{name="ETH Zurich"; email="admin@ethz.ch"; password="ethz2024"; walletAddress="0x9012345678901234567890123456789012345678"},
    @{name="University of Tokyo"; email="admin@u-tokyo.ac.jp"; password="tokyo2024"; walletAddress="0xA012345678901234567890123456789012345678"}
)

foreach ($uni in $universities) {
    $body = $uni | ConvertTo-Json
    try {
        $response = Invoke-RestMethod -Uri $API_BASE -Method Post -Body $body -ContentType "application/json"
        Write-Host "✓ Created: $($uni.name)" -ForegroundColor Green
    } catch {
        Write-Host "✗ Failed: $($uni.name) - $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "All accounts processed!" -ForegroundColor Cyan
```

## Complete Test Scenarios

### Scenario 1: New Student Enrollment
```
University: MIT (admin@mit.edu / mit2024)
Student: Alice Johnson (0xA1B2C3D4E5F6789012345678901234567890ABCD)
Credential: Bachelor of Science in Computer Science
Date: 2024-05-15
```

### Scenario 2: Certificate Program
```
University: Stanford (admin@stanford.edu / stanford2024)
Student: Bob Smith (0xB2C3D4E5F6789012345678901234567890ABCDEF)
Credential: Advanced Machine Learning Certificate
Date: 2024-11-19
```

### Scenario 3: Graduate Degree
```
University: Harvard (admin@harvard.edu / harvard2024)
Student: Carol Williams (0xC3D4E5F6789012345678901234567890ABCDEF01)
Credential: Doctor of Philosophy in Physics
Date: 2024-06-30
```

### Scenario 4: Professional Development
```
University: Caltech (admin@caltech.edu / caltech2024)
Student: David Brown (0xD4E5F6789012345678901234567890ABCDEF0123)
Credential: Professional Certificate in Data Science
Date: 2024-10-15
```

### Scenario 5: International Student
```
University: University of Tokyo (admin@u-tokyo.ac.jp / tokyo2024)
Student: Emma Davis (0xE5F6789012345678901234567890ABCDEF012345)
Credential: Bachelor of Arts in Economics
Date: 2024-03-31
```

## CSV Format for Bulk Import

### Universities CSV
```csv
name,email,password,walletAddress
Massachusetts Institute of Technology,admin@mit.edu,mit2024,0x1234567890123456789012345678901234567890
Stanford University,admin@stanford.edu,stanford2024,0x2345678901234567890123456789012345678901
Harvard University,admin@harvard.edu,harvard2024,0x3456789012345678901234567890123456789012
Oxford University,admin@oxford.edu,oxford2024,0x4567890123456789012345678901234567890123
Cambridge University,admin@cambridge.edu,cambridge2024,0x5678901234567890123456789012345678901234
Yale University,admin@yale.edu,yale2024,0x6789012345678901234567890123456789012345
Princeton University,admin@princeton.edu,princeton2024,0x7890123456789012345678901234567890123456
California Institute of Technology,admin@caltech.edu,caltech2024,0x8901234567890123456789012345678901234567
ETH Zurich,admin@ethz.ch,ethz2024,0x9012345678901234567890123456789012345678
University of Tokyo,admin@u-tokyo.ac.jp,tokyo2024,0xA012345678901234567890123456789012345678
```

### Students CSV
```csv
name,walletAddress
Alice Johnson,0xA1B2C3D4E5F6789012345678901234567890ABCD
Bob Smith,0xB2C3D4E5F6789012345678901234567890ABCDEF
Carol Williams,0xC3D4E5F6789012345678901234567890ABCDEF01
David Brown,0xD4E5F6789012345678901234567890ABCDEF0123
Emma Davis,0xE5F6789012345678901234567890ABCDEF012345
Frank Miller,0xF6789012345678901234567890ABCDEF01234567
Grace Wilson,0x0123456789012345678901234567890ABCDEF012
Henry Moore,0x1234567890123456789012345678901234ABCDEF0
Iris Taylor,0x234567890123456789012345678901234ABCDEF01
Jack Anderson,0x34567890123456789012345678901234ABCDEF012
Kate Thomas,0x4567890123456789012345678901234ABCDEF0123
Leo Jackson,0x567890123456789012345678901234ABCDEF01234
Mia White,0x67890123456789012345678901234ABCDEF012345
Noah Harris,0x7890123456789012345678901234ABCDEF0123456
Olivia Martin,0x890123456789012345678901234ABCDEF01234567
```

## Security Notes

⚠️ **Important**: These are test accounts for development only!

- Never use these credentials in production
- Change all passwords before deploying
- Use environment variables for sensitive data
- Implement proper password policies for production
- Add email verification for production accounts
- Rotate test credentials regularly
- Don't commit credentials to version control
