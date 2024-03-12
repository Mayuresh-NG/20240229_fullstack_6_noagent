// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

//imports for swagger ui
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


// Load environment variables from .env file
dotenv.config();

// Create an Express app
const app = express();

// Parse JSON requests
app.use(bodyParser.json());

// Define routes
const userRoutes = require("./routes/userRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const adminRoutes = require("./routes/adminRoutes");

// Connect to MongoDB asynchronously
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process if unable to connect
  }
};

/*
* Use the routes in your app
*/

/*
? swagger comments for user APIs
*/
/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Register a new user
 *     description: Registers a new user with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               full_name:
 *                  type: string
 *               email:
 *                  type: string
 *               phone_number:
 *                  type: number
 *               password:
 *                 type: string
 *               user_type:
 *                 type: string
 *                
 *     responses:
 *       201:
 *         description: User signed up successfully.
 *       400:
 *         description: Validation error or user already exists.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user and returns a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful.
 *       401:
 *         description: Invalid password.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /users/forget_password:
 *   post:
 *     summary: Initiate password reset process
 *     description: Sends a password reset email to the user with a unique token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Check mail and reset password.
 *       400:
 *         description: Error occurred.
 */

/**
 * @swagger
 * /users/reset_password:
 *   post:
 *     summary: Reset user's password
 *     description: Allows a user to reset their password using a token received via email.
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: The token for password reset.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successfully.
 *       400:
 *         description: Error occurred or link expired.
 */

/**
 * @swagger
 * /users/my_properties:
 *   get:
 *     summary: Get user's properties
 *     description: Retrieves a list of properties associated with the user.
 *     responses:
 *       200:
 *         description: Properties retrieved successfully.
 *       404:
 *         description: No properties found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /users/add_to_wishlist:
 *   post:
 *     summary: Add a property to the user's wishlist
 *     description: Adds a specified property to the user's wishlist.
 *     parameters:
 *       - in: query
 *         name: propertyId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the property to add to the wishlist.
 *     responses:
 *       200:
 *         description: Property added to wishlist successfully.
 *       400:
 *         description: Error occurred or property already in wishlist.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /users/remove_from_wishlist:
 *   delete:
 *     summary: Remove a property from the user's wishlist
 *     description: Removes a specified property from the user's wishlist.
 *     parameters:
 *       - in: query
 *         name: propertyId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the property to add to the wishlist.
 *     responses:
 *       200:
 *         description: Property removed from wishlist successfully.
 *       400:
 *         description: Error occurred or property not in wishlist.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /users/get_my_profile:
 *   get:
 *     summary: Get user profile
 *     description: Retrieves the profile information of the logged-in user.
 *     responses:
 *       200:
 *         description: Profile retrieved successfully.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
app.use("/users", userRoutes);

/*
? swagger comments for Property APIs
*/
/**
 * @swagger
 * /properties/search:
 *   get:
 *     summary: Searches for properties based on type and locality
 *     description: Retrieves properties matching the specified type and locality.
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: The type of the property (e.g., rent, sell).
 *       - in: query
 *         name: locality
 *         schema:
 *           type: string
 *         description: The locality to search for properties.
 *     responses:
 *       200:
 *         description: Properties matching the search query retrieved successfully.
 *       400:
 *         description: Please provide an address for the search.
 *       404:
 *         description: No properties found in the specified area.
 *       500:
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /properties/rent:
 *   post:
 *     summary: Posts a new property for rent
 *     description: Allows users to post a new property available for rent.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rent_price:
 *                 type: number
 *               bhk_type:
 *                 type: string
 *               state:
 *                 type: string
 *               address:
 *                 type: object
 *                 properties:
 *                   street_name:
 *                     type: string
 *                   city:
 *                     type: string
 *                   Landmark:
 *                     type: string
 *                   pincode:
 *                     type: number
 *               furnished:
 *                 type: object
 *                 properties:
 *                   full:
 *                     type: boolean
 *                   semi:
 *                     type: boolean
 *                   none:
 *                     type: boolean
 *               pref_tenants:
 *                 type: object
 *                 properties:
 *                   family:
 *                     type: boolean
 *                   Company:
 *                     type: boolean
 *                   B_male:
 *                     type: boolean
 *                   B_female:
 *                     type: boolean
 *               images:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *               availability_date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Property posted for rent successfully.
 *       500:
 *         description: Internal Server Error.
 *     securityDefinitions:
 *       BearerAuth:
 *         type: apiKey
 *         in: header
 *         name: Authorization
 */

/**
 * @swagger
 * /properties/sell:
 *   post:
 *     summary: Posts a new property for sale
 *     description: Allows users to post a new property available for sale.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prop_price:
 *                 type: number
 *               bhk_type:
 *                 type: string
 *               state:
 *                 type: string
 *               address:
 *                 type: object
 *                 properties:
 *                   street_name:
 *                     type: string
 *                   city:
 *                     type: string
 *                   Landmark:
 *                     type: string
 *                   pincode:
 *                     type: number
 *               furnished:
 *                 type: boolean
 *               images:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *               availability_date:
 *                 type: string
 *                 format: date
 *               deposit:
 *                 type: number
 *               property_type:
 *                 type: string
 *               amenities:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       '201':
 *         description: Property posted for sale successfully.
 *       '500':
 *         description: Internal Server Error.
 *     securityDefinitions:
 *       BearerAuth:
 *         type: apiKey
 *         in: header
 *         name: Authorization
 */

/**
 * @swagger
 * /properties/modify_property:
 *   put:
 *     summary: Modifies an existing property
 *     description: Allows users to modify details of an existing property they own.
 *     parameters:
 *       - in: query
 *         name: propertyId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the property to modify.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Property modified successfully.
 *       403:
 *         description: You don't have permission to modify this property.
 *       500:
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /properties/remove_property:
 *   delete:
 *     summary: Removes an existing property
 *     description: Allows users to remove an existing property they own.
 *     parameters:
 *       - in: query
 *         name: propertyId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the property to remove.
 *     responses:
 *       200:
 *         description: Property removed successfully.
 *       403:
 *         description: You don't have permission to remove this property.
 *       500:
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /properties/get_owner_details:
 *   get:
 *     summary: Retrieves owner details for a property
 *     description: Fetches details of the owner for a specified property.
 *     parameters:
 *       - in: query
 *         name: propertyId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the property to fetch owner details for.
 *     responses:
 *       200:
 *         description: Owner details retrieved successfully.
 *       404:
 *         description: Property or owner not found.
 *       500:
 *         description: Internal Server Error.
 */
app.use("/properties", propertyRoutes);

/*
? swagger comments for Admin APIs
*/
/**
 * @swagger
 * /admin/admin_approval:
 *   put:
 *     summary: Approves a property
 *     description: Marks a property as approved. This action can only be performed by an admin.
 *     parameters:
 *       - in: query
 *         name: propertyId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the property to approve.
 *     responses:
 *       200:
 *         description: Property approved successfully.
 *       404:
 *         description: Property not found.
 *       500:
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /admin/admin_rejection:
 *   delete:
 *     summary: Rejects and removes a property
 *     description: Removes a property from the database. This action can only be performed by an admin.
 *     parameters:
 *       - in: query
 *         name: propertyId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the property to remove.
 *     responses:
 *       200:
 *         description: Property removed successfully.
 *       500:
 *         description: Internal Server Error.
 */

app.use("/admin", adminRoutes);



// Start the server after connecting to MongoDB
const startServer = async () => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

/*
*creating swagger ui
*@author Atharva
*/
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for JSONPlaceholder',
    version: '1.0.0',
  },
  servers: [{
    url: "http://localhost:5200/"
  }],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "Bearer",
        bearerFormat: "JWT", // Optional, but good to specify if using JWTs
      },
    },
  },
  security: [
    {
      BearerAuth: [],
    },
  ],
};


// Options for the swagger docs
const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./index.js'],
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);

// Serve swagger docs the way you like (Recommendation: swagger-ui-express)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));




// Call the asynchronous functions
connectToMongoDB().then(startServer);
