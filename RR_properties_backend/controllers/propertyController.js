import Property from "../models/Property.js";

/* =========================
   ADD PROPERTY (ADMIN)
========================= */
export const addProperty = async (req, res) => {
  try {
    const {
      title,
      location,
      flatType,
      constructionStatus,
      unitSize,
      price,
      uds,
      projectCode,
      remarks,
      facing = [],          // ✅ ARRAY
      showOnHome = false,
      isNewLaunch = true,
      images = [],
    } = req.body;

    /* =========================
       VALIDATION
    ========================= */
    if (!title || !location || !flatType || !constructionStatus) {
      return res.status(400).json({
        message: "Required fields missing",
      });
    }

    if (!Array.isArray(images) || images.length === 0) {
      return res.status(400).json({
        message: "At least one image is required",
      });
    }

    /* =========================
       REMOVE DUPLICATE IMAGES
    ========================= */
    const uniqueImagesMap = new Map();

    images.forEach((img) => {
      if (img?.url && !uniqueImagesMap.has(img.url)) {
        uniqueImagesMap.set(img.url, {
          url: img.url,
          isMain: !!img.isMain,
          isPropertyBanner: !!img.isPropertyBanner,
          isHomeBanner: !!img.isHomeBanner,
        });
      }
    });

    const property = await Property.create({
      title,
      location,
      flatType,
      constructionStatus,
      unitSize,
      price,
      uds,
      projectCode,
      remarks,
      facing, // ✅ MULTI
      showOnHome,
      isNewLaunch,
      images: Array.from(uniqueImagesMap.values()),
    });

    res.status(201).json({
      message: "Property added successfully",
      property,
    });
  } catch (err) {
    console.error("ADD PROPERTY ERROR:", err);
    res.status(500).json({
      message: "Failed to add property",
    });
  }
};

/* =========================
   GET ALL PROPERTIES (PUBLIC)
========================= */
/* =========================
   GET ALL PROPERTIES (WITH FILTERS)
========================= */
export const getProperties = async (req, res) => {
  try {
    const {
      location,
      flatType,
      constructionStatus,
      price,
      facing,
      search,
      projectCode,
    } = req.query;

    let filter = {};

    if (location) filter.location = location;
    if (flatType) filter.flatType = flatType;
    if (constructionStatus)
      filter.constructionStatus = constructionStatus;
    if (price) filter.price = price;
    if (projectCode) filter.projectCode = projectCode;

    if (facing) {
      filter.facing = { $in: [facing] };
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }

    const properties = await Property.find(filter).sort({
      createdAt: -1,
    });

    res.json(properties);
  } catch (err) {
    console.error("GET PROPERTIES ERROR:", err);
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
   TOGGLE HOME VISIBILITY
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
      message: "Home visibility updated",
      property,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to update home visibility",
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
      message: "New launch status updated",
      property,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to update new launch status",
    });
  }
};

/* =========================
   DELETE PROPERTY
========================= */
export const deleteProperty = async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: "Property deleted permanently" });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete property",
    });
  }
};

/* =========================
   FILTER OPTIONS API
========================= */
/* =========================
   FILTER OPTIONS API
========================= */
export const getPropertyFilters = async (req, res) => {
  try {
    const flatTypes = await Property.distinct("flatType");
    const constructionStatus = await Property.distinct("constructionStatus");
    const facings = await Property.distinct("facing");
    const locations = await Property.distinct("location");
    const prices = await Property.distinct("price");

    res.json({
      flatTypes,
      constructionStatus,
      facings: facings.flat().filter((f) => f),
      locations: locations.filter((l) => l && l.trim() !== ""),
      prices: prices.filter((p) => p && p.trim() !== ""),
    });
  } catch (err) {
    console.error("FILTER API ERROR:", err);
    res.status(500).json({
      message: "Failed to load filters",
    });
  }
};


/* =========================
   PROPERTY PAGE BANNER SLIDER
========================= */
export const getPropertyBannerImages = async (req, res) => {
  try {
    const properties = await Property.find({
      "images.isPropertyBanner": true,
    });

    const banners = properties.flatMap((p) =>
      p.images.filter((img) => img.isPropertyBanner)
    );

    res.json(banners);
  } catch (err) {
    res.status(500).json({
      message: "Failed to load property banners",
    });
  }
};
