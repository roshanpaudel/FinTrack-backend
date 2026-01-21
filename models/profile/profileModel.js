import Profile from "./profileSchema.js";

export const getProfileByEmail = async (userEmail) => {
  try {
    return await Profile.findOne({ userEmail }).lean();
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
};

export const upsertProfileByEmail = async (userEmail, profileData) => {
  try {
    return await Profile.findOneAndUpdate(
      { userEmail },
      { $set: { ...profileData, userEmail } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
  } catch (error) {
    console.error("Error updating profile:", error);
    return null;
  }
};
