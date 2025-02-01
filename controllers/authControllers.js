import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    if (await User.exists({ email }))
      return res.status(400).json({ message: "Email already in use" });

    const newUser = await User.create({ name, email, password, role });
    const users = await User.find().select("-password");

    res.status(201).json({
      status: 201,
      message: "User registered successfully",
      newUser: { id: newUser._id, name, email, role },
      users,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "5m" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const verifyToken = (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("✅ Token Successfully Decoded:", decoded);

    return res.status(200).json({ valid: true, user: decoded });
  } catch (error) {
    console.error("❌ JWT Verification Error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
