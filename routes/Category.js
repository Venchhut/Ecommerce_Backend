import {
  categories,
  createCategory,
  getCategoryById,
} from "../controllers/Category.js";
import express from "express";
import { checkRole } from "../middleware/authentication.js";

const router = express.Router();

router.post("/", checkRole(["admin"]), createCategory);
router.get("/", categories);
router.get("/:id", getCategoryById);
export default router;
