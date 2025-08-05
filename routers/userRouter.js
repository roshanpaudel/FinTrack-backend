import express from "express";
import { insertUser } from "../models/user/userModel.js";
const router = express.Router();

// User signup
router.post("/", async (req, res) => {
  try {
    //get the user object
    //encrypt the password
    //insert the user
    const user = await insertUser(req.body);
    user?._id
      ? res.json({
          status: "success",
          message: "Your account has been creaed. You may login now",
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
// User profile
export default router;
