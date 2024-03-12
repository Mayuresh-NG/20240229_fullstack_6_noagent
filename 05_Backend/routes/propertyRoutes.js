// external imports
const express = require('express');
const router = express.Router();
const Property = require('../models/property_data_scchema')

// internal imports
const propertyController = require("../controllers/propertyController")
const { verifyToken} = require("../middlewares/auth");

// Define your routes and middleware here
router.get('/search', propertyController.search);
// Route to get all properties
router.get('/', async (req, res) => {
    try {
      const properties = await Property.find();
      res.status(200).json(properties);
    } catch (error) {
      console.error('Error fetching properties:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

// protected routes
router.use(verifyToken);
router.post('/rent',propertyController.rent_prop)
router.post('/sell',propertyController.sell_prop)
router.put('/modify_property',propertyController.modify_prop)
router.delete('/remove_property',propertyController.remove_my_prop)
router.get('/get_owner_details',propertyController.get_details )

module.exports = router;
