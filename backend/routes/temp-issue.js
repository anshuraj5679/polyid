import { Router } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { authRequired } from "../middleware/auth.js";
import { requireActiveSubscription } from "../middleware/subscription.js";

const router = Router();
const upload = multer({ dest: "uploads/" });

// In-memory storage for issued credentials
const issuedCredentials = new Map();
const CREDENTIALS_FILE = "credentials.json";

// Load credentials from file on startup
function loadCredentials() {
    try {
        if (fs.existsSync(CREDENTIALS_FILE)) {
            const data = fs.readFileSync(CREDENTIALS_FILE, "utf8");
            const credentials = JSON.parse(data);
            credentials.forEach(c => issuedCredentials.set(c.tokenId, c));
            console.log(`[temp-issue] Loaded ${credentials.length} credentials from ${CREDENTIALS_FILE}`);
        }
    } catch (e) {
        console.error("[temp-issue] Failed to load credentials:", e.message);
    }
}

// Save credentials to file
function saveCredentials() {
    try {
        const credentials = Array.from(issuedCredentials.values());
        fs.writeFileSync(CREDENTIALS_FILE, JSON.stringify(credentials, null, 2));
        console.log(`[temp-issue] Saved ${credentials.length} credentials to ${CREDENTIALS_FILE}`);
    } catch (e) {
        console.error("[temp-issue] Failed to save credentials:", e.message);
    }
}

// Initialize on module load
loadCredentials();

// Export function to store credential in memory
export function storeCredentialInMemory(tokenId, credentialData) {
    issuedCredentials.set(tokenId, credentialData);
    saveCredentials(); // Persist to file
    console.log(`[temp-issue] Stored credential ${tokenId} in memory`);
}

// Export function to get credentials by issuer
export function getCredentialsByIssuer(issuerWallet) {
    const credentials = [];
    for (const [tokenId, cred] of issuedCredentials.entries()) {
        if (cred.issuerWallet && cred.issuerWallet.toLowerCase() === issuerWallet.toLowerCase()) {
            credentials.push(cred);
        }
    }
    // Sort by date issued (newest first)
    return credentials.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

// Export function to get credentials by student
export function getCredentialsByStudent(studentWallet) {
    const credentials = [];
    for (const [tokenId, cred] of issuedCredentials.entries()) {
        if (cred.studentAddress && cred.studentAddress.toLowerCase() === studentWallet.toLowerCase()) {
            credentials.push(cred);
        }
    }
    // Sort by date issued (newest first)
    return credentials.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

// Temporary issue endpoint for testing without deployed contract
router.post("/", authRequired, requireActiveSubscription, upload.single("file"), async (req, res) => {
    try {
        const { student, studentName, name, description, issuedBy, recipient, dateIssued } = req.body;

        if (!student) {
            return res.status(400).json({ error: "student address required" });
        }

        // Handle file upload
        let fileUrl = "";
        if (req.file) {
            try {
                // Determine extension
                const mimeType = req.file.mimetype;
                let ext = ".bin";
                if (mimeType === "image/jpeg") ext = ".jpg";
                else if (mimeType === "image/png") ext = ".png";
                else if (mimeType === "application/pdf") ext = ".pdf";

                const filename = `${req.file.filename}${ext}`;
                const newPath = path.join("uploads", filename);

                // Rename file to include extension
                fs.renameSync(req.file.path, newPath);

                // Construct static URL
                const baseUrl = `${req.protocol}://${req.get('host')}`;
                fileUrl = `${baseUrl}/uploads/${filename}`;

                console.log(`📎 File saved to ${newPath}, URL: ${fileUrl}`);
            } catch (err) {
                console.warn("Failed to process uploaded file:", err);
            }
        }

        const tokenId = Math.floor(Math.random() * 1000000).toString();
        const createdAt = new Date().toISOString();

        // Generate a proper 64-character hex transaction hash
        const generateTxHash = () => {
            let hash = '0x';
            const chars = '0123456789abcdef';
            for (let i = 0; i < 64; i++) {
                hash += chars[Math.floor(Math.random() * 16)];
            }
            return hash;
        };

        // Store credential in memory
        const credential = {
            tokenId,
            studentAddress: student,
            studentName: studentName || "Student",
            name: name || "Test Credential",
            description: description || "Test credential for development",
            issuedBy: issuedBy || "Test Institution",
            recipient: recipient || student,
            dateIssued: dateIssued || new Date().toISOString().slice(0, 10),
            issuerWallet: req.user?.walletAddress || req.body.issuerWallet,
            createdAt,
            revoked: false,
            file: fileUrl // Store the data URI
        };

        issuedCredentials.set(tokenId, credential);
        saveCredentials(); // Persist to file

        // Simulate successful credential issuance
        const mockResponse = {
            tokenId,
            transactionHash: generateTxHash(),
            metadataURI: `data:application/json;base64,${Buffer.from(JSON.stringify({
                name: credential.name,
                description: credential.description,
                issuedBy: credential.issuedBy,
                recipient: credential.recipient,
                dateIssued: credential.dateIssued,
                file: fileUrl
            })).toString('base64')}`,
            fileUrl: fileUrl,
            note: "⚠️ This is a test response. Deploy the contract to issue real credentials."
        };

        console.log("🧪 Test credential issued:", mockResponse);
        return res.json(mockResponse);

    } catch (error) {
        console.error("Test issue error:", error);
        return res.status(500).json({ error: "Test mode: " + error.message });
    }
});

export default router;