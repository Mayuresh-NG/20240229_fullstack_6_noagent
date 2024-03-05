const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
  },
  full_name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^\S+@\S+\.\S+$/,
  },
  phone_number: {
    type: Number,
    required: true,
    validate: {
      validator: (v) => /^\d{10}$/.test(v),
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  user_type: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  avatar: {
    type: String,
  },
  date_of_joining: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("user_datas", userSchema);
module.exports = User;
