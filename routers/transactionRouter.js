import express from "express";
import {
  getTransactionsByEmail,
  insertTransaction,
  reassignCategoryByName,
  updateTransactionById,
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

router.patch("/categories/reassign", async (req, res) => {
  try {
    const userEmail = req.user?.email;
    if (!userEmail) {
      return res.status(401).json({ message: "Missing user context" });
    }

    const oldCategory = req.body?.oldCategory?.trim();
    const newCategory = req.body?.newCategory?.trim();

    if (!oldCategory || !newCategory) {
      return res.status(400).json({
        status: "error",
        message: "oldCategory and newCategory are required",
      });
    }

    if (oldCategory === newCategory) {
      return res.status(400).json({
        status: "error",
        message: "New category must be different",
      });
    }

    const updateResult = await reassignCategoryByName(
      userEmail,
      oldCategory,
      newCategory
    );

    if (!updateResult) {
      return res.status(500).json({
        status: "error",
        message: "Unable to reassign category",
      });
    }

    return res.json({
      status: "success",
      message: "Category reassigned",
      matchedCount: updateResult.matchedCount || 0,
      modifiedCount: updateResult.modifiedCount || 0,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

router.put("/:transactionId", async (req, res) => {
  try {
    const userEmail = req.user?.email;
    if (!userEmail) {
      return res.status(401).json({ message: "Missing user context" });
    }

    const { transactionId } = req.params;
    const { detail, amount, type, category, transactionDate } = req.body;
    const updateObj = {};

    if (detail !== undefined) {
      const trimmedDetail = detail?.trim();
      if (!trimmedDetail) {
        return res.status(400).json({
          status: "error",
          message: "Detail is required",
        });
      }
      updateObj.detail = trimmedDetail;
    }

    if (amount !== undefined) {
      const amountNumber = Number(amount);
      if (Number.isNaN(amountNumber)) {
        return res.status(400).json({
          status: "error",
          message: "Amount must be a valid number",
        });
      }
      updateObj.amount = amountNumber;
    }

    if (type !== undefined) {
      if (!["debit", "credit"].includes(type)) {
        return res.status(400).json({
          status: "error",
          message: "Type must be debit or credit",
        });
      }
      updateObj.type = type;
    }

    if (category !== undefined) {
      updateObj.category = category?.trim() || "General";
    }

    if (transactionDate !== undefined) {
      updateObj.transactionDate = transactionDate
        ? new Date(transactionDate)
        : Date.now();
    }

    if (!Object.keys(updateObj).length) {
      return res.status(400).json({
        status: "error",
        message: "No valid fields to update",
      });
    }

    const updatedTransaction = await updateTransactionById(
      userEmail,
      transactionId,
      updateObj
    );

    if (!updatedTransaction) {
      return res.status(404).json({
        status: "error",
        message: "Transaction not found",
      });
    }

    return res.json({
      status: "success",
      message: "Transaction updated",
      transaction: updatedTransaction,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

export default router;
