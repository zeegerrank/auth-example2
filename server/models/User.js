const mongoose = require("mongoose");const UserSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Roles" }],
    refreshToken: String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
