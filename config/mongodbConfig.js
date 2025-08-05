import mongoose from "mongoose";
const MONGO_URL = "mongodb://localhost:27017/financial_tracker";

export const connectMongoDB = () => {
  try {
    const conn = mongoose.connect(MONGO_URL);
    conn && console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
