const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  mobile: { type: String, required: true },

  role: {
    type: String,
    enum: ["user", "deliveryBoy", "owner"],
    default: "user",
    required: true,
  },

  resetOTP: {
    type: String
  },
  isOTPVerified: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;