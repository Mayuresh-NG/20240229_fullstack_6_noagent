const User = require("./models/user_data_schema");
const Property = require("./models/property_data_scchema");
const { verifyToken } = require("./middleware/auth");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;

const express = require("express");
const mongoose = require("mongoose");
const port = 3000;

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dcoiy8s8h",
  api_key: "285696465858417",
  api_secret: "JitIrqE0HS5ZOmMg7DYg2QDdfmk",
});

const app = express();
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://mayureshngorantiwar:4pH5dvC4d7XRUe8O@cluster0.sdnavtq.mongodb.net/NOAGENT"
);

app.post("/signup", async (req, res) => {
  try {
    const userData = req.body;
    const hashedPassword = await bcrypt.hash(userData.password, 10); // 10 is the number of salt rounds
    userData.password = hashedPassword;
    // Check if the username already exists
    const existingUser = await User.findOne({ username: userData.username });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Username already exists. Please choose a different username.",
      });
    }

    // Create a new user if the username is unique
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
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.query;

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
      { userId: user._id, username: user.username },
      SECRET_KEY,
      { expiresIn: "23h" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful!",
      token,
      user: {
        username: user.username,
        full_name: user.full_name,
        // Add other user details as needed
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

app.post("/rent_property", verifyToken, async (req, res) => {
  try {
    const userData = req.decoded; // Decoded user information from the token

    // Extract relevant data from the request body
    const {
      rent_price,
      bhk_type,
      state,
      address,
      furnished,
      preferred_tenants,
      images,
      availability_date,
    } = req.body;

    const cloudinaryUploadPromises = images.map(async (imageData) => {
      const result = await cloudinary.uploader.upload(
        `./assets/property-images/${imageData.url}`,
        {
          folder: "property_images",
        }
      );

      return {
        url: result.secure_url,
        format: result.format,
      };
    });

    // Wait for all image uploads to complete
    const cloudinaryImageUrls = await Promise.all(cloudinaryUploadPromises);

    // Create a new property using the Property model
    const newProperty = new Property({
      trade_type: "rent",
      owner: userData.username, // Owner is the username of the verified user
      rent_price,
      bhk_type,
      state,
      Address: address,
      Furnished: furnished,
      preferred_tenants,
      images: cloudinaryImageUrls,
      availability_date,
    });

    // Save the property to the database
    const savedProperty = await newProperty.save();

    await User.findOneAndUpdate(
      { username: userData.username },
      {
        $push: {
          my_properties: {
            property_id: savedProperty._id,
          },
        },
      }
    );

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

app.post("/sell_property", verifyToken, async (req, res) => {
  try {
    const userData = req.decoded; // Decoded user information from the token

    // Extract relevant data from the request body
    const {
      prop_price,
      bhk_type,
      state,
      address,
      furnished,
      images,
      availability_date,
      deposit,
      amenities,
    } = req.body;

    const cloudinaryUploadPromises = images.map(async (imageData) => {
      const result = await cloudinary.uploader.upload(
        `./assets/property-images/${imageData.url}`,
        {
          folder: "property_images",
        }
      );

      return {
        url: result.secure_url,
        format: result.format,
      };
    });

    // Wait for all image uploads to complete
    const cloudinaryImageUrls = await Promise.all(cloudinaryUploadPromises);

    // Create a new property using the Property model
    const newProperty = new Property({
      trade_type: "sell",
      owner: userData.username, // Owner is the username of the verified user
      prop_price,
      bhk_type,
      state,
      Address: address,
      Furnished: furnished,
      images: cloudinaryImageUrls,
      availability_date,
      deposit,
      amenities,
    });

    // Save the property to the database
    const savedProperty = await newProperty.save();
    await User.findOneAndUpdate(
      { username: userData.username },
      {
        $push: {
          my_properties: {
            property_id: savedProperty._id,
          },
        },
      }
    );

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

app.get("/my_properties", verifyToken, async (req, res) => {
  try {
    const userData = req.decoded;

    // Fetch the user with populated my_properties field
    const userWithProperties = await User.findOne({
      username: userData.username,
    }).populate("my_properties");

    // Extract the properties from the populated field
    const myProperties = userWithProperties.my_properties;

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

app.post("/add_to_wishlist/:propertyId", verifyToken, async (req, res) => {
  try {
    const userData = req.decoded;
    const propertyId = req.params.propertyId;

    const property = await Property.findById(propertyId);
    const user = await User.findOne({ username: userData.username });

    console.log("Current wishlist:", user.my_wishlist);
    console.log("PropertyId to add:", propertyId);

    // Check if the property is already in the user's wishlist
    if (
      user.my_wishlist.some(
        (item) => item.property_id && item.property_id.toString() === propertyId
      )
    ) {
      console.log("Property already in wishlist");
      return res.status(400).json({
        success: false,
        message: "Property already in wishlist",
      });
    }

    // Add the propertyId to the user's my_wishlist array
    user.my_wishlist.push({ property_id: propertyId });
    await user.save();

    console.log("Property added to wishlist successfully!");

    res.status(200).json({
      success: true,
      message: "Property added to wishlist successfully!",
      property: property,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

app.get("/my_wishlist", verifyToken, async (req, res) => {
  try {
    const userData = req.decoded;

    // Fetch the user with populated my_properties field
    const userWithProperties = await User.findOne({
      username: userData.username,
    }).populate("my_wishlist");

    // Extract the properties from the populated field
    const myProperties = userWithProperties.my_wishlist;

    res.status(200).json({
      success: true,
      message: "My wishlist retrieved successfully!",
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

app.get("/buy/search", async (req, res) => {
  try {
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
      trade_type: "sell",
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
});

app.get("/rent/search", async (req, res) => {
  try {
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
      trade_type: "rent",
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
});

app.delete("/my_wishlist/remove/:propertyId", verifyToken, async (req, res) => {
  try {
    const userData = req.decoded; // Decoded user information from the token
    const propertyId = req.params.propertyId; // Extract propertyId from the URL parameters

    // Find the user by username
    const user = await User.findOne({ username: userData.username });

    // Check if the property exists in the user's wishlist
    const propertyIndex = user.my_wishlist.indexOf(propertyId);

    // Remove the propertyId from the user's my_wishlist array
    user.my_wishlist.splice(propertyIndex, 1);

    // Save the updated user document
    await user.save();

    res.status(200).json({
      success: true,
      message: "Property removed from the wishlist successfully!",
      removedPropertyId: propertyId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

app.patch("/my_properties/modify/:propertyId",verifyToken,async (req, res) => {
    try {
      const propertyId = req.params.propertyId;
      const userData = req.decoded;
      const updatedFields = req.body; // Fields to be updated

      // Find the property by ID
      const property = await Property.findById(propertyId);

      // Check if the user is the owner of the property
      if (property.owner !== userData.username) {
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
  }
);

app.delete('/my_properties/remove/:propertyId', verifyToken, async (req, res) => {
  try {
    const propertyId = req.params.propertyId;
    const userData = req.decoded;

    // Find the property by ID
    const property = await Property.findById(propertyId);

    // Check if the user is the owner of the property
    if (property.owner !== userData.username) {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to remove this property",
      });
    }

    // Remove the property from the User's my_properties array
    await User.findOneAndUpdate(
      { username: userData.username },
      { $pull: { my_properties: { property_id: propertyId } } }
    );

    // Remove the property from the Property collection
    await Property.findByIdAndDelete(propertyId);

    res.status(200).json({
      success: true,
      message: 'Property removed successfully!',
      removedPropertyId: propertyId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
