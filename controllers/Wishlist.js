import Wishlist from "../models/Wishlist.js";
import User from "../models/User.js";
import Product from "../models/Product.js";
import { Op } from "sequelize";
// ! add to wishlist
const addWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    // Check if the product is already in the user's wishlist
    const existingWishlistItem = await Wishlist.findOne({
      where: { UserId: userId, ProductId: productId },
    });

    if (existingWishlistItem) {
      return res
        .status(400)
        .json({ error: "Product is already in the wishlist" });
    }

    // Add product to the wishlist
    const wishlist = await Wishlist.create({
      UserId: userId,
      ProductId: productId,
    });

    return res.json(wishlist);
  } catch (error) {
    return res.status(500).json({ error: "Cannot add to wishlist" });
  }
};

// ! check a wishlist iterms
const checkWishlist = async (req, res) => {
  try {
    const UserId = req.user.id;
    const wishItemsId = req.params.wishItemsId;
    const wishlistItem = await Wishlist.findOne({
      where: {
        [Op.and]: [{ UserId: UserId }, { id: wishItemsId }],
      },
    });
    return res.json(wishlistItem); // Return true if wishlist item exists, false otherwise
  } catch (error) {
    console.error("Error checking wishlist:", error);
    throw error;
  }
};
// ! delete the iterms
const deleteWishlist = async (UserId, ProductId) => {
  try {
    const wishlistItem = await Wishlist.findOne({
      where: { UserId, ProductId },
    });
    if (wishlistItem) {
      await Wishlist.destroy({ where: { UserId, ProductId } });
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error deleting wishlist item:", error);
    throw error;
  }
};
// ! get all wishlist iterms
const getAllwishlist = async (req, res) => {
  try {
    const UserId = req.user.id;
    const wishItems = await Wishlist.findAll({
      where: { UserId },
      include: [Product],
    });
    return res.json(wishItems);
  } catch (error) {
    console.error("Error getting wishlist items:", error);
    throw error;
  }
};

export { addWishlist, checkWishlist, deleteWishlist, getAllwishlist };
