const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/* ---------- CREATE TOKEN ---------- */
const createToken = (user) => {
  return jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

/* ---------- SIGNUP ---------- */
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({
        status: "failed",
        message: "All fields are required",
      });
    }

    // Check existing user
    let user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        status: "failed",
        message: "Email already registered",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = createToken(user);

    return res.status(201).json({
      status: "success",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (e) {
    console.error("SIGNUP ERROR:", e);
    return res.status(500).json({
      status: "failed",
      message: "Signup failed",
    });
  }
};

/* ---------- LOGIN ---------- */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "failed",
        message: "Email and password required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        status: "failed",
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: "failed",
        message: "Invalid email or password",
      });
    }

    const token = createToken(user);

    return res.status(200).json({
      status: "success",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (e) {
    console.error("LOGIN ERROR:", e);
    return res.status(500).json({
      status: "failed",
      message: "Login failed",
    });
  }
};

module.exports = { signup, login };
