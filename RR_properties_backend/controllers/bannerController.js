import Banner from "../models/Banner.js";
import fs from "fs";
import path from "path";

export const addBanner = async (req, res) => {
  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ message: "Image URL missing" });
    }

    const banner = await Banner.create({ imageUrl });
    res.json({ message: "Banner added successfully", banner });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find();
    res.json(banners);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteBanner = async (req, res) => {
  try {
    const id = req.params.id;

    const banner = await Banner.findById(id);
    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    const fileName = banner.imageUrl.split("/uploads/")[1];

    console.log("IMAGE URL FROM DB:", banner.imageUrl);
    console.log("FILENAME EXTRACTED:", fileName);

    if (fileName) {
      const absolutePath = path.join(process.cwd(), "uploads", fileName);

      console.log("ABSOLUTE PATH TO DELETE:", absolutePath);

      fs.unlink(absolutePath, (err) => {
        if (err) {
          console.log("Error deleting file:", err);
        } else {
          console.log("File deleted:", absolutePath);
        }
      });
    }

    await Banner.findByIdAndDelete(id);

    res.json({ message: "Banner deleted successfully" });

  } catch (error) {
    console.log("DELETE ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};
