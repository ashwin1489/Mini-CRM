import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getAnalytics, recalcAnalytics } from "../controllers/analyticsController.js";
const router = express.Router();

router.get("/", protect, getAnalytics);
router.post("/recalc", protect, recalcAnalytics);

export default router;
