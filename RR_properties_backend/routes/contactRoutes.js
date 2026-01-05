import express from "express";
import {
  addContactMessage,
  getContactMessages,
  deleteContactMessage,
} from "../controllers/contactController.js";
import adminAuth from "../middlewares/authMiddleware.js";

const router = express.Router();

// PUBLIC
router.post("/add", addContactMessage);

// ADMIN
router.get("/", adminAuth, getContactMessages);
router.delete("/delete/:id", adminAuth, deleteContactMessage);

export default router;
