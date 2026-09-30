const express = require("express");
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productControllers");

const router = express.Router();

router.get("/", getAllProducts);
router.post("/", createProduct);
router.get("/:ProductId", getProductById);
router.put("/:ProductId", updateProduct);
router.delete("/:ProductId", deleteProduct);

module.exports = router;