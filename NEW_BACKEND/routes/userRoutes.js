// external imports
const express = require('express');
const router = express.Router();

// internal imports
const UserController = require("../controllers/userController")
const { verifyToken} = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for user management
 */

// unprotected routes

/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
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
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: User signed up successfully
 *       400:
 *         description: Validation error or user already exists
 */
router.post('/signup', UserController.signup);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Log in as a user
 *     tags: [Users]
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
 *         description: Login successful
 *       400:
 *         description: Validation error or invalid credentials
 *       404:
 *         description: User not found
 */
router.post('/login', UserController.login);

/**
 * @swagger
 * /users/forget_password:
 *   post:
 *     summary: Request to reset password
 *     tags: [Users]
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
 *         description: Password reset email sent successfully
 *       400:
 *         description: Error occurred while processing the request
 */
router.post('/forget_password',UserController.forget_password)

/**
 * @swagger
 * /users/reset_password:
 *   post:
 *     summary: Reset user password
 *     tags: [Users]
 *     parameters:
 *       - name: token
 *         in: query
 *         required: true
 *         description: Reset token received in email
 *         schema:
 *           type: string
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
 *         description: Password reset successful
 *       400:
 *         description: Error occurred while processing the request
 */
router.post('/reset_password',UserController.reset_password)


// protected routes
router.use(verifyToken);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for protected routes for user management
 */
/**
 * @swagger
 * /users/my_properties:
 *   get:
 *     summary: Retrieve properties owned by the user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User's properties retrieved successfully
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */
router.get('/my_properties', UserController.my_property);

/**
 * @swagger
 * /users/add_to_wishlist:
 *   post:
 *     summary: Add a property to the user's wishlist
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               propertyId:
 *                 type: string
 *                 description: ID of the property to add to the wishlist
 *     responses:
 *       200:
 *         description: Property added to wishlist successfully
 *       400:
 *         description: Error in request or validation
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */
router.post('/add_to_wishlist',UserController.addPropertyToWishlist)

/**
 * @swagger
 * /users/remove_from_wishlist:
 *   post:
 *     summary: Remove a property from the user's wishlist
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               propertyId:
 *                 type: string
 *                 description: ID of the property to remove from the wishlist
 *     responses:
 *       200:
 *         description: Property removed from wishlist successfully
 *       400:
 *         description: Error in request or validation
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */
router.post('/remove_from_wishlist',UserController.removePropertyFromWishlist)

/**
 * @swagger
 * /users/get_my_profile:
 *   get:
 *     summary: Retrieve user profile details
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */
router.get('/get_my_profile',UserController.get_my_profile)


module.exports = router;


