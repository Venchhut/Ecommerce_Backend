import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// !add to cart
const createCart = async (req, res) => {
  try {
    const productId = req.params.productId;
    const userId = req.user.id;
    const { quantity } = req.body;

    // Check for existing cart items
    const existingCartItem = await Cart.findOne({
      where: { UserId: userId, ProductId: productId },
      include: { model: Product },
    });

    if (existingCartItem) {
      const product = existingCartItem.Product;

      if (existingCartItem.quantity < product.quantity) {
        const availableStock = product.quantity - existingCartItem.quantity;

        if (quantity <= availableStock) {
          existingCartItem.quantity += parseInt(quantity);
        } else {
          return res
            .status(400)
            .json({ error: "Requested quantity exceeds available stock" });
        }
      } else {
        return res.status(400).json({ error: "The product is out of stock" });
      }
      await existingCartItem.save();
      return res.status(200).json(existingCartItem);
    } else {
      // If cart item does not exist, create a new one
      const product = await Product.findByPk(productId);
      if (product) {
        // Check if the requested quantity is available in stock
        if (quantity <= product.quantity) {
          const newCartItem = await Cart.create({
            quantity,
            UserId: userId,
            ProductId: productId,
          });
          return res.status(201).json(newCartItem);
        } else {
          return res
            .status(400)
            .json({ error: "Requested quantity exceeds available stock" });
        }
      } else {
        return res.status(404).json({ error: "Product not found" });
      }
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// ! get all carts
const allCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const carts = await Cart.findAll({
      where: { UserId: userId },
      include: [
        {
          model: Product,
        },
      ],
    });

    res.status(200).json(carts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch cart items", error: error.message });
  }
};

// ! delete cart
const deleteCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.productId;
    const cartItem = await Cart.findOne({
      where: { ProductId: productId, UserId: userId },
    });
    if (cartItem) {
      await cartItem.destroy();
      res.status(200).json({ message: "Delete successfully" });
    } else {
      res.status(400).json({ message: "Cart item not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// ! Update cart
const updateCart = async (req, res) => {
  try {
    const productId = req.params.productId;
    const { action } = req.body;

    const cartItem = await Cart.findOne({
      where: { ProductId: productId },
      include: [Product],
    });

    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    if (action === "increase") {
      // Increase quantity
      if (cartItem.quantity < cartItem.Product.quantity) {
        cartItem.quantity += 1;
      } else {
        return res.status(409).json({ error: "Out of stock" });
      }
    } else if (action === "decrease") {
      // Decrease quantity
      if (cartItem.quantity > 1) {
        cartItem.quantity -= 1;
      } else {
        return res
          .status(400)
          .json({ error: "The quantity cannot be less than 1" });
      }
    } else {
      return res.status(400).json({ error: "Invalid action" });
    }

    await cartItem.save();
    return res.status(200).json(cartItem);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export { createCart, allCart, deleteCart, updateCart };
