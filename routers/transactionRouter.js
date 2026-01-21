import express from "express";
import {
  getTransactionsByEmail,
  insertTransaction,
} from "../models/transaction/transactionModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const userEmail = req.user?.email;
    if (!userEmail) {
      return res.status(401).json({ message: "Missing user context" });
    }
    const transactions = await getTransactionsByEmail(userEmail);
    return res.json({
      status: "success",
      transactions: transactions || [],
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const userEmail = req.user?.email;
    if (!userEmail) {
      return res.status(401).json({ message: "Missing user context" });
    }

    const { detail, amount, type, category, transactionDate } = req.body;
    const amountNumber = Number(amount);
    if (!detail || !type || Number.isNaN(amountNumber)) {
      return res.status(400).json({
        status: "error",
        message: "Detail, amount, and type are required",
      });
    }
    if (!["debit", "credit"].includes(type)) {
      return res.status(400).json({
        status: "error",
        message: "Type must be debit or credit",
      });
    }

    const newTransaction = await insertTransaction({
      userEmail,
      detail: detail.trim(),
      amount: amountNumber,
      type,
      category: category?.trim() || "General",
      transactionDate: transactionDate ? new Date(transactionDate) : Date.now(),
    });

    return newTransaction?._id
      ? res.json({
          status: "success",
          message: "Transaction saved",
          transaction: newTransaction,
        })
      : res.status(500).json({
          status: "error",
          message: "Unable to save transaction",
        });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

export default router;
