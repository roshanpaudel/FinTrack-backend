import mongoose from "mongoose";
const MONGO_URL =
  process.env.MONGO_URL || "mongodb://localhost:27017/financial_tracker";

export const connectMongoDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URL);
    conn && console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
