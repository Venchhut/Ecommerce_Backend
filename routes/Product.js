import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  product,
  productDetail,
  updateProduct,
} from "../controllers/Product.js";
const router = express.Router();

router.get("/", getAllProduct);
router.post("/create", createProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/:id", productDetail);
router.get("/category/:id/products", product);
export default router;
