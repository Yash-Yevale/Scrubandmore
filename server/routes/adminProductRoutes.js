const express = require("express");
const router = express.Router();
const Product = require("../models/Product.model");

/* ================= ADD PRODUCT ================= */
router.post("/add", async (req, res) => {
  try {
    if (!req.body.name || !req.body.image) {
      return res.status(400).json({
        message: "Product name and image are required",
      });
    }

    const product = new Product(req.body);
    await product.save();

    res.status(201).json(product);
  } catch (err) {
    console.error("Add product error:", err);
    res.status(500).json({ message: "Failed to add product" });
  }
});

/* ================= GET ALL PRODUCTS ================= */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error("Fetch products error:", err);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

/* ================= GET SINGLE PRODUCT ================= */
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.error("Fetch product error:", err);
    res.status(500).json({ message: "Failed to fetch product" });
  }
});

/* ================= UPDATE PRODUCT ================= */
router.put("/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("Update product error:", err);
    res.status(500).json({ message: "Failed to update product" });
  }
});

/* ================= DELETE PRODUCT ================= */
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Delete product error:", err);
    res.status(500).json({ message: "Failed to delete product" });
  }
});

/* ================= APPROVE REVIEW (ADMIN) ================= */
router.patch("/:productId/reviews/:reviewId/approve", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    const review = product.reviews.id(req.params.reviewId);
    if (!review)
      return res.status(404).json({ message: "Review not found" });

    review.approved = true;
    await product.save();

    res.json({ message: "Review approved successfully" });
  } catch (err) {
    console.error("Approve review error:", err);
    res.status(500).json({ message: "Failed to approve review" });
  }
});

/* ================= DELETE REVIEW (ADMIN) ================= */
router.delete("/:productId/reviews/:reviewId", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    product.reviews = product.reviews.filter(
      (r) => r._id.toString() !== req.params.reviewId
    );

    await product.save();

    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    console.error("Delete review error:", err);
    res.status(500).json({ message: "Failed to delete review" });
  }
});

module.exports = router;