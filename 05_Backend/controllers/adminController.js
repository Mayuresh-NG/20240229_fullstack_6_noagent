const { isAdmin } = require("../middlewares/auth");
const Property = require("../models/property_data_scchema");

const approval =
  (isAdmin,
  async (req, res) => {
    try {
      const propertyId = req.query.propertyId;

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

  const rejected =  (isAdmin, async (req, res) => {
    try {
      const propertyId = req.query.propertyId;
  
      // Remove the property from the Property collection
      await Property.findByIdAndDelete(propertyId);
  
      // Send a response
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
  });
  

module.exports = { approval, rejected };
