// external imports
const express = require('express');
const router = express.Router();

// internal imports
const propertyController = require("../controllers/propertyController")
const { verifyToken} = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: Properties
 *   description: API endpoints for property management
 */



// Define your routes and middleware here

/**
 * @swagger
 * /properties/search:
 *   get:
 *     summary: Search for properties
 *     tags: [Properties]
 *     responses:
 *       200:
 *         description: Successfully retrieved search results
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/search', propertyController.search);

// protected routes
router.use(verifyToken);

/**
 * @swagger
 * /properties/rent:
 *   post:
 *     summary: Rent a property
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Define schema properties
 *     responses:
 *       200:
 *         description: Property rented successfully
 *       400:
 *         description: Error in request or validation
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */
router.post('/rent',propertyController.rent_prop)

/**
 * @swagger
 * /properties/sell:
 *   post:
 *     summary: Sell a property
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Define schema properties for selling a property
 *     responses:
 *       200:
 *         description: Property sold successfully
 *       400:
 *         description: Error in request or validation
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */
router.post('/sell',propertyController.sell_prop)

/**
 * @swagger
 * /properties/modify_property:
 *   patch:
 *     summary: Modify a property
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Define schema properties for modifying a property
 *     responses:
 *       200:
 *         description: Property modified successfully
 *       400:
 *         description: Error in request or validation
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */
router.patch('/modify_property',propertyController.modify_prop)

/**
 * @swagger
 * /properties/remove_property:
 *   delete:
 *     summary: Remove a property
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: propertyId
 *         in: query
 *         required: true
 *         description: ID of the property to be removed
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Property removed successfully
 *       400:
 *         description: Error in request or validation
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */
router.delete('/remove_property',propertyController.remove_my_prop)

/**
 * @swagger
 * /properties/get_owner_details:
 *   get:
 *     summary: Get details of the property owner
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: propertyId
 *         in: query
 *         required: true
 *         description: ID of the property to get owner details
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Property owner details retrieved successfully
 *       400:
 *         description: Error in request or validation
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */
router.get('/get_owner_details',propertyController.get_details )

module.exports = router;
