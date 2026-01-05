import express from "express";
import {
  registerAdmin,
  loginAdmin,
  forgotPassword,
  verifyOtp,
  resetPassword,
} from "../controllers/adminController.js";
import adminAuth from "../middlewares/authMiddleware.js";

const router = express.Router();

/* =====================
   AUTH ROUTES
===================== */
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

router.get("/check-auth", adminAuth, (req, res) => {
  res.json({ message: "Authenticated" });
});

router.post("/logout", (req, res) => {
  res.clearCookie("adminToken");
  res.json({ message: "Logged out" });
});

/* =====================
   FORGOT PASSWORD ROUTES
===================== */
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);

export default router;
