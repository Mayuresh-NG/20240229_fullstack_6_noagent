// external imports
const express = require('express');
const router = express.Router();

// internal imports
const propertyController = require("../controllers/propertyController")
const { verifyToken} = require("../middlewares/auth");

// Define your routes and middleware here
router.get('/search', propertyController.search);

// protected routes
router.use(verifyToken);
router.post('/rent',propertyController.rent_prop)
router.post('/sell',propertyController.sell_prop)
router.patch('/modify_property',propertyController.modify_prop)
router.delete('/remove_property',propertyController.remove_my_prop)
router.get('/get_owner_details',propertyController.get_details )

module.exports = router;
