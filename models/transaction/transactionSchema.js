import mongoose from "mongoose";
import {
  connectTransactionsDB,
  getTransactionsConnection,
} from "../../config/transactionsDb.js";

const transactionSchema = mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
      index: true,
    },
    detail: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["debit", "credit"],
    },
    category: {
      type: String,
      default: "General",
      trim: true,
    },
    transactionDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const connection = getTransactionsConnection() || connectTransactionsDB();
const Transaction = connection.model("Transaction", transactionSchema);

export default Transaction;
