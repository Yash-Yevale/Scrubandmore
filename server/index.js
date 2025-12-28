const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

/* ================== CORS ================== */
app.use(
  cors({
    origin: [
      "https://scrubandmore.vercel.app",
      "http://localhost:3000",
      "http://localhost:5173",
    ],
    methods: "GET,POST,PUT,DELETE,PATCH,OPTIONS",
    credentials: true,
  })
);

/* 🔥 critical — manually set headers */
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://scrubandmore.vercel.app"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,PATCH,OPTIONS"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

/* handle preflight quickly */
app.options("*", (req, res) => res.sendStatus(200));

app.use(express.json());

/* ================== ROUTES ================== */

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
app.use("/api/men", menController);
app.use("/api/women", womenController);
app.use("/api/kids", kidsController);
app.use("/api/allProducts", allProductsController);
app.use("/api/clothData", clothDataController);
app.use("/api/shoeData", shoeDataController);

/* ================== USER ================== */
app.use("/api/favourite", favouriteController);

/* ================== REVIEWS ================== */
app.use("/api/reviews", reviewRoutes);

/* ================== ORDER ================== */
app.use("/api/order", orderRoutes);

/* ================== SERVER ================== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
