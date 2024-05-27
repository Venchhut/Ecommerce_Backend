import express from "express";
import {
  addWishlist,
  checkWishlist,
  getAllwishlist,
} from "../controllers/Wishlist.js";
import { checkRole } from "../middleware/authentication.js";
const router = express.Router();

router.post("/", checkRole("user"), addWishlist);
router.get("/getone/:wishItemsId", checkRole("user"), checkWishlist);
router.get("/allwish", checkRole("user"), getAllwishlist);

export default router;
