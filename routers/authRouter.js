import express from "express";
import { insertUser, isExistingEmail } from "../models/user/userModel.js";
import { hashPassword } from "../utils/bcryptJs.js";

const router = express.Router();

// email check
// This endpoint checks if the email is already taken
// It returns a 409 status if the email exists, otherwise it returns a 200 status with available message
router.post("/check-email", async (req, res) => {
  console.log("Incoming body:", req.body); // 👈 debug log

  const { email } = req.body;
  // Check if email is empty
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  try {
    const existingUser = await isExistingEmail(email);

    if (existingUser) {
      return res
        .status(409)
        .json({ available: false, message: "Email already taken" });
    } else res.json({ available: true, message: "Email available" });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

router.post("/signup", async (req, res) => {
  try {
    //encrypt the password
    req.body.password = hashPassword(req.body.password);
    console.log(req.body.password);

    //insert the user
    const user = await insertUser(req.body);
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
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});
// User profile
export default router;
