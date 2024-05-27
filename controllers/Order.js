import stripe from "stripe";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js"; // Import the Cart model
import OrderItem from "../models/OrderItem.js";
import Product from "../models/Product.js"; // Import the Product model
import sequelize from "../models/connectDB.js"; // Ensure correct path to your sequelize instance

const stripeInstance = stripe(
  "sk_test_51OWHOqFraYvbLw8OVdQ8ThcsXMZIPcvpAvfkiVzTWwf45K03Dcx03mrFdRsp303bvFx3YVJGZsUUccnUmMCUeA2k00twoe2qKL"
); // Use environment variable for secret key

export const createPaymentByStripe = async (req, res) => {
  const t = await sequelize.transaction(); // Use a transaction to ensure atomic operations
  try {
    const { productCart, amount } = req.body;
    const currency = "usd"; // Adjust currency as needed

    // Validate amount and productCart
    if (
      !amount ||
      !productCart ||
      !Array.isArray(productCart) ||
      productCart.length === 0
    ) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    // Verify that all product IDs exist
    const productIds = productCart.map((product) => product.Product.id);
    const products = await Product.findAll({ where: { id: productIds } });
    if (products.length !== productCart.length) {
      return res.status(400).json({ error: "Some products do not exist" });
    }

    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: { enabled: true },
    });

    if (!paymentIntent) {
      throw new Error("Failed to create payment intent");
    }

    // Create the order
    const order = await Order.create(
      {
        email: req.user.email, // Assuming you have user authentication middleware and user email is available in req.user
        payment: "Stripe", // Assuming payment method is Stripe
        UserId: req.user.id,
        address: req.user.address,
        phone: req.user.phone, // Use address from request body
      },
      { transaction: t }
    );

    if (!order) {
      throw new Error("Failed to create order");
    }

    // Create order items
    for (const product of productCart) {
      await OrderItem.create(
        {
          OrderId: order.id,
          ProductId: product.Product.id,
          quantity: product.Product.quantity,
        },
        { transaction: t }
      );
    }

    // Remove all cart entries associated with the current user
    await Cart.destroy({ where: { UserId: req.user.id } }, { transaction: t });

    await t.commit(); // Commit the transaction

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    await t.rollback(); // Rollback the transaction in case of error
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
