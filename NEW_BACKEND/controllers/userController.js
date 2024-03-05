// external imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// internal imports
const SECRET_KEY = process.env.SECRET_KEY;
const { validateInputs } = require("../validators/user_details_validation");

// Schema imports
const User = require("../models/user_data_schema");
const Property = require("../models/property_data_scchema");
const wish = require('../models/wishlist')

// middleware imports
const { verifyToken } = require("../middlewares/auth");

const signup = async (req, res) => {
  try {
    const userData = req.body;

    // Validate user data
    const validationError = validateInputs(userData);
    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    // Check if the user already exists with the provided email or phone number
    const existingUser = await User.findOne({
      $or: [{ email: userData.email }, { phone_number: userData.phone_number }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
          "An account already exists with the provided email or phone number.",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    // Create a new user
    const newUser = new User(userData);
    const savedUser = await newUser.save();

    res.status(201).json({
      success: true,
      message: "User signed up successfully!",
      user: savedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const login = async (req, res) => {
  try {
    const userData = req.body;
    const username = userData.username;
    const password = userData.password;

    // validate  inputs
    const validationError = validateInputs(userData);
    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    // If the password is valid, generate a JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username, userType: user.user_type },
      SECRET_KEY,
      { expiresIn: process.env.TOKEN_EXPIRY }
    );

    res.status(200).json({
      success: true,
      message: "Login successful!",
      token,
      user: {
        username: user.username,
        full_name: user.full_name,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const my_property =(verifyToken,async (req, res) => {
  try {
    const userData = req.decoded;
    const owner = userData.userId;

    // Query properties with the matching owner_id
    const myProperties = await Property.find({ owner });

    res.status(200).json({
      success: true,
      message: "My properties retrieved successfully!",
      properties: myProperties,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

const addPropertyToWishlist = async (req, res) => {
  try {
    const userData = req.decoded;
    const propertyId = req.query.propertyId;

    // Find the user's wishlist entry or create a new one if it doesn't exist
    let wishlistEntry = await wish.findOne({ userId: userData.userId });

    if (!wishlistEntry) {
      wishlistEntry = new wish({
        userId: userData.userId,
        propertyIds: [propertyId],
      });
    } else {
      // Add the new propertyId to the existing propertyIds array
      wishlistEntry.propertyIds.push(propertyId);
    }

    // Save or update the wishlist entry
    await wishlistEntry.save();

    // Increment property's like count
    await Property.findByIdAndUpdate(propertyId, { $inc: { likes: 1 } });

    res.status(200).json({
      success: true,
      message: "Property added to wishlist successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const removePropertyFromWishlist = async (req, res) => {
  try {
    const userData = req.decoded;
    const propertyId = req.query.propertyId;

    // Find and update the user's wishlist entry
    const wishlistEntry = await wish.findOneAndUpdate(
      { userId: userData.userId },
      { $pull: { propertyIds: propertyId } },
      { new: true }
    );

    // If the wishlist entry doesn't exist or propertyId was not present, return success
    if (!wishlistEntry || wishlistEntry.propertyIds.indexOf(propertyId) === -1) {
      return res.status(200).json({
        success: true,
        message: "Property removed from wishlist successfully!",
      });
    }

    // Decrement property's like count
    await Property.findByIdAndUpdate(propertyId, { $inc: { likes: -1 } });

    res.status(200).json({
      success: true,
      message: "Property removed from wishlist successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


module.exports = {
  signup,
  login,
  my_property,
  addPropertyToWishlist,
  removePropertyFromWishlist,
};
