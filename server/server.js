require("dotenv").config();

const app = require("./app");          // Express app
const connectDB = require("./configs/db");

const PORT = process.env.PORT || 5000;

/* ================= ENV SANITY CHECK ================= */
if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
  console.warn("⚠️  MAIL_USER or MAIL_PASS not set in .env");
}

if (!process.env.MONGO_URI) {
  console.warn("⚠️  MONGO_URI not set in .env");
}

/* ================= START SERVER ================= */
connectDB()
  .then(() => {
    console.log("✅ MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1);
  });
