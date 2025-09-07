import bcrypt from "bcryptjs"; // 👈 add this
import { generateToken } from "../utils/generateToken.js"; // 👈 make sure you have this util

import User from "../models/user_model.js";

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("Received data:", req.body);

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save(); // 👈 save first

    const token = await generateToken(newUser._id); // 👈 then generate token

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 24 * 60 * 60 * 1000,
      sameSite: "Strict",
      secure: false,
    });

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("SignUp Error:", error); // 👈 log error
    return res.status(500).json({ message: "Sign up error", error: error.message });
  }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = await generateToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
            sameSite: "Strict",
            secure: false
        });
        res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username, // or "name" depending on schema
        email: user.email
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Login error" });
  }
}

export const logout = (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        return res.status(500).json({ message: "Logout error" });
    }
}
