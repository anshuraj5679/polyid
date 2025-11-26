import { Router } from "express";
import { login, seedIssuer } from "../controllers/authController.js";

const router = Router();

router.post("/login", login);
// Development helper: seed issuer
router.post("/seed", seedIssuer);

export default router;












