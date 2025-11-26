import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import issueRoutes from "./routes/issue.js";
import tempIssueRoutes from "./routes/temp-issue.js";
import verifyRoutes from "./routes/verify.js";
import credentialRoutes from "./routes/credential.js";
import issuerRoutes from "./routes/issuer.js";
import billingRoutes from "./routes/billing.js";
import { stripeWebhookHandler } from "./controllers/billingController.js";

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.ALLOWED_ORIGIN || "*" }));
app.post("/api/billing/webhook", express.raw({ type: "application/json" }), stripeWebhookHandler);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Serve uploads directory statically
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/billing", billingRoutes);

// Check contract deployment status
const contractAddress = process.env.CONTRACT_ADDRESS;
console.log("🔍 Contract Address:", contractAddress || "NOT SET");

if (!contractAddress || contractAddress === "0x1234567890123456789012345678901234567890") {
    console.log("⚠️  Using temporary issue endpoint (contract not deployed or mock)");
    app.use("/api/issue", tempIssueRoutes);
} else {
    console.log("✅ Using real contract issue endpoint");
    app.use("/api/issue", issueRoutes);
}

app.use("/api/verify", verifyRoutes);
app.use("/api/credential", credentialRoutes);
app.use("/api/issuers", issuerRoutes);

async function startServer() {
    try {
        // Get port from environment or use default
        const PORT = parseInt(process.env.PORT) || 4001;

        console.log(`🚀 Starting backend on port ${PORT}...`);

        // Try to connect to MongoDB but don't fail if it's not available
        try {
            await connectDB();
            console.log("✅ MongoDB connected");
        } catch (err) {
            console.warn("⚠️  MongoDB not connected:", err.message);
            console.warn("📝 Backend will work without MongoDB (limited functionality)");
        }

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`✅ Backend listening on http://localhost:${PORT}`);
            console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
            console.log(`📋 Contract status: ${contractAddress ? 'DEPLOYED' : 'NOT DEPLOYED'}`);
        }).on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                console.error(`❌ Port ${PORT} is already in use`);
                console.log(`💡 Try: kill the process using port ${PORT} or change PORT in .env`);
            } else {
                console.error(`❌ Server error:`, err);
            }
            process.exit(1);
        });

    } catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1);
    }
}

startServer();