const express = require("express");
const cors = require("cors");

const app = express();

/* ================= GLOBAL MIDDLEWARE ================= */

const allowedOrigins = [
  "https://scrubandmore.vercel.app",
  "http://localhost:5173",
  "https://scrubandmore.onrender.com"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("CORS blocked"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://scrubandmore.vercel.app");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

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

/* ================= LEGACY CATEGORY ROUTES ================= */
app.use("/api/men", menController);
app.use("/api/women", womenController);
app.use("/api/kids", kidsController);
app.use("/api/allProducts", allProductsController);
app.use("/api/clothData", clothDataController);
app.use("/api/shoeData", shoeDataController);

/* ================= USER ================= */
app.use("/api/favourite", favouriteController);

/* ================= ORDERS ================= */
app.use("/api/order", orderRoutes);

/* ================= ADMIN PRODUCTS (ONLY HERE) ================= */
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
