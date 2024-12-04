const cloudinary = require("cloudinary").v2;
const multer = require("multer");

// Cloudinary configuration
cloudinary.config({
  cloud_name: "dyfbkya4y",
  api_key: "221515427749971",
  api_secret: "lNp_lvO0LbFeziDJ0h6rwpZ-Daw",
});

// Multer memory storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Image upload utility
async function imageUploadUtil(file) {
  try {
    // Convert the buffer to a base64 string
    const base64File = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(base64File, {
      resource_type: "auto",
    });
    return result;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error.message);
    throw error;
  }
}

module.exports = { upload, imageUploadUtil };
