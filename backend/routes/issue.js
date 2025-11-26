import { Router } from "express";
import multer from "multer";
import fs from "fs";
import { authRequired } from "../middleware/auth.js";
import { requireActiveSubscription } from "../middleware/subscription.js";
import { issueCredential } from "../controllers/issueController.js";

const router = Router();

// Ensure uploads directory exists
if (!fs.existsSync("uploads")) {
	fs.mkdirSync("uploads", { recursive: true });
}

const upload = multer({ dest: "uploads/" });

router.post("/", authRequired, requireActiveSubscription, upload.single("file"), issueCredential);

export default router;

