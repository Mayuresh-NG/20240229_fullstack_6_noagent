// external imports
const express = require('express');
const router = express.Router();

// internal imports
const UserController = require("../controllers/userController")
const { verifyToken, isAdmin } = require("../middlewares/auth");


router.post('/signup', UserController.signup);
router.post('/login', UserController.login);


// protected routes
router.use(verifyToken);
router.get('/my_properties', UserController.my_property);

module.exports = router;
