import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  product,
  productDetail,
  updateProduct,
} from "../controllers/Product.js";
import { checkRole } from "../middleware/authentication.js";
const router = express.Router();

router.get("/", getAllProduct);
router.post("/create", checkRole(["admin"]), createProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/:id", productDetail);
router.get("/category/:id", product);
export default router;
