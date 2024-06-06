import {
  categories,
  createCategory,
  deleteCategory,
  getCategoryById,
  updateCategory,
} from "../controllers/Category.js";
import express from "express";
import { checkRole } from "../middleware/authentication.js";
import upload from "../middleware/uploadImage.js";
const router = express.Router();

router.post("/", checkRole(["admin"]), upload.single("image"), createCategory);
router.get("/", categories);
router.get("/:id", getCategoryById);
router.delete("/:id", checkRole(["admin"]), deleteCategory);
router.put(
  "/:id",
  checkRole(["admin"]),
  upload.single("image"),
  updateCategory
);
export default router;
