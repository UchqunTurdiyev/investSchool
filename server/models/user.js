const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    userName: {type: String, required: true},
    email: { type: String, required: true },
    password: { type: String, required: true },
    rol: { type: String, default: "" },
  },
  { timestamps: true }
);
const User = model("User", userSchema);
module.exports = User;
//3213138
