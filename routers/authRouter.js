import express from "express";
import {
  getHashByEmail,
  insertSignupData,
  isExistingEmail,
} from "../models/user/userModel.js";
import { comparePassword, hashPassword } from "../utils/bcryptJs.js";
import { createAccessJWT, createRefreshJWT } from "../utils/jwtToken.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// email check
// This endpoint checks if the email is already taken
router.post("/check-email", async (req, res) => {
  const { email } = req.body;
  // Check if email is empty
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  try {
    const existingUser = await isExistingEmail(email);

    if (existingUser) {
      return res.json({ userExists: true, message: "Existing user" });
    } else
      return res.json({ userExists: false, message: "User doesnot exists" });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});
//signup
router.post("/signup", async (req, res) => {
  try {
    //encrypt the password
    req.body.password = await hashPassword(req.body.password);

    //insert the user
    const user = await insertSignupData(req.body);
    user?._id
      ? res.json({
          status: "success",
          message: "Your account has been created. You may login now",
        })
      : res.json({
          status: "error",
          message: "Error creating user account",
        });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});
// User login
router.post("/login", async (req, res) => {
  try {
    //compare the username and password
    const hash = await getHashByEmail(req.body.email);
    const isMatch = await comparePassword(req.body.password, hash);
    if (isMatch) {
      try {
        const accessToken = createAccessJWT(req.body.email);
        const refreshToken = createRefreshJWT(req.body.email);
        const isProduction = process.env.NODE_ENV === "production";

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: isProduction,
          sameSite: isProduction ? "none" : "lax",
          maxAge: 180 * 24 * 60 * 60 * 1000,
        });

        return res.json({
          isMatch: true,
          message: "Login Success",
          accessToken,
        });
      } catch (err) {
        console.error("Token creation error:", err);
        return res
          .status(500)
          .json({ status: "error", message: "Token error" });
      }
    } else
      return res.status(401).json({
        isMatch: false,
        message: "Invalid password",
      });
  } catch (error) {
    res.json({
      status: "server error",
      message: error.message,
    });
  }
});

// ---------------------------------------------------
// 🔁 Refresh Token Endpoint
// ---------------------------------------------------
router.post("/refresh", (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken)
    return res.status(401).json({ message: "No refresh token found" });

  jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid refresh token" });

    const newAccessToken = createAccessJWT(decoded.email);
    res.json({ accessToken: newAccessToken });
  });
});
export default router;
