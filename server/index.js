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
const menController = require("./controllers/men.controller");
const womenController = require("./controllers/women.controller");
const kidsController = require("./controllers/kids.controller");
const allProductsController = require("./controllers/allProducts.controller");
const clothDataController = require("./controllers/clothData.controller");
const shoeDataController = require("./controllers/shoeData.controller");
const favouriteController = require("./controllers/favourite.controller");
const { signup, login } = require("./controllers/auth.controller");

/* ================== AUTH ================== */
app.post("/api/auth/signup", signup);
app.post("/api/auth/login", login);

/* ================== PAYMENT ================== */
app.use("/api/payment", paymentController);

/* ================== PRODUCTS ================== */
/* ================== PRODUCTS ================== */
app.use("/api/men", menController);
app.use("/api/women", womenController);
app.use("/api/kids", kidsController);
app.use("/api/allProducts", allProductsController);
app.use("/api/clothData", clothDataController);
app.use("/api/shoeData", shoeDataController);


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
