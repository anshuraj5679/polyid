import { Router } from "express";
import { listByAddress } from "../controllers/verifyController.js";

const router = Router();

router.get("/:address", listByAddress);

export default router;












