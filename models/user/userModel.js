import User from "./userSchema.js";
import userSchema from "./userSchema.js";

//check if email exists
export const isExistingEmail = async (email) => {
  try {
    const existingEmail = await User.exists({ email });
    return !!existingEmail;
  } catch (error) {
    console.error("Error checking email in DB:", error);
    return null;
  }
};
// create
export const insertSignupData = (userObj) => {
  return userSchema(userObj)
    .save()
    .catch((error) => {
      console.error("Error sigup in DB:", error);
      return null;
    });
};
// read hash
export const getHashByEmail = async (email) => {
  try {
    // Find one user by email and select only the password field
    const user = await User.findOne({ email: email }, "password");

    // If a user is found, return their password hash, otherwise return null
    return user ? user.password : null;
  } catch (error) {
    console.error("Error retrieving hash by email:", error);
    return null;
  }
};

// Update
// Delete
