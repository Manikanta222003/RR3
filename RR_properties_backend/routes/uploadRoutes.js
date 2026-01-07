import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "rr_properties",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage });

router.post("/image", (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      console.error("❌ CLOUDINARY UPLOAD ERROR:", err);
      return res.status(500).json({
        message: "Image upload failed",
        error: err.message,
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "No file received",
      });
    }

    console.log("✅ UPLOADED FILE:", req.file.path);

    res.json({
      message: "Image uploaded successfully",
      imageUrl: req.file.path, // Cloudinary URL
    });
  });
});

export default router;
