import express from "express";
import {
  addWishlist,
  checkWishlist,
  deleteWishlist,
  getAllwishlist,
} from "../controllers/Wishlist.js";
import { checkRole } from "../middleware/authentication.js";
const router = express.Router();

router.post("/", checkRole("user"), addWishlist);
router.get("/getone/:wishItemsId", checkRole("user"), checkWishlist);
router.get("/allwish", checkRole("user"), getAllwishlist);
router.delete("/:productId", checkRole(["user"]), deleteWishlist);
export default router;
