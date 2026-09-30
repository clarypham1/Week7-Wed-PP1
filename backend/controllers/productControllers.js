const Product = require("../models/ProductModel");
const mongoose = require("mongoose");

// GET /Products
const getAllProducts = async (req, res) => {
  res.send("getAllProducts");
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
  res.send("deleteProduct");
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};