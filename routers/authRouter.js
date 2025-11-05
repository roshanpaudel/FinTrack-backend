import express from "express";
import {
  getHashByEmail,
  insertSignupData,
  isExistingEmail,
} from "../models/user/userModel.js";
import { comparePassword, hashPassword } from "../utils/bcryptJs.js";
import { createAccessJWT, createRefreshJWT } from "../utils/jwtToken.js";

const router = express.Router();

// email check
// This endpoint checks if the email is already taken
router.post("/check-email", async (req, res) => {
  console.log("Server received check-email body:", req.body); // 👈 debug log

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
  console.log("server received login body", req.body);
  try {
    //compare the username and password
    const hash = await getHashByEmail(req.body.email);
    console.log("server hash", hash);
    const isMatch = await comparePassword(req.body.password, hash);
    console.log("is match", isMatch);
    if (isMatch) {
      //create access token
      const accessToken = createAccessJWT(req.body.email);
      const refreshToken = createRefreshJWT(req.body.email);
      // Store refresh token securely in HTTP-only cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true, // cannot be accessed by JS
        secure: process.env.NODE_ENV === "production", // 👈 Only true in prod
        sameSite: "strict",
        maxAge: 180 * 24 * 60 * 60 * 1000, // 180 days
      });

      res.json({ accessToken });

      return res.json({
        isMatch: true,
        message: "Login Success",
      });
    } else
      return res.status(401).json({
        isMatch: false,
        message: "Invalid password",
      });
  } catch (error) {
    res.json({
      status: "error",
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
// User profile
export default router;
