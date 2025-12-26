const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

/* ---------- EMAIL CONFIG ---------- */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});


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

    await transporter.sendMail({
      from: process.env.ADMIN_EMAIL,
      to: process.env.ADMIN_EMAIL, // you receive the email
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
      message: "Order placed and email sent",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Order placed but email failed",
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

    await transporter.sendMail({
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
      message: "Payment verified and email sent",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Payment success but email failed",
    });
  }
});

module.exports = router;
