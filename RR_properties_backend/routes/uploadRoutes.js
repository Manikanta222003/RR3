import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

router.post("/image", upload.single("image"), (req, res) => {
  res.json({
    message: "Image uploaded",
    imageUrl: `http://localhost:5000/uploads/${req.file.filename}`
  });
});

export default router;
