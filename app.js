import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authMiddleware } from "./middleware/authMiddleware.js";
import { connectMongoDB } from "./config/mongodbConfig.js";
import { connectTransactionsDB } from "./config/transactionsDb.js";
import authRouter from "./routers/authRouter.js";
import userRouter from "./routers/userRouter.js";
import transactionRouter from "./routers/transactionRouter.js";
import profileRouter from "./routers/profileRouter.js";

const app = express();

const isProduction = process.env.NODE_ENV === "production";
const configuredOrigins = (process.env.FRONTEND_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const allowedOrigins = isProduction
  ? configuredOrigins
  : [...configuredOrigins, "http://localhost:5173"];

connectMongoDB();
connectTransactionsDB();

app.set("trust proxy", 1);
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", authMiddleware, userRouter);
app.use("/api/v1/transactions", authMiddleware, transactionRouter);
app.use("/api/v1/profile", authMiddleware, profileRouter);

app.get("/", (req, res) => {
  res.json({
    message: "We are Live",
  });
});

export default app;
