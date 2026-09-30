const Product = require("../models/ProductModel");
const mongoose = require("mongoose");

// GET /Products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({message: "Failed", error: error.message})
  }
};

// POST /Products
const createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create({...req.body});
    res.status(201).json(newProduct);
  }
  catch (error) {
    res.status(400).json({error: error.message})
  }
};

// GET /Products/:ProductId
const getProductById = async (req, res) => {
  res.send("getProductById");
};

// PUT /Products/:ProductId
const updateProduct = async (req, res) => {
  res.send("updateProduct");
};

// DELETE /Products/:ProductId
const deleteProduct = async (req, res) => {
  const { ProductId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(ProductId)) {
    return res.status(404).json({error: "Invalid Product ID"});
  }
  try {
    const deletedProduct = await Product.findOneAndDelete({_id : ProductId})
    if (!deletedProduct) {
      return res.status(404).json({error: "Product Not Found"});
    }
    return res.status(204).send();
  }
  catch (error) {
    res.status(500).json({error: error.message})
  }
};



module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};