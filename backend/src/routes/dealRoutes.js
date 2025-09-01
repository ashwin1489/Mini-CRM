import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getDeals, createDeal, updateDeal, deleteDeal } from "../controllers/dealController.js";
const router = express.Router();

router.get("/", protect, getDeals);
router.post("/", protect, createDeal);
router.put("/:id", protect, updateDeal);
router.delete("/:id", protect, deleteDeal);

export default router;
