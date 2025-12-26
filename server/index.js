const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

/* ================== ROUTES & CONTROLLERS ================== */

// ROUTE FILES
const orderRoutes = require("./routes/orderRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

// CONTROLLERS
const paymentController = require("./controllers/payment.controller");
const menController = require("./controllers/menController");
const womenController = require("./controllers/womenController");
const kidsController = require("./controllers/kidsController");
const allProductsController = require("./controllers/allProductsController");
const clothDataController = require("./controllers/clothDataController");
const shoeDataController = require("./controllers/shoeDataController");
const favouriteController = require("./controllers/favouriteController");
const { signup, login } = require("./controllers/authController");

/* ================== AUTH ================== */
app.post("/api/auth/signup", signup);
app.post("/api/auth/login", login);

/* ================== PAYMENT ================== */
app.use("/api/payment", paymentController);

/* ================== PRODUCTS ================== */
app.use("/men", menController);
app.use("/women", womenController);
app.use("/kids", kidsController);
app.use("/api/allProducts", allProductsController);
app.use("/clothData", clothDataController);
app.use("/shoeData", shoeDataController);

/* ================== USER ================== */
app.use("/favourite", favouriteController);

/* ================== REVIEWS ================== */
app.use("/api/reviews", reviewRoutes);

/* ================== ORDER ================== */
app.use("/api/order", orderRoutes);

/* ================== SERVER ================== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
