import Wishlist from "../models/Wishlist.js";
import User from "../models/User.js";
import Product from "../models/Product.js";
// ! add to wishlist
const addWishlist = async (UserId, ProductId) => {
  try {
    const wishlist = await Wishlist.create({ UserId, ProductId });
    return wishlist;
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    throw error;
  }
};
// ! check a wishlist iterms
const checkWishlist = async (UserId, ProductId) => {
  try {
    const wishlistItem = await Wishlist.findOne({
      where: { UserId, ProductId },
    });
    return !!wishlistItem; // Return true if wishlist item exists, false otherwise
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
const getAllwishlist = async (UserId) => {
  try {
    const wishItems = await Wishlist.findAll({
      where: { UserId },
      include: [Product],
    });
    return wishItems;
  } catch (error) {
    console.error("Error getting wishlist items:", error);
    throw error;
  }
};

export { addWishlist, checkWishlist, deleteWishlist, getAllwishlist };
