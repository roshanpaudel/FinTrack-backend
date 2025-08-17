import express from "express";
import { insertSignupData } from "../models/user/userModel.js";
import { hashPassword } from "../utils/bcryptJs.js";
const router = express.Router();

// // User signup
// router.post("/", async (req, res) => {
//   try {
//     //encrypt the password
//     req.body.password = hashPassword(req.body.password);
//     console.log(req.body.password);

//     //insert the user
//     const user = await insertSignupData(req.body);
//     user?._id
//       ? res.json({
//           status: "success",
//           message: "Your account has been created. You may login now",
//         })
//       : res.json({
//           status: "error",
//           message: "Error creating user account",
//         });
//   } catch (error) {
//     res.json({
//       status: "error",
//       message: error.message,
//     });
//   }
// });
// // User signup
// router.post("/signup", async (req, res) => {
//   try {
//     //encrypt the password
//     req.body.password = hashPassword(req.body.password);
//     console.log(req.body.password);

//     //insert the user
//     const user = await insertSignupData(req.body);
//     user?._id
//       ? res.json({
//           status: "success",
//           message: "Your account has been created. You may login now",
//         })
//       : res.json({
//           status: "error",
//           message: "Error creating user account",
//         });
//   } catch (error) {
//     res.json({
//       status: "error",
//       message: error.message,
//     });
//   }
// });
// // User login
// router.post("/login", async (req, res) => {
//   try {
//     //encrypt the password
//     req.body.password = hashPassword(req.body.password);
//     console.log(req.body.password);

//     //insert the user
//     const user = await insertSignupData(req.body);
//     user?._id
//       ? res.json({
//           status: "success",
//           message: "Your account has been created. You may login now",
//         })
//       : res.json({
//           status: "error",
//           message: "Error creating user account",
//         });
//   } catch (error) {
//     res.json({
//       status: "error",
//       message: error.message,
//     });
//   }
// });

export default router;
