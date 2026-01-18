import express from "express";
import {
  addProperty,
  getProperties,
  getHomeProperties,
  toggleHomeVisibility,
  deleteProperty,
  getPropertyFilters,
  getPropertyBannerImages,
} from "../controllers/propertyController.js";

import adminAuth from "../middlewares/authMiddleware.js";

const router = express.Router();

/* ==============================
   ADD PROPERTY (ADMIN)
============================== */
router.post("/add", adminAuth, addProperty);

/* ==============================
   GET ALL PROPERTIES (PUBLIC)
============================== */
router.get("/", getProperties);

/* ==============================
   GET HOME PAGE PROPERTIES
============================== */
router.get("/home", getHomeProperties);

/* ==============================
   PROPERTY PAGE BANNER SLIDER
============================== */
router.get("/banners", getPropertyBannerImages);

/* ==============================
   FILTER OPTIONS
============================== */
router.get("/filters", getPropertyFilters);

/* ==============================
   TOGGLE HOME PAGE VISIBILITY
============================== */
router.patch("/toggle-home/:id", adminAuth, toggleHomeVisibility);

/* ==============================
   DELETE PROPERTY
============================== */
router.delete("/delete/:id", adminAuth, deleteProperty);

export default router;
