import axios from "axios";

async function testIssue() {
    console.log("🧪 Testing Issue Credential Endpoint...\n");
    
    // First, get a login token
    console.log("1. Getting login token...");
    try {
        const loginResponse = await axios.post("http://localhost:4001/api/auth/login", {
            email: "admin@test.edu",
            password: "password123"
        });
        
        const token = loginResponse.data.token;
        console.log("✅ Login successful, token received");
        
        // Now test issue endpoint
        console.log("\n2. Testing issue endpoint...");
        
        const issueData = {
            student: "0x092661531D9186Fa6E48501A5e3b508B3F52e64c",
            name: "Test Credential",
            description: "This is a test credential",
            issuedBy: "Test University",
            dateIssued: "2024-11-01"
        };
        
        const issueResponse = await axios.post("http://localhost:4001/api/issue", issueData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        console.log("✅ Issue successful!");
        console.log("📋 Response:", issueResponse.data);
        
    } catch (error) {
        console.log("❌ Error:", error.response?.data || error.message);
    }
}

testIssue();