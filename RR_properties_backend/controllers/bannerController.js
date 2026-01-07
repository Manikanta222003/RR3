import Banner from "../models/Banner.js";

/* =========================
   ADD BANNER
========================= */
export const addBanner = async (req, res) => {
  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({
        message: "Image URL missing",
      });
    }

    const banner = await Banner.create({ imageUrl });

    res.status(201).json({
      message: "Banner added successfully",
      banner,
    });
  } catch (error) {
    console.error("ADD BANNER ERROR:", error);
    res.status(500).json({
      message: "Server error while adding banner",
    });
  }
};

/* =========================
   GET BANNERS
========================= */
export const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });
    res.json(banners);
  } catch (error) {
    console.error("GET BANNERS ERROR:", error);
    res.status(500).json({
      message: "Failed to fetch banners",
    });
  }
};

/* =========================
   DELETE BANNER
========================= */
export const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;

    const banner = await Banner.findById(id);
    if (!banner) {
      return res.status(404).json({
        message: "Banner not found",
      });
    }

    // ❌ No fs.unlink
    // ❌ No local file delete
    // ✅ Just remove DB entry

    await Banner.findByIdAndDelete(id);

    res.json({
      message: "Banner deleted successfully",
    });
  } catch (error) {
    console.error("DELETE BANNER ERROR:", error);
    res.status(500).json({
      message: "Failed to delete banner",
    });
  }
};
