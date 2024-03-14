const { verifyToken } = require("../middlewares/auth");
const Property = require("../models/property_data_scchema");
const User = require("../models/user_data_schema")
const wish = require('../models/wishlist')

const cloudinaryUtils = require("../utils/cloudinary");

/**Searches for properties based on type and locality.
 * @param {Object} req - The request object containing query parameters.
 * @param {Object} res - The response object used to return data or messages.
 */
const search = async (req, res) => {
  try {
    const type = req.query.type;
    const searchQuery = req.query.locality; // Extract the address query parameter

    // If no search query is provided, return an error
    if (!searchQuery) {
      return res.status(400).json({
        success: false,
        message: "Please provide an address for the search.",
      });
    }

    // Fetch properties based on the address query (including both city and state)
    const matchingProperties = await Property.find({
      trade_type: type,
        status: "approved", //TODO : Add this back when properties are approved
      $or: [
        { "Address.city": { $regex: new RegExp(searchQuery, "i") } },
        { state: { $regex: new RegExp(searchQuery, "i") } },
      ],
    });

    // If no matching properties are found, return a message
    if (matchingProperties.length === 0) {
      return res.status(404).json({
        success: true,
        message: "No properties found in the specified area.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Properties matching the search query retrieved successfully!",
      properties: matchingProperties,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**Posts a new property for rent.
 * @param {Function} verifyToken - Middleware to verify user token.
 * @param {Object} req - The request object containing property details.
 * @param {Object} res - The response object used to return data or messages.
 */
const rent_prop =(verifyToken,async (req, res) => {
  try {
    const userData = req.decoded; // Decoded user information from the token

    // Extract relevant data from the request body
    const {
      rent_price,
      bhk_type,
      state,
      street_name,
      city,
      Landmark,
      pincode,
      furnished,
      pref_tenants,
      // images,
      availableFrom,
      deposit,
      built_Up_area,
    } = req.body;

    // const cloudinaryImageUrls = await Promise.all(
    //   images.map(async (imageData) => {
    //     return await cloudinaryUtils.uploadToCloudinary(
    //       `./assets/property-images/${imageData.url}`
    //     );
    //   })
    // );

    // Create a new property using the Property model
    const newProperty = new Property({
      trade_type: "rent",
      owner: userData.userId, // Owner is the username of the verified user
      owner_user_name: userData.username,
      rent_price,
      bhk_type,
      state,
      street_name,
      city,
      Landmark,
      pincode,
      Furnished: furnished,
      preferred_tenents: pref_tenants,
      // images: cloudinaryImageUrls,
      availableFrom,
      deposit,
      built_Up_area,
      posted_on: new Date(),
    });

    // Save the property to the database
    const savedProperty = await newProperty.save();

    res.status(201).json({
      success: true,
      message: "Property posted for rent successfully!",
      property: savedProperty,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

/**Posts a new property for sale.
 * @param {Function} verifyToken - Middleware to verify user token.
 * @param {Object} req - The request object containing property details.
 * @param {Object} res - The response object used to return data or messages.
 */
const sell_prop =(verifyToken,async (req, res) => {
  try {
    const userData = req.decoded; // Decoded user information from the token

    // Extract relevant data from the request body
    const {
      prop_price,
      bhk_type,
      state,
      street_name,
      city,
      Landmark,
      pincode,
      Furnished,
      // images,
      availableFrom,
      deposit,
      property_type,
      amenities,
      built_Up_area,
    } = req.body;

    // const cloudinaryImageUrls = await Promise.all(
    //   images.map(async (imageData) => {
    //     return await cloudinaryUtils.uploadToCloudinary(
    //       `./assets/property-images/${imageData.url}`
    //     );
    //   })
    // );

    // Create a new property using the Property model
    const newProperty = new Property({
      trade_type: "sell",
      owner: userData.userId,
      owner_user_name: userData.username,
      prop_price,
      bhk_type,
      state,
      street_name,
      city,
      Landmark,
      pincode,
      Furnished,
      // images: cloudinaryImageUrls,
      availableFrom,
      property_type,
      deposit,
      amenities,
      built_Up_area,
      posted_on: new Date(),
    });

    // Save the property to the database
    const savedProperty = await newProperty.save();

    res.status(201).json({
      success: true,
      message: "Property posted for sell successfully!",
      property: savedProperty,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

/**Modifies an existing property.
 * @param {Function} verifyToken - Middleware to verify user token.
 * @param {Object} req - The request object containing updated property details.
 * @param {Object} res - The response object used to return data or messages.
 */
const modify_prop =(verifyToken,async (req, res) => {
  try {
    const propertyId = req.query.propertyId;
    const userData = req.decoded;
    const updatedFields = req.body; // Fields to be updated

    // Find the property by ID
    const property = await Property.findById(propertyId);
    // Check if the user is the owner of the property
    if (property.owner_user_name !== userData.username) {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to modify this property",
      });
    }

    // Update the property fields
    Object.assign(property, updatedFields);

    // Save the updated property
    const updatedProperty = await property.save();

    res.status(200).json({
      success: true,
      message: "Property modified successfully!",
      property: updatedProperty,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

/**Modifies an existing property.
 * @param {Function} verifyToken - Middleware to verify user token.
 * @param {Object} req - The request object containing updated property details.
 * @param {Object} res - The response object used to return data or messages.
 */
const remove_my_prop = (verifyToken, async (req, res) => {
  try {
    const propertyId = req.query.propertyId;
    const userData = req.decoded;

    // Find the property by ID
    const property = await Property.findById(propertyId);

    // Check if the user is the owner of the property
    if (property.owner_user_name !== userData.username) {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to remove this property",
      });
    }

    // Remove the property from the Property collection
    await Property.findByIdAndDelete(propertyId);

    // Update wishlists of all users to remove the specified propertyId
    await wish.updateMany({}, { $pull: { propertyIds: propertyId } });

    res.status(200).json({
      success: true,
      message: "Property removed successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

const get_details = async (req, res) => {
  try {
    // Assuming the property ID is passed in the query parameters
    const propertyId = req.query.propertyId;

    // Find the property by ID
    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found',
      });
    }

    // Extract owner ID from the property data
    const ownerId = property.owner;

    // Find the owner in the user_data collection
    const owner = await User.findById(ownerId);

    if (!owner) {
      return res.status(404).json({
        success: false,
        message: 'Owner not found',
      });
    }

    // Extract owner details
    const ownerDetails = {
      full_name: owner.full_name,
      phone_number: owner.phone_number,
      // Add other owner details as needed
    };

    res.status(200).json({
      success: true,
      message: 'Owner details retrieved successfully!',
      owner: ownerDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

module.exports = { search, rent_prop, sell_prop, modify_prop, remove_my_prop,get_details };
