import mongoose from "mongoose";

const TRANSACTIONS_MONGO_URL =
  process.env.TRANSACTIONS_MONGO_URL ||
  "mongodb://localhost:27017/financial_tracker_transactions";

let transactionsConnection = null;

export const connectTransactionsDB = () => {
  if (transactionsConnection) {
    return transactionsConnection;
  }

  transactionsConnection = mongoose.createConnection(TRANSACTIONS_MONGO_URL);
  transactionsConnection.on("connected", () => {
    console.log("Transactions MongoDB connected");
  });
  transactionsConnection.on("error", (error) => {
    console.error("Transactions MongoDB error:", error);
  });

  return transactionsConnection;
};

export const getTransactionsConnection = () => transactionsConnection;
