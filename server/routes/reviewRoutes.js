const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Product = require("../models/Product.model");

/* ================= GET REVIEWS (PUBLIC) ================= */
router.get("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findById(productId).select("reviews");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const reviews = (product.reviews || [])
      .slice()
      .sort((a, b) => b.createdAt - a.createdAt);

    return res.json({ success: true, reviews });
  } catch (err) {
    console.error("Fetch reviews error:", err);
    return res.status(500).json({ message: "Failed to fetch reviews" });
  }
});

/* ================= ADD RATING + FEEDBACK (CONSUMER) ================= */
router.post("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, rating, comment = "" } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    if (!name || !rating) {
      return res.status(400).json({ message: "Name and rating required" });
    }

    const numericRating = Number(rating);
    if (numericRating < 1 || numericRating > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.reviews.push({
      name: name.trim(),
      rating: numericRating,
      comment: comment.trim(),
    });

    await product.save();

    const sortedReviews = product.reviews
      .slice()
      .sort((a, b) => b.createdAt - a.createdAt);

    return res.status(201).json({
      success: true,
      reviews: sortedReviews,
    });
  } catch (err) {
    console.error("Add review error:", err);
    return res.status(500).json({ message: "Failed to add review" });
  }
});

module.exports = router;
