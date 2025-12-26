const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

/* ================= CONTACT FORM ================= */
router.post("/", async (req, res) => {
  const { name, email, message, rating } = req.body;

  /* 🔒 BASIC VALIDATION */
  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  /* 🔒 ENV VALIDATION (CRITICAL) */
  if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
    console.error("❌ MAIL ENV VARIABLES MISSING");
    return res.status(500).json({
      message: "Email service not configured on server",
    });
  }

  try {
    /* 📧 CREATE TRANSPORTER */
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false, // dev-safe (proxy/antivirus fix)
      },
    });

    /* 📩 MAIL CONTENT */
    const mailOptions = {
      from: `"ScrubandMore Website" <${process.env.MAIL_USER}>`,
      to: "scrubandmoreskincare@gmail.com",
      replyTo: email,
      subject: "New Customer Feedback Received",
      html: `
        <h2>New Feedback Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Rating:</strong> ${rating || "Not given"} ⭐</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    /* 🚀 SEND MAIL */
    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "Feedback sent successfully",
    });
  } catch (err) {
    console.error("❌ MAIL ERROR:", err);

    return res.status(500).json({
      message: "Failed to send feedback",
      error: err.message,
    });
  }
});

module.exports = router;
