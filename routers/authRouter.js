import express from "express";
import {
  getHashByEmail,
  insertSignupData,
  isExistingEmail,
} from "../models/user/userModel.js";
import { comparePassword, hashPassword } from "../utils/bcryptJs.js";

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
    req.body.password = hashPassword(req.body.password);

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
// User profile
export default router;
