
import express from "express";
import {
  addProperty,
  getProperties,
  getHomeProperties,
  toggleHomeVisibility,
  deleteProperty,
  getPropertyFilters,
  getPropertyBannerImages,
  getPropertyById,
  updateProperty,
  deletePropertyImage
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
   GET SINGLE PROPERTY (FOR EDIT PAGE)
============================== */
router.get("/:id", getPropertyById);

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
   UPDATE PROPERTY (ADMIN EDIT)
============================== */
router.put("/update/:id", adminAuth, updateProperty);

/* ==============================
   DELETE SINGLE IMAGE FROM PROPERTY
============================== */
router.delete("/delete-image", adminAuth, deletePropertyImage);

/* ==============================
   TOGGLE HOME PAGE VISIBILITY
============================== */
router.patch("/toggle-home/:id", adminAuth, toggleHomeVisibility);

/* ==============================
   DELETE PROPERTY
============================== */
router.delete("/delete/:id", adminAuth, deleteProperty);

export default router;

