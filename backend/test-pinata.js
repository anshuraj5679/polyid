import { testPinataConnection, uploadJSONToPinata } from "./config/pinata.js";
import dotenv from "dotenv";

dotenv.config();

async function testPinata() {
    console.log("🧪 Testing Pinata Configuration...\n");
    
    // Test connection
    console.log("1. Testing authentication...");
    const authTest = await testPinataConnection();
    
    if (authTest.success) {
        console.log("✅ Pinata authentication successful!");
        console.log("📊 Account info:", authTest.data);
        
        // Test JSON upload
        console.log("\n2. Testing JSON upload...");
        try {
            const testData = {
                name: "Test Credential",
                description: "This is a test upload from PolyID",
                timestamp: new Date().toISOString(),
                project: "polyid-test"
            };
            
            const result = await uploadJSONToPinata(testData, "polyid-test");
            console.log("✅ JSON upload successful!");
            console.log("📋 IPFS Hash:", result.IpfsHash);
            console.log("🌐 Gateway URL:", `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`);
            
        } catch (error) {
            console.log("❌ JSON upload failed:", error.message);
        }
        
    } else {
        console.log("❌ Pinata authentication failed:", authTest.error);
        console.log("\n💡 To fix this:");
        console.log("1. Get API credentials from https://app.pinata.cloud/keys");
        console.log("2. Add PINATA_JWT or PINATA_API_KEY + PINATA_SECRET_KEY to .env");
        console.log("3. Restart the backend");
    }
}

testPinata().catch(console.error);