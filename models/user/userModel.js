import User from "./userSchema.js";
import userSchema from "./userSchema.js";


//check if email exists
export const isExistingEmail = async(email) => {
  const existingEmail = await User.exists({ email });
  return !!existingEmail;
};
// create
export const insertSignupData = (userObj) => {
  return userSchema(userObj).save();
};
// read
// Update
// Delete
