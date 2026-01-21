import express from "express";
import {
  getProfileByEmail,
  upsertProfileByEmail,
} from "../models/profile/profileModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const userEmail = req.user?.email;
    if (!userEmail) {
      return res.status(401).json({ message: "Missing user context" });
    }
    const profile = await getProfileByEmail(userEmail);
    return res.json({
      status: "success",
      profile: profile || {
        userEmail,
        fullName: "",
        phone: "",
        address: "",
        city: "",
        country: "",
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

router.put("/", async (req, res) => {
  try {
    const userEmail = req.user?.email;
    if (!userEmail) {
      return res.status(401).json({ message: "Missing user context" });
    }

    const { fullName, phone, address, city, country } = req.body;
    const updatedProfile = await upsertProfileByEmail(userEmail, {
      fullName: fullName?.trim() || "",
      phone: phone?.trim() || "",
      address: address?.trim() || "",
      city: city?.trim() || "",
      country: country?.trim() || "",
    });

    return updatedProfile?._id
      ? res.json({
          status: "success",
          message: "Profile updated",
          profile: updatedProfile,
        })
      : res.status(500).json({
          status: "error",
          message: "Unable to update profile",
        });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

export default router;
