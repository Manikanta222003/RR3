import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,       // ✅ only one admin email
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,      // ✅ can be set via forgot password
    },
    otp: String,
    otpExpiry: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Admin", AdminSchema);
