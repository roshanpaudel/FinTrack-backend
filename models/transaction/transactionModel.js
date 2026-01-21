import Transaction from "./transactionSchema.js";

export const insertTransaction = (transactionObj) => {
  return Transaction(transactionObj)
    .save()
    .catch((error) => {
      console.error("Error saving transaction:", error);
      return null;
    });
};

export const getTransactionsByEmail = async (userEmail) => {
  try {
    return await Transaction.find({ userEmail })
      .sort({ transactionDate: -1, createdAt: -1 })
      .lean();
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return null;
  }
};
