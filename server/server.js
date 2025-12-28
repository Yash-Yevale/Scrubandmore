require("dotenv").config();

const app = require("./app");          // Express app (all routes + middleware)
const connectDB = require("./configs/db");

const PORT = process.env.PORT || 5000;

/* ================= ENV SANITY CHECK ================= */
if (!process.env.MONGO_URI) {
  console.warn("⚠️  MONGO_URI not set in .env");
}

if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
  console.warn("⚠️  MAIL credentials not set in .env");
}

/* ================= START SERVER ================= */
(async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Database connection failed:", err?.message || err);
    process.exit(1);
  }
})();
