import axios from "axios";

async function testLogin() {
    console.log("🧪 Testing Admin Login...\n");
    
    try {
        const response = await axios.post("http://localhost:4001/api/auth/login", {
            email: "admin@test.edu",
            password: "password123"
        });
        
        console.log("✅ Login successful!");
        console.log("🔑 Token received:", response.data.token ? "Yes" : "No");
        console.log("📋 Response:", response.data);
        
    } catch (error) {
        console.log("❌ Login failed:");
        console.log("📋 Error:", error.response?.data || error.message);
    }
}

testLogin();