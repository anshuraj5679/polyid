import express from "express";
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

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.ALLOWED_ORIGIN || "*" }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
// Use temp issue route if no contract deployed, otherwise use real issue route
const contractAddress = process.env.CONTRACT_ADDRESS;
if (!contractAddress) {
    console.log("⚠️  Using temporary issue endpoint (contract not deployed)");
    app.use("/api/issue", tempIssueRoutes);
} else {
    app.use("/api/issue", issueRoutes);
}
app.use("/api/verify", verifyRoutes);
app.use("/api/credential", credentialRoutes);
app.use("/api/issuers", issuerRoutes);

const port = process.env.PORT || 4000;
connectDB()
	.then(() => {
		app.listen(port, () => console.log(`Backend listening on :${port}`));
	})
	.catch((err) => {
		console.error("Failed to connect to MongoDB:", err.message);
		console.error("Make sure MongoDB is running or MONGODB_URI is correct");
		app.listen(port, () => console.log(`Backend listening on :${port} (MongoDB not connected)`));
	});
