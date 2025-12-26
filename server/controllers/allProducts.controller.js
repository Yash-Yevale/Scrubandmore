const express = require("express");
const AllProduct = require("../models/allProducts.model");

const router = express.Router();

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  try {
    const products = await AllProduct.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error("Fetch all products error:", err);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

module.exports = router;
