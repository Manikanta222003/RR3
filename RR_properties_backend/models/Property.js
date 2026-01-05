import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  city: String,
  locality: String,
  typology: String,
  status: String,
  unitSize: String,
  price: String,

  // 🔥 HOME PAGE VISIBILITY
  showOnHome: {
    type: Boolean,
    default: false,
  },

  // 🔥 PROPERTY CAN BE USED AS BANNER
  useAsBanner: {
    type: Boolean,
    default: false,
  },

  // 🔥 NEW LAUNCH FLAG (ADD THIS)
  isNewLaunch: {
    type: Boolean,
    default: true,
  },

  images: [
    {
      url: { type: String, required: true },
      isBanner: {
        type: Boolean,
        default: false,
      },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Property", propertySchema);
