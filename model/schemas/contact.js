const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Contact name is required"],
    },

    email: {
      type: String,
      required: [true, "Contact email is required"],
      trim: true,
      lowercase: true,
      unique: true,
    },

    phone: {
      type: String,
      required: [true, "Contact phone is required"],
    },

    subscription: { type: String },

    password: {
      type: String,
      required: true,
    },

    token: { type: String },
  },
  { versionKey: false, timestamps: true }
);

const Contact = mongoose.model("contact", contactSchema);

module.exports = Contact;