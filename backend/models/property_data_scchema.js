const mongoose = require('mongoose')

const propSchema = new mongoose.Schema({
  trade_type: String,
  owner: String,
  rent_price: Number,
  prop_price: Number,
  bhk_type: String,
  built_Up_area: String,
  state: String,
  Address: {
    street_name: String,
    city: String,
    Landmark: String,
    pincode: Number,
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
  deposit: Number,
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
    default: 'pending',
  },
});

const Property = mongoose.model("property_datas", propSchema);

module.exports = Property;
