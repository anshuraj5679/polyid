import { Router } from "express";
import { authRequired } from "../middleware/auth.js";
import { createCheckoutSession, createPortalSession, getSubscriptionStatus, listPlans, activateTestSubscription } from "../controllers/billingController.js";

const router = Router();

router.get("/plans", listPlans);
router.get("/status", authRequired, getSubscriptionStatus);
router.post("/checkout", authRequired, createCheckoutSession);
router.post("/portal", authRequired, createPortalSession);
router.post("/test-subscribe", authRequired, activateTestSubscription);

export default router;



