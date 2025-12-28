const router = require("express").Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");

/* ---------- CREATE ORDER ---------- */
router.post("/order", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return res.status(500).json({
        message: "Razorpay credentials missing. Check server .env"
      });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    const order = await razorpay.orders.create(options);

    return res.status(200).json({
      success: true,
      order,
      key: process.env.RAZORPAY_KEY_ID   // <-- IMPORTANT
    });
  } catch (error) {
    console.error("RAZORPAY ORDER ERROR:", error);
    return res.status(500).json({
      message: "Razorpay order creation failed",
      error: error.message,
    });
  }
});

/* ---------- VERIFY PAYMENT ---------- */
router.post("/verify", (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      return res
        .status(200)
        .json({ success: true, message: "Payment verified successfully" });
    }

    return res.status(400).json({ success: false, message: "Invalid signature" });
  } catch (error) {
    console.error("VERIFY ERROR:", error);
    return res.status(500).json({ message: "Verification failed" });
  }
});

module.exports = router;
