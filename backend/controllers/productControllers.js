const Product = require("../models/ProductModel");
const mongoose = require("mongoose");

// GET /Products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed", error: error.message })
  }
};

// POST /Products
const createProduct = async (req, res) => {
  try {
    const user_id = req.user._id;
    const newProduct = new Product({
      ...req.body,
      user_id,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating Product:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

// GET /Products/:ProductId
const getProductById = async (req, res) => {
  const { ProductId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(ProductId)) {
    return res.status(404).json({ message: "invalid product ID" });
  }
  try {
    const product = await Product.findById(ProductId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "failed to retrieve product" });
  }
};

// PUT /Products/:ProductId
const updateProduct = async (req, res) => {
  const { ProductId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(ProductId)) {
    return res.status(404).json({ error: "Invalid Product Id" })
  }
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: ProductId },
      { ...req.body },
      { returnDocument: "after" }
    )
    if (updatedProduct) {
      res.status(200).json(updatedProduct)
    } else {
      res.status(404).json({message: "Product not found"})
    }
  }
  catch (error) {
    res.status(500).json({ error: error.message })
  }
};

// DELETE /Products/:ProductId
const deleteProduct = async (req, res) => {
  const { ProductId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(ProductId)) {
    return res.status(404).json({ error: "Invalid Product ID" });
  }
  try {
    const deletedProduct = await Product.findOneAndDelete({ _id: ProductId })
    if (!deletedProduct) {
      return res.status(404).json({ error: "Product Not Found" });
    }
    return res.status(204).send();
  }
  catch (error) {
    res.status(500).json({ error: error.message })
  }
};



module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};