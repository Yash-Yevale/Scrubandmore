const { Schema, model } = require("mongoose");

const otpSchema = new Schema(
  {
    mobile: { type: String, required: true },
    otp: { type: String, required: true },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = model("Otp", otpSchema);
