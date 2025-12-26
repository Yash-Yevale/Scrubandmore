/* ---------------- ROUTES ---------------- */
const orderRoutes = require("./routes/orderRoutes");
const reviewRoutes = require("./routes/reviewRoutes"); // ✅ ADD THIS

/* ---------------- AUTH ---------------- */
app.post("/api/auth/signup", signup);
app.post("/api/auth/login", login);

/* ---------------- PAYMENT ---------------- */
app.use("/api/payment", paymentController);

/* ---------------- PRODUCTS ---------------- */
app.use("/men", menController);
app.use("/women", womenController);
app.use("/kids", kidsController);
app.use("/allProducts", allProductsController);
app.use("/clothData", clothDataController);
app.use("/shoeData", shoeDataController);

/* ---------------- USER ---------------- */
app.use("/favourite", favouriteController);

/* ---------------- REVIEWS (🔥 MISSING BEFORE) ---------------- */
app.use("/api/reviews", reviewRoutes); // ✅ THIS FIXES EVERYTHING

/* ---------------- ORDER ---------------- */
app.use("/api/order", orderRoutes);
