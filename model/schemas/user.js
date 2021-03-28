const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bCrypt = require('bcryptjs');
const SALT_FACTOR = 6;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      unique: true,
      validate(value) {
        const re = /\S+@\S+\.\S+/;
        return re.test(String(value).toLowerCase());
      },
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },

    subscription: {
      type: String,
      enum: ["free", "pro", "premium"],
      default: "free",
    },

    token: { type: String },
  },

  { versionKey: false, timestamps: true }
);

userSchema.methods.setPassword = function (password) {
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(SALT_FACTOR))
}

userSchema.methods.validPassword = function (password) {
  return bCrypt.compareSync(password, this.password)
}

const User = mongoose.model("user", userSchema);

module.exports = User;
