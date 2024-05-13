import express from "express";
import { addWishlist } from "../controllers/Wishlist.js";
const router = express.Router();

router.get("/", addWishlist);

export default router;
