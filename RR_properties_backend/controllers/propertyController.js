import Property from "../models/Property.js";

/* =========================
   ADD PROPERTY (ADMIN)
========================= */
export const addProperty = async (req, res) => {
  try {
    const {
      title,
      location,
      city,
      locality,
      typology,
      status,
      unitSize,
      price,
      showOnHome = false,
      useAsBanner = false,
      isNewLaunch = true,
      images = [],
    } = req.body;

    /* 🔒 REMOVE DUPLICATE IMAGES (SAFETY) */
    const uniqueImagesMap = new Map();
    images.forEach((img) => {
      if (img?.url && !uniqueImagesMap.has(img.url)) {
        uniqueImagesMap.set(img.url, img);
      }
    });

    const property = new Property({
      title,
      location,
      city,
      locality,
      typology,
      status,
      unitSize,
      price,
      showOnHome,
      useAsBanner,
      isNewLaunch,
      images: Array.from(uniqueImagesMap.values()),
    });

    await property.save();

    res.status(201).json({
      message: "Property added successfully",
      property,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to add property",
    });
  }
};

/* =========================
   GET ALL PROPERTIES (PUBLIC)
========================= */
export const getProperties = async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json(properties);
  } catch (err) {
    res.status(500).json({
      message: "Failed to load properties",
    });
  }
};

/* =========================
   GET HOME PAGE PROPERTIES
========================= */
export const getHomeProperties = async (req, res) => {
  try {
    const properties = await Property.find({
      showOnHome: true,
    }).sort({ createdAt: -1 });

    res.json(properties);
  } catch (err) {
    res.status(500).json({
      message: "Failed to load home properties",
    });
  }
};

/* =========================
   TOGGLE HOME PAGE VISIBILITY
========================= */
export const toggleHomeVisibility = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    property.showOnHome = !property.showOnHome;
    await property.save();

    res.json({
      message: property.showOnHome
        ? "Property added to Home page"
        : "Property removed from Home page",
      property,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to update Home visibility",
    });
  }
};

/* =========================
   TOGGLE NEW LAUNCH
========================= */
export const toggleNewLaunch = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    property.isNewLaunch = !property.isNewLaunch;
    await property.save();

    res.json({
      message: property.isNewLaunch
        ? "Marked as New Launch"
        : "Removed from New Launch",
      property,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to update New Launch status",
    });
  }
};

/* =========================
   DELETE PROPERTY (ADMIN)
========================= */
export const deleteProperty = async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);

    res.json({
      message: "Property deleted permanently",
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete property",
    });
  }
};

/* =========================
   GET PROPERTY FILTER OPTIONS
========================= */
export const getPropertyFilters = async (req, res) => {
  try {
    const cities = await Property.distinct("city");
    const localities = await Property.distinct("locality");
    const typologies = await Property.distinct("typology");
    const statuses = await Property.distinct("status");

    res.json({
      cities,
      localities,
      typologies,
      statuses,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to load filters",
    });
  }
};

/* =========================
   GET BANNER IMAGES
========================= */
export const getBannerImages = async (req, res) => {
  try {
    const properties = await Property.find({
      useAsBanner: true,
      "images.isBanner": true,
    });

    const bannerImages = properties.flatMap((property) =>
      property.images
        .filter((img) => img.isBanner)
        .map((img) => img.url)
    );

    res.json(bannerImages);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to load property banners",
    });
  }
};
