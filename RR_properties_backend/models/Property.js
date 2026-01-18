import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    /* BASIC DETAILS */
    title: { type: String, required: true },
    location: { type: String, required: true },

    /* FLAT TYPE */
    flatType: {
      type: String,
      enum: ["2BHK", "3BHK", "4BHK"],
      required: true,
    },

    /* CONSTRUCTION STATUS */
    constructionStatus: {
      type: String,
      enum: ["Ready to Move", "Under Construction"],
      required: true,
    },

    unitSize: String,
    price: String,

    /* EXTRA DETAILS */
    projectCode: String,
    uds: String,
    remarks: String,

    /* MULTIPLE FACING */
    facing: {
      type: [String],
      enum: ["North", "South", "East", "West"],
      default: [],
    },

    /* VISIBILITY */
    showOnHome: {
      type: Boolean,
      default: false,
    },

    isNewLaunch: {
      type: Boolean,
      default: true,
    },

    /* IMAGES */
    images: [
      {
        url: { type: String, required: true },
        isMain: { type: Boolean, default: false },
        isPropertyBanner: { type: Boolean, default: false },
        isHomeBanner: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Property", propertySchema);
