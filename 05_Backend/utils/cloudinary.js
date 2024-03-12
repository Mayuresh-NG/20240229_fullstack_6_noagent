const cloudinary = require("cloudinary").v2;

// Configure Cloudinary (make sure to configure it in your main app file as well)
cloudinary.config({
  cloud_name: "dcoiy8s8h",
  api_key: "285696465858417",
  api_secret: "JitIrqE0HS5ZOmMg7DYg2QDdfmk",
});

const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "property_images",
    });

    return {
      url: result.secure_url,
      format: result.format,
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error; // Propagate the error back to the calling function
  }
};

module.exports = { uploadToCloudinary };
