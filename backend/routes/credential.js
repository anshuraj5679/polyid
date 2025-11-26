import { Router } from "express";
import { authRequired } from "../middleware/auth.js";
import { getByToken, revoke } from "../controllers/credentialController.js";

const router = Router();

router.get("/:tokenId", getByToken);
router.post("/:tokenId/revoke", authRequired, revoke);

export default router;












