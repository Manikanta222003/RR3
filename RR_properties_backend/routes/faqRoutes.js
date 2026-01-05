import express from "express";
import {
  addFaq,
  getFaqs,
  deleteFaq,
} from "../controllers/faqController.js";

import adminAuth from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add", adminAuth, addFaq);
router.get("/", getFaqs);
router.delete("/delete/:id", adminAuth, deleteFaq);

export default router;
