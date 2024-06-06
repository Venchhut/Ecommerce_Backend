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
import upload from "../middleware/uploadImage.js";
const router = express.Router();

router.get("/", getAllProduct);
router.post(
  "/create",
  checkRole(["admin"]),
  upload.single("image"),
  createProduct
);
router.patch(
  "/:id",
  checkRole(["admin"]),
  upload.single("image"),
  updateProduct
);
router.delete("/:id", checkRole(["admin"]), deleteProduct);
router.get("/:id", productDetail);
router.get("/category/:id", product);
export default router;
