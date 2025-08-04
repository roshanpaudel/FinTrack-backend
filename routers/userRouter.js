import express from "express";
const router = express.Router();


// User signup
router.post("/", (req, res) => {
  try {
    console.log(req.body);
    res.json({
      status: "success",
      message: "TODO",
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
