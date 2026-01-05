import express from "express";
import { addBanner, getBanners, deleteBanner } from "../controllers/bannerController.js";
import adminAuth from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getBanners);
router.post("/add", adminAuth, addBanner);
router.delete("/delete/:id", adminAuth, deleteBanner);

export default router;
