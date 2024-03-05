// importing user and property schema
const User = require("./models/user_data_schema");
const Property = require("./models/property_data_scchema");

// middleware to verify jwt token and checking admin rights
const { verifyToken, isAdmin } = require("./middleware/auth");

// basic libraries for jwt,bcrypt and storing secret key
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

// Msecret key used for jwt
const SECRET_KEY = process.env.SECRET_KEY;

const express = require("express");
const mongoose = require("mongoose");

// cloud configuration for storing images in cloudinary
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dcoiy8s8h",
  api_key: "285696465858417",
  api_secret: "JitIrqE0HS5ZOmMg7DYg2QDdfmk",
});

// initialize app
const app = express();
app.use(bodyParser.json());

// connecting  to the database
mongoose.connect(
  "mongodb+srv://mayureshngorantiwar:4pH5dvC4d7XRUe8O@cluster0.sdnavtq.mongodb.net/NOAGENT"
);

// API calls not requiring login
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
      { userId: user._id, username: user.username},
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
      status: "approved",
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
      status: "approved",
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

app.get("/rent/filter", async (req, res) => {
  try {
    const { bhkType, furnishing, preferredTenants, maxPrice } = req.query;

    // Build the filter object based on provided parameters
    const filter = {};

    if (bhkType) {
      filter.bhk_type = bhkType;
    }

    if (furnishing) {
      filter["Furnished.full"] = furnishing === "full";
      filter["Furnished.semi"] = furnishing === "semi";
      filter["Furnished.none"] = furnishing === "none";
    }

    if (preferredTenants) {
      // Convert preferredTenants to an array of preferred tenant types
      const preferredTenantsArray = preferredTenants.split(",");

      // Build the filter for preferred tenants
      const preferredTenantsFilter = {};
      preferredTenantsArray.forEach((tenantType) => {
        preferredTenantsFilter[`preferred_tenents.${tenantType}`] = true;
      });

      // Add the preferred tenants filter to the main filter object
      filter.$and = [preferredTenantsFilter];
    }

    if (maxPrice) {
      filter.rent_price = { $lte: parseInt(maxPrice) };
    }

    // Fetch properties based on the applied filters
    const filteredProperties = await Property.find({
      trade_type: "rent",
      status: "approved", // Assuming you want only approved properties
      ...filter,
    });

    // If no matching properties are found, return a message
    if (filteredProperties.length === 0) {
      return res.status(404).json({
        success: true,
        message: "No properties found based on the applied filters.",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Properties matching the filter criteria retrieved successfully!",
      properties: filteredProperties,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

app.get("/buy/filter", async (req, res) => {
  try {
    const { bhkType, furnishing, propertyType, maxPrice } = req.query;

    // Build the filter object based on provided parameters
    const filter = {};

    if (bhkType) {
      filter.bhk_type = bhkType;
    }

    if (furnishing) {
      filter["Furnished.full"] = furnishing === "full";
      filter["Furnished.semi"] = furnishing === "semi";
      filter["Furnished.none"] = furnishing === "none";
    }

    if (propertyType) {
      filter.property_type = propertyType;
    }

    if (maxPrice) {
      filter.rent_price = { $lte: parseInt(maxPrice) };
    }

    // Fetch properties based on the applied filters
    const filteredProperties = await Property.find({
      trade_type: "sell",
      status: "approved", // Assuming you want only approved properties
      ...filter,
    });

    // If no matching properties are found, return a message
    if (filteredProperties.length === 0) {
      return res.status(404).json({
        success: true,
        message: "No properties found based on the applied filters.",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Properties matching the filter criteria retrieved successfully!",
      properties: filteredProperties,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

app.post("/sort_properties", async (req, res) => {
  try {
    const { tradeType, sortOption } = req.query;

    let sortCriteria = {};

    // Define the sort criteria based on the selected option
    switch (sortOption) {
      case "newest_first":
        sortCriteria = { posted_on: -1 }; // Sort by posted_on in descending order
        break;
      case "oldest_first":
        sortCriteria = { posted_on: 1 }; // Sort by posted_on in ascending order
        break;
      case "price_low_to_high":
        sortCriteria = { rent_price: 1, prop_price: 1 }; // Sort by rent_price and prop_price in ascending order
        break;
      case "price_high_to_low":
        sortCriteria = { rent_price: -1, prop_price: -1 }; // Sort by rent_price and prop_price in descending order
        break;
      default:
        return res.status(400).json({
          success: false,
          message: "Invalid sort option provided",
        });
    }

    const properties = await Property.find({
      trade_type: tradeType,
      // status: "approved",
    }).sort(sortCriteria);

    res.status(200).json({
      success: true,
      message: "Properties sorted successfully!",
      properties: properties,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

// middleware to handle verified routes
app.use(verifyToken);

// API calls requiring login
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
      pref_tenants,
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
      preferred_tenents: pref_tenants,
      images: cloudinaryImageUrls,
      availability_date,
      posted_on: new Date(),
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
      property_type,
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
      property_type,
      deposit,
      amenities,
      posted_on: new Date(),
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

app.patch(
  "/my_properties/modify/:propertyId",
  verifyToken,
  async (req, res) => {
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

app.delete(
  "/my_properties/remove/:propertyId",
  verifyToken,
  async (req, res) => {
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
        message: "Property removed successfully!",
        removedPropertyId: propertyId,
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

app.patch("/approve_property/:propertyId", isAdmin, async (req, res) => {
  try {
    const propertyId = req.params.propertyId;

    // Update the status to "approved"
    const updatedProperty = await Property.findByIdAndUpdate(
      propertyId,
      { status: "approved" },
      { new: true } // Returns the updated document
    );

    if (!updatedProperty) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Property approved successfully!",
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

// start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
