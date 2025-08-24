import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },

    address: {
      type: Object,
      default: { line1: "", line2: "" },
    },
    gender: {
      type: String,
      default: "Not Seleted",
    },
    dob: {
      type: String,
      default: "Not Seleted",
    },
    phone: {
      type: String,
      default: "0000000000",
    },
  },
  { minimize: false }
);
const User = mongoose.model.user || mongoose.model("user", userSchema);

export default User;
