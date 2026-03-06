import Property from "../models/Property.js";

/* =========================
   PRICE RANGE PARSER
========================= */
const parsePriceRange = (range) => {
  if (!range) return null;

  try {
    let clean = range.replace(/ /g, "");

    if (clean.includes("Lakhs")) {
      clean = clean.replace("Lakhs", "");
      const [min, max] = clean.split("-");

      return {
        min: Number(min) * 100000,
        max: Number(max) * 100000,
      };
    }

    if (clean.includes("Crore")) {
      clean = clean.replace("Crore", "");
      const [min, max] = clean.split("-");

      return {
        min: Number(min) * 10000000,
        max: Number(max) * 10000000,
      };
    }

    return null;

  } catch {
    return null;
  }
};


/* =========================
   ADD PROPERTY
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
      facing = [],
      showOnHome = false,
      isNewLaunch = true,
      images = [],
    } = req.body;

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
      facing,
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
   TOGGLE HOME VISIBILITY
========================= */
export const toggleHomeVisibility = async (req, res) => {
  try {

    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    property.showOnHome = !property.showOnHome;

    await property.save();

    res.json({
      message: "Home visibility updated",
      showOnHome: property.showOnHome,
      property
    });

  } catch (err) {

    console.error("TOGGLE HOME ERROR:", err);

    res.status(500).json({
      message: "Failed to update home visibility",
    });

  }
};

/* =========================
   GET ALL PROPERTIES
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
    if (constructionStatus) filter.constructionStatus = constructionStatus;
    if (projectCode) filter.projectCode = projectCode;

    if (price) {
      const parsed = parsePriceRange(price);

      if (parsed) {
        filter.price = {
          $gte: parsed.min,
          $lte: parsed.max,
        };
      }
    }

    if (facing) {
      filter.facing = { $in: [facing] };
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
        { projectCode: { $regex: search, $options: "i" } },
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
      showOnHome: true
    }).sort({ createdAt: -1 });

    res.json(properties);

  } catch (err) {

    console.error("HOME PROPERTIES ERROR:", err);

    res.status(500).json({
      message: "Failed to load home properties",
    });

  }
};


/* =========================
   GET SINGLE PROPERTY
========================= */
export const getPropertyById = async (req, res) => {
  try {

    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    res.json(property);

  } catch {

    res.status(500).json({
      message: "Failed to load property",
    });

  }
};


/* =========================
   UPDATE PROPERTY
========================= */
export const updateProperty = async (req, res) => {
  try {

    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

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
      facing,
      images = [],
    } = req.body;

    property.title = title;
    property.location = location;
    property.flatType = flatType;
    property.constructionStatus = constructionStatus;
    property.unitSize = unitSize;
    property.price = price;
    property.uds = uds;
    property.projectCode = projectCode;
    property.remarks = remarks;
    property.facing = facing;

    if (images.length > 0) {

      const newImages = images.map((img) => ({
        url: img.url,
        isMain: !!img.isMain,
        isPropertyBanner: !!img.isPropertyBanner,
        isHomeBanner: !!img.isHomeBanner,
      }));

      property.images.push(...newImages);

    }

    await property.save();

    res.json({
      message: "Property updated successfully",
      property,
    });

  } catch (err) {

    console.error("UPDATE PROPERTY ERROR:", err);

    res.status(500).json({
      message: "Failed to update property",
    });

  }
};


/* =========================
   DELETE PROPERTY IMAGE
========================= */
export const deletePropertyImage = async (req, res) => {
  try {

    const { propertyId, imageUrl } = req.body;

    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    property.images = property.images.filter(
      (img) => img.url !== imageUrl
    );

    await property.save();

    res.json({
      message: "Image deleted successfully",
      property,
    });

  } catch {

    res.status(500).json({
      message: "Failed to delete image",
    });

  }
};


/* =========================
   DELETE PROPERTY
========================= */
export const deleteProperty = async (req, res) => {
  try {

    await Property.findByIdAndDelete(req.params.id);

    res.json({
      message: "Property deleted permanently",
    });

  } catch {

    res.status(500).json({
      message: "Failed to delete property",
    });

  }
};


/* =========================
   FILTER OPTIONS API
========================= */
export const getPropertyFilters = async (req, res) => {
  try {

    const flatTypes = await Property.distinct("flatType");
    const constructionStatus = await Property.distinct("constructionStatus");
    const facings = await Property.distinct("facing");
    const locations = await Property.distinct("location");

    res.json({
      flatTypes,
      constructionStatus,
      facings: facings.flat().filter(Boolean),
      locations: locations.filter(Boolean),
    });

  } catch (err) {

    console.error("FILTER API ERROR:", err);

    res.status(500).json({
      message: "Failed to load filters",
    });

  }
};


/* =========================
   PROPERTY BANNER IMAGES
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

  } catch {

    res.status(500).json({
      message: "Failed to load property banners",
    });

  }
};
