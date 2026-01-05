import express from "express";
import {
  addProperty,
  getProperties,
  getHomeProperties,
  getBannerImages,
  toggleHomeVisibility,
  toggleNewLaunch,
  deleteProperty,
  getPropertyFilters,
} from "../controllers/propertyController.js";
import adminAuth from "../middlewares/authMiddleware.js";

const router = express.Router();

/* ==============================
   ADD PROPERTY (ADMIN)
============================== */
router.post("/add", adminAuth, addProperty);

/* ==============================
   GET ALL PROPERTIES
   (Properties page)
============================== */
router.get("/", getProperties);

/* ==============================
   GET HOME PAGE PROPERTIES
   (Featured section)
============================== */
router.get("/home", getHomeProperties);

/* ==============================
   GET BANNER IMAGES
   (Hero / banner section)
============================== */
router.get("/banner", getBannerImages);

/* ==============================
   TOGGLE HOME PAGE VISIBILITY
   (ADD / REMOVE FROM HOME)
============================== */
router.patch("/toggle-home/:id", adminAuth, toggleHomeVisibility);

/* ==============================
   TOGGLE NEW LAUNCH BADGE
============================== */
router.patch("/toggle-new-launch/:id", adminAuth, toggleNewLaunch);

/* ==============================
   DELETE PROPERTY (PERMANENT)
   ⚠️ Use carefully
============================== */
router.delete("/delete/:id", adminAuth, deleteProperty);

/* ==============================
   GET FILTER OPTIONS
============================== */
router.get("/filters", getPropertyFilters);

export default router;
