const mongoose = require("mongoose");

const propSchema = new mongoose.Schema({
  trade_type: {
    type: String,
    required: true,
    enum: ["rent", "sell"],
  },
  owner_user_name: {
    type: String,
    required: true,
    minlength: [2, "Owner username must be at least 2 characters long"],
    maxlength: [50, "Owner username cannot exceed 50 characters"],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rent_price: {
    type: Number,
    min: [0, "Rent price must be a non-negative value"],
  },
  prop_price: {
    type: Number,
    min: [0, "Property price must be a non-negative value"],

  },
  bhk_type: {
    type: String,
    required: true,
    enum: ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5+ BHK"],
    required: true,
  },
  built_up_area: {
    type: String,
    validate: {
      validator: function (v) {
        // Custom validator example: checks if built_up_area is in valid format
        return /^[0-9]+(.[0-9]+)? (sq\.m|sq\.ft)$/.test(v);
      },
      message: "Built up area must be in valid format (e.g., '1000 sq.m' or '1200 sq.ft')",
    },
    required: true,
  },
  state: String,
  address: {
    street_name: String,
    city: String,
    landmark: String,
    pincode: {
      type: Number,
      minlength: [6, "Pincode must be 6 digits long"],
      maxlength: [6, "Pincode must be 6 digits long"],
    },
  },
  furnished: {
    type: String,
    enum: ["full", "semi", "none"],
  },
  preferred_tenants: {
    family: Boolean,
    company: Boolean,
    b_male: Boolean,
    b_female: Boolean,
  },
  images: [
    {
      url: String,
      format: {
        type: String,
        enum: ["jpg", "png", "gif"],
      },
    },
  ],
  available_from: String,
  deposit: {
    type: Number,
    min: [0, "Deposit must be a non-negative value"],
    required: true,
  },
  property_type: {
    type: String,
    enum: ["apartment", "house", "villa", "commercial"],
 
  },
  amenities: {
    type: [String],
  },
  posted_on: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "approved"],
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
});

const Property = mongoose.model("property_datas", propSchema);

module.exports = Property;
