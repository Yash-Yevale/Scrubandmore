const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

/* ---------- EMAIL CONFIG ---------- */
let transporter;

try {
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
} catch (err) {
  console.error("MAILER INIT ERROR:", err);
}

/* ---------- helper: send email safely ---------- */
const sendMailSafe = async (options) => {
  if (!transporter) return false;

  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_EMAIL_PASS) {
    console.warn("⚠️ Email credentials missing — skipping email send");
    return false;
  }

  try {
    await transporter.sendMail(options);
    return true;
  } catch (err) {
    console.error("MAIL SEND ERROR:", err.message);
    return false;
  }
};

/* ---------- COD ORDER ---------- */
router.post("/cod", async (req, res) => {
  try {
    const order = req.body;

    const productsText = order.products
      .map(
        (p, i) => `
${i + 1}. ${p.name} (${p.size})
Qty: ${p.qty}
Price: ₹${p.price}
Note: ${p.note || "N/A"}
`
      )
      .join("\n");

    await sendMailSafe({
      from: process.env.ADMIN_EMAIL,
      to: process.env.ADMIN_EMAIL,
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

    res.status(200).json({
      success: true,
      message: "Order placed successfully",
    });
  } catch (error) {
    console.error("COD ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Order failed",
    });
  }
});

/* ---------- RAZORPAY SUCCESS ---------- */
router.post("/razorpay-success", async (req, res) => {
  try {
    const order = req.body;

    const productsText = order.products
      .map(
        (p, i) => `
${i + 1}. ${p.name} (${p.size})
Qty: ${p.qty}
Price: ₹${p.price}
Note: ${p.note || "N/A"}
`
      )
      .join("\n");

    await sendMailSafe({
      from: process.env.ADMIN_EMAIL,
      to: process.env.ADMIN_EMAIL,
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

    res.status(200).json({
      success: true,
      message: "Payment verified",
    });
  } catch (error) {
    console.error("RAZORPAY ORDER ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Order failed",
    });
  }
});

module.exports = router;
