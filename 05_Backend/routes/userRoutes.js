// external imports
const express = require('express');
const router = express.Router();

// internal imports
const UserController = require("../controllers/userController")
const { verifyToken} = require("../middlewares/auth");

// unprotected routes
router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.post('/forget_password',UserController.forget_password)
router.post('/reset_password',UserController.reset_password)


// protected routes
router.use(verifyToken);
router.get('/my_properties', UserController.my_property);
router.post('/add_to_wishlist',UserController.addPropertyToWishlist)
router.delete('/remove_from_wishlist',UserController.removePropertyFromWishlist)
router.get('/get_my_profile',UserController.get_my_profile)
router.get('/wishlist', UserController.wishlist);


module.exports = router;


