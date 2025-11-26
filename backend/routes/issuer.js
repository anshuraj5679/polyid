import { Router } from "express";
import { listVerified, getIssuerCredentials } from "../controllers/issuerController.js";

const router = Router();

router.get("/", listVerified);
router.get("/:walletAddress/credentials", getIssuerCredentials);

export default router;












