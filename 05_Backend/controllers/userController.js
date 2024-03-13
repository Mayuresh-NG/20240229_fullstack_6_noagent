// external imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");

// internal imports
const SECRET_KEY = process.env.SECRET_KEY;
const { validateInputs } = require("../validators/user_details_validation");

// Schema imports
const User = require("../models/user_data_schema");
const Property = require("../models/property_data_scchema");
const wish = require("../models/wishlist");

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

const my_property =
  (verifyToken,
  async (req, res) => {
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
    if (
      !wishlistEntry ||
      wishlistEntry.propertyIds.indexOf(propertyId) === -1
    ) {
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

const get_my_profile =
  (verifyToken,
  async (req, res) => {
    try {
      const userData = req.decoded;

      // Find the user by ID
      const user = await User.findById(userData.userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // Extract user details
      const userDetails = {
        username: user.username,
        full_name: user.full_name,
        email: user.email,
        phone_number: user.phone_number,
        // Add other user details as needed
      };

      res.status(200).json({
        success: true,
        message: "User profile retrieved successfully!",
        user: userDetails,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  });

// Function to initiate the password reset process
const forget_password = async (req, res) => {
  try {
    // Extracting the email from the request body
    const email = req.body.email;
    
    // Finding user data based on the provided email
    const userData = await User.findOne({ email: email }, { username: 1, email: 1 });

    // If user data is found
    if (userData) {
      // Generating a random string
      const randomString = randomstring.generate();
      
      // Updating the user's record with the generated token
      const data = await User.updateOne(
        { email: email },
        { $set: { token: randomString } }
      );

    

      // Sending the reset password email
      sendResetPasswordMail(userData.username, userData.email, randomString);

      // Sending a success response
      res.status(200).send({ success: true, msg: "Check mail and reset password!" });
    } else {
      // Sending a success response if email does not exist
      res.status(200).send({ success: true, msg: "Email does not exist" });
    }
  } catch (error) {
    // Handling errors and sending an error response if an exception occurs
    res.status(400).send({ success: false, msg: error.message });
  }
};

// Function for sending a reset password email
const sendResetPasswordMail = async (name, email, token) => {
  try {
    // Creating a transporter for sending emails using Gmail SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: config.emailUser,  // Your Gmail username
        pass: config.emailPassword,  // Your Gmail password
      },
    });

    // Mail options for the reset password email
    const mailOptions = {
      from: config.emailUser,  // Sender's email address
      to: email,  // Recipient's email address
      subject: "For reset password",  // Email subject
      // Email body in HTML format
      html: `
        <p>Hi ${name},</p>
        <p>Please click the link below to reset your password:</p>
        <a href=http://localhost:4200/resetpassword?token=${token}>Reset password</a>
      `
    };

    // Sending the email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        // Log an error if sending the email fails
        console.log(error);
      } else {
        // Log a success message if the email is sent successfully
        console.log("Mail Has been sent:-", info.response);
      }
    });
  } catch (error) {
    // Handling errors and sending an error response if an exception occurs
    res.status(400).send({ success: false, msg: error.message });
  }
};

const reset_password = async (req, res) => {
  try {
    // Extracting the token from the query parameters
    const token = req.query.token;
    console.log(token);
    
    
    // Finding user data based on the provided token
    const tokenData = await User.findOne({ token: token });
    console.log(tokenData);

    // If token data is found and it's not expired
    if (tokenData && !isTokenExpired(tokenData.tokenTimestamp)) {
      // Extracting the new password from the request body  
      const password = req.body.password;
      
      // Hashing the new password using bcrypt
      const newPass = await bcrypt.hash(password, 10);

      // Updating the user's record with the new password and clearing the token
      const userdata = await User.findByIdAndUpdate(
        { _id: tokenData._id },
        { $set: { password: newPass, token: "" } },
        { new: true }
      );

      // Sending a success response with the updated user data
      res.status(200).send({
        success: true,
        msg: "Password reset successfully",
        data: userdata,
      });
    } else {
      // Sending a success response if the link has expired or the token is invalid
      res.status(200).send({ success: true, msg: "Link Expired or Invalid Token!" });
    }
  } catch (error) {
    // Handling errors and sending an error response if an exception occurs
    res.status(400).send({ success: false, msg: error.message });
  }
};

// Function to check if the token is expired
const isTokenExpired = (timestamp) => {
  const expirationTime = 86400000; 
  const currentTime = new Date().getTime();
  return (currentTime - timestamp) > expirationTime;
};



module.exports = {
  signup,
  login,
  my_property,
  forget_password,
  reset_password,
  addPropertyToWishlist,
  removePropertyFromWishlist,
  get_my_profile,
};