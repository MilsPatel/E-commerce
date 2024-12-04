const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");

// Handle Image Upload
const handleImageUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const result = await imageUploadUtil(req.file); // Updated to handle base64
    console.log("Uploaded image URL:", result.secure_url);

    res.send({
      success: true,
      imageUrl: result.secure_url,
    });
  
  } catch (error) {
    console.error("Error in image upload:", error.message);
    res.status(500).json({
      success: false,
      message: "Image upload failed",
    });
  }
};


const addProduct = async (req, res) => {
  console.log(req.body.image);
  
  try {
    if (!req.body.image) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    // const uploadResult = await imageUploadUtil(req.file);
    const imageUrl = req.body.image;;

    const {
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    } = req.body;

    const newProduct = new Product({
      image: imageUrl,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error.message);
    res.status(500).json({
      success: false,
      message: "Error occurred while adding product",
    });
  }
};


// Fetch All Products
const fetchAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({
      success: false,
      message: "Error occurred while fetching products",
    });
  }
};

// Edit a Product
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    } = req.body;

    let imageUrl = req.body.image; // Default to existing image URL
    if (req.file) {
      const uploadResult = await imageUploadUtil(req.file);
      imageUrl = uploadResult.secure_url;
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    product.title = title || product.title;
    product.description = description || product.description;
    product.category = category || product.category;
    product.brand = brand || product.brand;
    product.price = price === "" ? 0 : price || product.price;
    product.salePrice = salePrice === "" ? 0 : salePrice || product.salePrice;
    product.totalStock = totalStock || product.totalStock;
    product.averageReview = averageReview || product.averageReview;
    product.image = imageUrl || product.image;

    await product.save();

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Error editing product:", error.message);
    res.status(500).json({
      success: false,
      message: "Error occurred while editing product",
    });
  }
};

// Delete a Product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    res.status(500).json({
      success: false,
      message: "Error occurred while deleting product",
    });
  }
};

module.exports = {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
};
