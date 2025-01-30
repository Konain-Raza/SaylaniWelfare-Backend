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
      token: "Konain",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("Request Body:", req.body);

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    if (password !== user.password) {
      console.log("Invalid credentials");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
