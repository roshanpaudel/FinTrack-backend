import express from "express";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 8000;

//connect DB
import { connectMongoDB } from "./config/mongodbConfig.js";
connectMongoDB();
// Middleware
app.use(express.json());
app.use(cors());

//Authentication Routers
import authRouter from "./routers/authRouter.js";
app.use("/api/v1/auth", authRouter);

// User Routers Api endpoints
import userRouter from "./routers/userRouter.js";
app.use("/api/v1/users", userRouter);

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
