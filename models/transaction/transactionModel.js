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

export const updateTransactionById = async (
  userEmail,
  transactionId,
  updateObj
) => {
  try {
    return await Transaction.findOneAndUpdate(
      { _id: transactionId, userEmail },
      { $set: updateObj },
      { new: true, runValidators: true }
    ).lean();
  } catch (error) {
    console.error("Error updating transaction:", error);
    return null;
  }
};

export const reassignCategoryByName = async (
  userEmail,
  oldCategory,
  newCategory
) => {
  try {
    return await Transaction.updateMany(
      { userEmail, category: oldCategory },
      { $set: { category: newCategory } }
    );
  } catch (error) {
    console.error("Error reassigning category:", error);
    return null;
  }
};
