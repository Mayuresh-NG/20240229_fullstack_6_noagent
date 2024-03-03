const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  full_name: String,
  email: String,
  phone_number: Number,
  password: String,
  user_type: String,
  date_of_joining: {
    type: Date,
    default: Date.now,
  },
  my_wishlist: [
    {
      property_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
      },
    },
  ],
  my_properties: [
    {
      property_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
      },
    },
  ],
});

const User = mongoose.model("user_datas", userSchema);
module.exports = User;
