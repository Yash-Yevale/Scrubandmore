const Product = require("../models/Product.model");

/* ================= ADD PRODUCT ================= */
const addProduct = async (req, res) => {
  try {
    const {
      name,
      image,
      description,
      ingredients,
      category,
      gender,
      sizes,
      colors,
      fragrances,
      soldOut,
    } = req.body;

    if (!name || !image || !description || !sizes?.length) {
      return res.status(400).json({
        message: "Required fields missing",
      });
    }

    // ✅ NORMALIZE COLOR & FRAGRANCE (VERY IMPORTANT)
    const product = new Product({
      name,
      image,
      description,
      ingredients,
      category,
      gender,
      sizes,

      colors: {
        enabled: colors?.enabled === true,
        options: colors?.enabled ? colors.options || [] : [],
      },

      fragrances: {
        enabled: fragrances?.enabled === true,
        options: fragrances?.enabled ? fragrances.options || [] : [],
      },

      soldOut: soldOut || false,
    });

    await product.save();

    res.status(201).json({
      success: true,
      product,
    });
  } catch (err) {
    console.error("Add product error:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ================= GET ALL PRODUCTS ================= */
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= GET SINGLE PRODUCT ================= */
const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch product" });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getSingleProduct,
};
