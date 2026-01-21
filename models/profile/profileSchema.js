import mongoose from "mongoose";
import {
  connectTransactionsDB,
  getTransactionsConnection,
} from "../../config/transactionsDb.js";

const profileSchema = mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    fullName: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const connection = getTransactionsConnection() || connectTransactionsDB();
const Profile = connection.model("Profile", profileSchema);

export default Profile;
