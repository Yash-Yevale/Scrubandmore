const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// ⭐ Telegram utility
const { sendTelegram } = require("../utils/telegram");

/* ---------- EMAIL CONFIG ---------- */
let transporter;

try {
  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_EMAIL_PASS,
    },
  });

  console.log("📨 Mail transporter initialized");
} catch (err) {
  console.error("MAILER INIT ERROR:", err);
}

/* ---------- safe mail function ---------- */
const sendMailSafe = async (options) => {
  if (!transporter) {
    console.warn("❌ Transporter missing");
    return;
  }

  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_EMAIL_PASS) {
    console.warn("⚠️ Email credentials missing — skipping email send");
    return;
  }

  try {
    await transporter.sendMail(options);
    console.log("📧 Email sent successfully");
  } catch (err) {
    console.error("MAIL SEND ERROR:", err.message);
  }
};

/* ============================================================
   CASH ON DELIVERY
============================================================ */
router.post("/cod", async (req, res) => {
  try {
    const order = req.body;

    console.log("🧾 COD order received");

    const productsText = order.products
      ?.map(
        (p, i) => `
${i + 1}. ${p.name} (${p.size || "—"})
Qty: ${p.qty}
Price: ₹${p.price}
Note: ${p.note || "N/A"}
`
      )
      .join("\n") || "No products";

    // 🔔 TELEGRAM ALERT (NON-BLOCKING)
    sendTelegram(
      `🛒 *NEW COD ORDER*\n\n` +
        `👤 *${order.customer.firstName} ${order.customer.lastName}*\n` +
        `📞 ${order.customer.mobile}\n` +
        `💰 Total: ₹${order.orderSummary.total}\n` +
        `📦 Items: ${order.products?.length || 0}`
    );

    // 📧 EMAIL (optional — may fail on Render, but harmless)
    sendMailSafe({
      from: `"Scrub & More Orders" <${process.env.ADMIN_EMAIL}>`,
      to: process.env.ADMIN_EMAIL,
      replyTo: order.customer.email,
      subject: "🛒 New COD Order Received",
      text: `
NEW ORDER (Cash on Delivery)

Customer:
${order.customer.firstName} ${order.customer.lastName}
Email: ${order.customer.email}
Mobile: ${order.customer.mobile}

Address:
${order.customer.address}
${order.customer.city}, ${order.customer.state} - ${order.customer.pincode}
${order.customer.country}

Products:
${productsText}

Order Summary:
Subtotal: ₹${order.orderSummary.subTotal}
Discount: ₹${order.orderSummary.discount}
Total: ₹${order.orderSummary.total}

Payment Method: COD
`,
    });

    return res.status(200).json({
      success: true,
      message: "Order placed successfully",
    });
  } catch (error) {
    console.error("COD ERROR:", error);

    sendTelegram("❌ COD order failed on server");

    return res.status(500).json({
      success: false,
      message: "Order failed",
    });
  }
});

/* ============================================================
   RAZORPAY SUCCESS
============================================================ */
router.post("/razorpay-success", async (req, res) => {
  try {
    const order = req.body;

    console.log("💳 Razorpay order received");

    const productsText = order.products
      ?.map(
        (p, i) => `
${i + 1}. ${p.name} (${p.size || "—"})
Qty: ${p.qty}
Price: ₹${p.price}
Note: ${p.note || "N/A"}
`
      )
      .join("\n") || "No products";

    // 🔔 TELEGRAM ALERT
    sendTelegram(
      `💳 *RAZORPAY PAYMENT SUCCESS*\n\n` +
        `👤 *${order.customer.firstName} ${order.customer.lastName}*\n` +
        `📞 ${order.customer.mobile}\n` +
        `💰 Total Paid: ₹${order.orderSummary.total}\n` +
        `📦 Items: ${order.products?.length || 0}`
    );

    // 📧 EMAIL (optional)
    sendMailSafe({
      from: `"Scrub & More Orders" <${process.env.ADMIN_EMAIL}>`,
      to: process.env.ADMIN_EMAIL,
      replyTo: order.customer.email,
      subject: "💳 New Paid Order (Razorpay)",
      text: `
NEW ORDER (Razorpay Payment)

Customer:
${order.customer.firstName} ${order.customer.lastName}
Email: ${order.customer.email}
Mobile: ${order.customer.mobile}

Address:
${order.customer.address}
${order.customer.city}, ${order.customer.state} - ${order.customer.pincode}
${order.customer.country}

Products:
${productsText}

Total Paid: ₹${order.orderSummary.total}

Payment Method: Razorpay
`,
    });

    return res.status(200).json({
      success: true,
      message: "Payment verified",
    });
  } catch (error) {
    console.error("RAZORPAY ORDER ERROR:", error);

    sendTelegram("❌ Razorpay order failed on server");

    return res.status(500).json({
      success: false,
      message: "Order failed",
    });
  }
});

module.exports = router;
