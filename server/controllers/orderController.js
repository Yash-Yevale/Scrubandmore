import nodemailer from "nodemailer";

/* ================= EMAIL SETUP ================= */

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_EMAIL_PASS,
  },
});

/* ================= SEND ORDER EMAIL ================= */

export const sendOrderEmail = async (order) => {
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
    subject: `New Order - ${order.paymentMethod}`,
    text: `
NEW ORDER RECEIVED

Customer:
${order.customer.firstName} ${order.customer.lastName}
Email: ${order.customer.email}

Address:
${order.customer.address}
${order.customer.city}, ${order.customer.state} - ${order.customer.pincode}

Products:
${productsText}

Total: ₹${order.orderSummary.total}
Payment Method: ${order.paymentMethod}
`,
  });
};
