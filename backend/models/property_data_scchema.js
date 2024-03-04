const mongoose = require("mongoose");

const propSchema = new mongoose.Schema({
  trade_type: {
    type: String,
    required: true,
    enum: ["rent", "sell"], 
  },
  owner: {
    type: String,
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
  },
  built_Up_area: String,
  state: String,
  Address: {
    street_name: String,
    city: String,
    Landmark: String,
    pincode: {
      type: Number,
    },
  },
  Furnished: {
    full: Boolean,
    semi: Boolean,
    none: Boolean,
  },
  preferred_tenents: {
    family: Boolean,
    Company: Boolean,
    B_male: Boolean,
    B_female: Boolean,
  },
  images: [
    {
      url: {
        type: String,
        required: true,
      },
      format: {
        type: String,
        required: true,
      },
    },
  ],
  Availability_data: Date,
  deposit: {
    type: Number,
    min: [0, "Deposit must be a non-negative value"],
  },
  property_type: String,
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
  },
});

const Property = mongoose.model("property_datas", propSchema);

module.exports = Property;
