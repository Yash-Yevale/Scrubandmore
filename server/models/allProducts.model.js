const { Schema, model } = require("mongoose");

const allProductSchema = new Schema(
  {
    title: { type: String, required: true },
    gender: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },

    price: { type: Number, required: true },
    size: { type: Array, required: true },

    /* ✅ OPTIONAL COLOR */
    colors: {
      enabled: { type: Boolean, default: false },
      options: { type: [String], default: [] },
    },

    /* ✅ OPTIONAL FRAGRANCE */
    fragrances: {
      enabled: { type: Boolean, default: false },
      options: { type: [String], default: [] },
    },

    rating: { type: Number, default: 0 },
    img: { type: Array, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/* ✅ SAFE EXPORT */
module.exports =
  require("mongoose").models.AllProduct ||
  model("AllProduct", allProductSchema);
