import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sendOtpMail } from "../utils/sendMail.js";
import { MASTER_ADMIN_EMAIL } from "../config/adminConfig.js";

/* =========================
   REGISTER ADMIN (ONLY ONCE)
========================= */
export const registerAdmin = async (req, res) => {
  try {
    const existing = await Admin.findOne({ username: MASTER_ADMIN_EMAIL });

    if (existing) {
      return res.json({ message: "Admin already exists" });
    }

    await Admin.create({
      username: MASTER_ADMIN_EMAIL,
      password: null, // password will be set via forgot-password
    });

    res.json({
      message: "Admin created. Set password using Forgot Password.",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   LOGIN ADMIN
========================= */
export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password required",
      });
    }

    if (username !== MASTER_ADMIN_EMAIL) {
      return res.status(401).json({
        message: "Unauthorized admin",
      });
    }

    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    if (!admin.password) {
      return res.status(400).json({
        message: "Password not set. Use Forgot Password.",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

   res.cookie("adminToken", token, {
  httpOnly: true,
  sameSite: "none",   // REQUIRED for Vercel → Render
  secure: true,       // REQUIRED for HTTPS
});


    // ✅ ALWAYS RETURN JSON
    return res.status(200).json({
      success: true,
      message: "Login successful",
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};


/* =========================
   FORGOT PASSWORD (SEND OTP)
========================= */
export const forgotPassword = async (req, res) => {
  const admin = await Admin.findOne({ username: MASTER_ADMIN_EMAIL });

  if (!admin) {
    return res.json({ message: "Admin not found" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  admin.otp = otp;
  admin.otpExpiry = Date.now() + 5 * 60 * 1000;
  await admin.save();

  await sendOtpMail(MASTER_ADMIN_EMAIL, otp);

  res.json({ message: "OTP sent to admin email" });
};

/* =========================
   VERIFY OTP
========================= */
export const verifyOtp = async (req, res) => {
  console.log("VERIFY OTP BODY:", req.body);

  if (!req.body || !req.body.otp) {
    return res.status(400).json({ message: "OTP is required" });
  }

  const { otp } = req.body;

  const admin = await Admin.findOne({
    username: MASTER_ADMIN_EMAIL,
    otp,
    otpExpiry: { $gt: Date.now() },
  });

  if (!admin) {
    return res.json({ message: "Invalid or expired OTP" });
  }

  res.json({ message: "OTP verified" });
};

/* =========================
   RESET PASSWORD
========================= */
export const resetPassword = async (req, res) => {
  console.log("RESET BODY:", req.body);

  if (!req.body || !req.body.newPassword) {
    return res.status(400).json({ message: "New password required" });
  }

  const { newPassword } = req.body;

  const hashed = await bcrypt.hash(newPassword, 10);

  await Admin.findOneAndUpdate(
    { username: MASTER_ADMIN_EMAIL },
    {
      password: hashed,
      otp: null,
      otpExpiry: null,
    }
  );

  res.json({ message: "Password updated successfully" });
};
