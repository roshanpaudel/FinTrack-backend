import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authMiddleware } from "./middleware/authMiddleware.js";
const app = express();
const PORT = process.env.PORT || 8000;

//connect DB
import { connectMongoDB } from "./config/mongodbConfig.js";
connectMongoDB();
import { connectTransactionsDB } from "./config/transactionsDb.js";
connectTransactionsDB();
// Middleware
app.use(express.json());
app.use(cookieParser()); // <-- add this before routes
// Codex: Allow credentialed requests from the frontend origin.
const corsOptions = {
  origin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

//Authentication Routers
import authRouter from "./routers/authRouter.js";
app.use("/api/v1/auth", authRouter);

// User Routers Api endpoints
import userRouter from "./routers/userRouter.js";
app.use("/api/v1/users", authMiddleware, userRouter);

// Transactions Routers Api endpoints
import transactionRouter from "./routers/transactionRouter.js";
app.use("/api/v1/transactions", authMiddleware, transactionRouter);

// Profile Routers Api endpoints
import profileRouter from "./routers/profileRouter.js";
app.use("/api/v1/profile", authMiddleware, profileRouter);

app.get("/", (req, res) => {
  res.json({
    message: "We are Live",
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Server Running at http://localhost:${PORT}`);
});
