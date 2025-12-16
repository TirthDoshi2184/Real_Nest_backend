const fs = require('fs');
const cloudinary = require('cloudinary').v2;

const uploadimg = async (file) => {
    cloudinary.config({ 
        cloud_name: "dne8hhrez", 
        api_key: "353919444865878", 
        api_secret: "jbYs-85Q4BLWiOIQXUM8AUgLajc",
        timeout : 300000
    });
    if (!file.path || !fs.existsSync(file.path)) {
      throw new Error("File path is invalid or file does not exist.");
  }

  try {
      // Increase the timeout for Cloudinary upload
      const result = await cloudinary.uploader.upload(file.path, {
          resource_type: "image",
          timeout: 300000  // Timeout set to 5 minutes (in milliseconds)
      });
      return result;
  } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      throw new Error(error.message || "Cloudinary upload failed.");
  }
  };
  

module.exports = {
    uploadimg
}