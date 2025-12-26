const mongoose = require("mongoose");
const { Schema } = mongoose;

/* ================= REVIEW SCHEMA ================= */
const reviewSchema = new Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: String,
    approved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

/* ================= PRODUCT SCHEMA ================= */
const productSchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },

    description: { type: String, required: true },
    ingredients: String,

    category: String,
    gender: String,

    sizes: [
      {
        label: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],

    /* ✅ COLOR SUPPORT */
    colors: {
      enabled: { type: Boolean, default: false },
      options: { type: [String], default: [] },
    },

    /* ✅ FRAGRANCE SUPPORT */
    fragrances: {
      enabled: { type: Boolean, default: false },
      options: { type: [String], default: [] },
    },

    soldOut: { type: Boolean, default: false },

    reviews: [reviewSchema],
    rating: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/* ✅ SAFE EXPORT (PREVENT OVERWRITE ERROR) */
module.exports =
  mongoose.models.Product || mongoose.model("Product", productSchema);
