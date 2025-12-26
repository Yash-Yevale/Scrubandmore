const AllProduct = require("../models/allProducts.model");

/* GET ALL PRODUCTS */
const getAllProducts = async (req, res) => {
  try {
    const products = await AllProduct.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error("Fetch all products error:", err);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

module.exports = getAllProducts;
