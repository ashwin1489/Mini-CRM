import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { addNote, getNotes } from "../controllers/noteController.js";
const router = express.Router();

router.get("/:contactId", protect, getNotes);
router.post("/", protect, addNote);

export default router;
