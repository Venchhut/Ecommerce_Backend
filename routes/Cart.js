import express from "express";
import {
  allCart,
  createCart,
  deleteCart,
  updateCart,
} from "../controllers/Cart.js";
import { checkRole } from "../middleware/authentication.js";

const router = express.Router();

router.post("/add/:productId", checkRole("user"), createCart);
router.get("/find", checkRole("user"), allCart);
router.delete("/delete/:productId", checkRole("user"), deleteCart);
router.patch("/update/:productId", checkRole("user"), updateCart);
export default router;
