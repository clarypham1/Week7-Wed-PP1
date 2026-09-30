const express = require("express");
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productControllers");
//const requireAuth = require("../middleware/requireAuth")
const router = express.Router();

router.get("/", getAllProducts);
router.get("/:ProductId", getProductById);

//router.use(requireAuth);

router.post("/", createProduct);
router.put("/:ProductId", updateProduct);
router.delete("/:ProductId", deleteProduct);

module.exports = router;