const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

console.log("📦 USING ORDER ROUTES FILE — TELEGRAM FORMAT V2");

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

/* ---------- Safe email function ---------- */
const sendMailSafe = async (options) => {
  try {
    if (!transporter) return;
    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_EMAIL_PASS) return;

    await transporter.sendMail(options);
    console.log("📧 Email sent successfully");
  } catch (err) {
    console.error("MAIL SEND ERROR:", err.message);
  }
};

/* ---------- Build product message ---------- */
const buildProductsMessage = (products = []) =>
  products
    .map((p, i) => {
      return [
        `#${i + 1}. ${p.name || "-"}`,
        `Size: ${p.size || "-"}`,
        p.color ? `Color: ${p.color}` : null,
        p.fragrance ? `Fragrance: ${p.fragrance}` : null,
        `Qty: ${p.qty || "-"}`,
        `Price: ₹${p.price || 0}`,
        `Note: ${p.note || "N/A"}`,
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n\n");

/* ============================================================
   CASH ON DELIVERY
============================================================ */
router.post("/cod", async (req, res) => {
  try {
    const order = req.body;

    console.log("🧾 COD order received", order?.orderSummary?.total);

    const productsMsg = buildProductsMessage(order.products || []);

    sendTelegram(
      `🛒 *NEW COD ORDER*\n\n` +
        `👤 *Customer*\n` +
        `Name: ${order.customer.firstName} ${order.customer.lastName}\n` +
        `Email: ${order.customer.email}\n` +
        `Phone: ${order.customer.mobile}\n\n` +

        `📍 *Address*\n` +
        `${order.customer.address}\n` +
        `${order.customer.city}, ${order.customer.state} - ${order.customer.pincode}\n` +
        `${order.customer.country}\n\n` +

        `📦 *Products*\n${productsMsg}\n\n` +

        `💰 *Order Summary*\n` +
        `Subtotal: ₹${order.orderSummary.subTotal}\n` +
        `Discount: ₹${order.orderSummary.discount}\n` +
        `Total: ₹${order.orderSummary.total}\n\n` +

        `💵 Payment: COD`
    );

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
${productsMsg}

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

    console.log("💳 Razorpay order received", order?.orderSummary?.total);

    const productsMsg = buildProductsMessage(order.products || []);

    sendTelegram(
      `💳 *RAZORPAY PAYMENT SUCCESS*\n\n` +
        `👤 *Customer*\n` +
        `Name: ${order.customer.firstName} ${order.customer.lastName}\n` +
        `Email: ${order.customer.email}\n` +
        `Phone: ${order.customer.mobile}\n\n` +

        `📍 *Address*\n` +
        `${order.customer.address}\n` +
        `${order.customer.city}, ${order.customer.state} - ${order.customer.pincode}\n` +
        `${order.customer.country}\n\n` +

        `📦 *Products*\n${productsMsg}\n\n` +

        `💰 *Order Summary*\n` +
        `Subtotal: ₹${order.orderSummary.subTotal}\n` +
        `Discount: ₹${order.orderSummary.discount}\n` +
        `Total Paid: ₹${order.orderSummary.total}\n\n` +

        `✅ Payment: Razorpay`
    );

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
${productsMsg}

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
