import userSchema from "./userSchema.js";

// create
export const insertUser = (userObj) => {
  return userSchema(userObj).save();
};

// read
// Update
// Delete
