const Otp = require("../models/otp.model");

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

/* SEND OTP */
exports.sendOtp = async (req, res) => {
  try {
    const { mobile } = req.body;

    if (!mobile || mobile.length !== 10) {
      return res.status(400).json({ message: "Invalid mobile number" });
    }

    const otp = generateOTP();

    await Otp.findOneAndDelete({ mobile });

    await Otp.create({
      mobile,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 min
    });

    // 🔴 TEMP: console log OTP (replace with SMS later)
    console.log("OTP:", otp);

    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* VERIFY OTP */
exports.verifyOtp = async (req, res) => {
  try {
    const { mobile, otp } = req.body;

    const record = await Otp.findOne({ mobile });

    if (!record) {
      return res.status(400).json({ message: "OTP not found" });
    }

    if (record.expiresAt < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    if (record.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    await Otp.deleteOne({ mobile });

    res.json({ verified: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
