const express = require("express");
const cors = require("cors");

const app = express();

/* ================= GLOBAL MIDDLEWARE ================= */
app.use(
  cors({
    origin: [
      "https://scrubandmore.vercel.app",   // Vercel frontend
      "http://localhost:5173"              // Local dev
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

/* ================= CONTROLLERS ================= */
const { signup, login } = require("./controllers/auth.controller");

const menController = require("./controllers/men.controller");
const womenController = require("./controllers/women.controller");
const kidsController = require("./controllers/kids.controller");
const allProductsController = require("./controllers/allProducts.controller");
const clothDataController = require("./controllers/clothData.controller");
const shoeDataController = require("./controllers/shoeData.controller");
const favouriteController = require("./controllers/favourite.controller");
const paymentController = require("./controllers/payment.controller");
const otpController = require("./controllers/otp.controller");

/* ================= ROUTES ================= */
const orderRoutes = require("./routes/orderRoutes");
const adminProductRoutes = require("./routes/adminProductRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const contactRoutes = require("./routes/contactRoutes");

/* ================= HEALTH CHECK ================= */
app.get("/", (req, res) => {
  res.status(200).json({ message: "API running successfully 🚀" });
});

/* ================= AUTH ================= */
app.post("/api/auth/signup", signup);
app.post("/api/auth/login", login);

/* ================= OTP ================= */
app.post("/api/otp/send", otpController.sendOtp);
app.post("/api/otp/verify", otpController.verifyOtp);

/* ================= PAYMENT ================= */
app.use("/api/payment", paymentController);

/* ================= PRODUCTS (LEGACY / CATEGORY) ================= */
app.use("/men", menController);
app.use("/women", womenController);
app.use("/kids", kidsController);
app.use("/allProducts", allProductsController);
app.use("/clothData", clothDataController);
app.use("/shoeData", shoeDataController);

/* ================= USER ================= */
app.use("/favourite", favouriteController);

/* ================= ORDERS ================= */
app.use("/api/order", orderRoutes);

/* ================= PRODUCTS (NEW – MAIN) ================= */
app.use("/api/products", adminProductRoutes);
app.use("/api/admin/products", adminProductRoutes);

/* ================= REVIEWS ================= */
app.use("/api/reviews", reviewRoutes);

/* ================= CONTACT ================= */
app.use("/api/contact", contactRoutes);

/* ================= 404 HANDLER ================= */
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route not found",
  });
});

module.exports = app;
