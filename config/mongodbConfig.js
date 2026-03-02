import mongoose from "mongoose";
const MONGO_URL =
  process.env.MONGO_URL || "mongodb://localhost:27017/financial_tracker";

export const connectMongoDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      return mongoose.connection;
    }
    const conn = await mongoose.connect(MONGO_URL);
    if (conn) {
      console.log("MongoDB connected");
    }
    return conn;
  } catch (error) {
    console.log(error);
    return null;
  }
};
