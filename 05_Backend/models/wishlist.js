const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  propertyIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  }],
});

const wish = mongoose.model("wish", wishlistSchema);
module.exports = wish;