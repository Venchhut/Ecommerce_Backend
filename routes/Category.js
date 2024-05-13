import {
  categories,
  createCategory,
  getCategoryById,
} from "../controllers/Category.js";
import express from "express";

const router = express.Router();

router.post("/", createCategory);
router.get("/", categories);
router.get("/:id", getCategoryById);
export default router;
