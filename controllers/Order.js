import stripe from "stripe";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import OrderItem from "../models/OrderItem.js";
import Product from "../models/Product.js";
import sequelize from "../models/connectDB.js";
import Address from "../models/Address.js";
import User from "../models/User.js";

const stripeInstance = stripe(
  "sk_test_51OWHOqFraYvbLw8OVdQ8ThcsXMZIPcvpAvfkiVzTWwf45K03Dcx03mrFdRsp303bvFx3YVJGZsUUccnUmMCUeA2k00twoe2qKL"
); // Use environment variable for secret key
// ! payment by Card
// export const createPaymentByStripe = async (req, res) => {
//   const t = await sequelize.transaction(); // Use a transaction to ensure atomic operations
//   try {
//     const { productCart, amount } = req.body;
//     const currency = "usd"; // Adjust currency as needed
//     // Validate amount and productCart
//     if (
//       !amount ||
//       !productCart ||
//       !Array.isArray(productCart) ||
//       productCart.length === 0
//     ) {
//       return res.status(400).json({ error: "Invalid input data" });
//     }

//     // Verify that all product IDs exist
//     const productIds = productCart.map((product) => product.Product.id);
//     const products = await Product.findAll({ where: { id: productIds } });
//     if (products.length !== productCart.length) {
//       return res.status(400).json({ error: "Some products do not exist" });
//     }

//     const paymentIntent = await stripeInstance.paymentIntents.create({
//       amount,
//       currency,
//       automatic_payment_methods: { enabled: true },
//     });

//     if (!paymentIntent) {
//       throw new Error("Failed to create payment intent");
//     }
//     const addressId = await Address.findOne({ where: { UserId: req.user.id } });
//     if (!addressId) {
//       return res.status(400).json({ error: "You not yet insert Location" });
//     }
//     // Create the order
//     const order = await Order.create(
//       {
//         email: req.user.email,
//         payment: "Stripe",
//         UserId: req.user.id,
//         AddressId: addressId.id,
//         phone: req.user.phone,
//         amount: amount,
//       },
//       { transaction: t }
//     );

//     if (!order) {
//       throw new Error("Failed to create order");
//     }

//     // Create order items
//     for (const product of productCart) {
//       console.log(product);
//       await OrderItem.create(
//         {
//           OrderId: order.id,
//           ProductId: product.Product.id,
//           quantity: product.quantity,
//         },
//         { transaction: t }
//       );
//     }

//     // Remove all cart entries associated with the current user
//     await Cart.destroy({ where: { UserId: req.user.id } }, { transaction: t });

//     await t.commit(); // Commit the transaction

//     res.json({ clientSecret: paymentIntent.client_secret });
//   } catch (error) {
//     await t.rollback(); // Rollback the transaction in case of error
//     console.error("Error creating payment intent:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
export const createPaymentByStripe = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { productCart, amount } = req.body;
    const currency = "usd";

    if (
      !amount ||
      !productCart ||
      !Array.isArray(productCart) ||
      productCart.length === 0
    ) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    const productIds = productCart.map((product) => product.Product.id);
    const products = await Product.findAll({ where: { id: productIds } });
    if (products.length !== productCart.length) {
      return res.status(400).json({ error: "Some products do not exist" });
    }

    const amountInCents = amount;
    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount: amountInCents,
      currency,
      automatic_payment_methods: { enabled: true },
    });

    if (!paymentIntent) {
      throw new Error("Failed to create payment intent");
    }

    const addressId = await Address.findOne({ where: { UserId: req.user.id } });
    if (!addressId) {
      return res.status(400).json({ error: "You not yet insert Location" });
    }

    const order = await Order.create(
      {
        email: req.user.email,
        payment: "Stripe",
        UserId: req.user.id,
        AddressId: addressId.id,
        phone: req.user.phone,
        amount: amountInCents / 100,
      },
      { transaction: t }
    );

    if (!order) {
      throw new Error("Failed to create order");
    }

    for (const product of productCart) {
      await OrderItem.create(
        {
          OrderId: order.id,
          ProductId: product.Product.id,
          quantity: product.quantity,
        },
        { transaction: t }
      );
    }

    await Cart.destroy({ where: { UserId: req.user.id } }, { transaction: t });

    await t.commit();

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    await t.rollback();
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// each order
export const userOrders = async (req, res) => {
  try {
    // Get user ID from the request (assuming user authentication middleware)
    const userId = req.user.id;

    // Fetch all orders for the authenticated user
    const orders = await Order.findAll({
      where: { UserId: userId },
      include: [
        {
          model: OrderItem,
          include: [Product],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    // Check if orders exist
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    // Send orders in response
    res.json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ! payment by Cash
export const createPaymentByCash = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { productCart, amount } = req.body;

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

    const address = await Address.findOne({ where: { UserId: req.user.id } });
    if (!address) {
      return res
        .status(400)
        .json({ error: "You have not yet inserted Location" });
    }

    // Create the order
    const order = await Order.create(
      {
        email: req.user.email,
        payment: "Cash",
        UserId: req.user.id,
        AddressId: address.id,
        phone: req.user.phone,
        amount: amount,
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
          quantity: product.quantity,
        },
        { transaction: t }
      );
    }

    // Remove all cart entries associated with the current user
    await Cart.destroy({ where: { UserId: req.user.id } }, { transaction: t });

    await t.commit(); // Commit the transaction

    res.status(201).json({ message: "Order confirmed successfully." });
  } catch (error) {
    await t.rollback(); // Rollback the transaction in case of error
    console.error("Error confirming order:", error);
    res
      .status(500)
      .json({ error: "An error occurred while confirming the order." });
  }
};

//! Fetch order details by order ID
export const getOrderDetail = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Validate the orderId parameter
    if (!orderId) {
      return res.status(400).json({ error: "Order ID is required" });
    }

    // Fetch the order with associated order items and products
    const order = await Order.findOne({
      where: { id: orderId },
      include: [
        {
          model: OrderItem,
          include: [Product],
        },
        {
          model: Address,
        },
      ],
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error("Error fetching order details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Fetch all orders for admin users
// Assuming you have an Address model related to the Order model
export const getAllorder = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: OrderItem,
          include: [Product],
        },
        {
          model: Address, // Add this line to include the Address model
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.json(orders);
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//! All address
export const allAddress = async (req, res) => {
  const userId = req.user.id;

  try {
    // Find all addresses for the given user
    const addresses = await Address.findAll({
      where: { UserId: userId },
    });

    if (addresses.length === 0) {
      return res.status(404).json({ error: "No addresses found for the user" });
    }

    res.status(200).json(addresses);
  } catch (error) {
    console.error("Failed to retrieve addresses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//! create address
export const CreateAddress = async (req, res) => {
  const { street_address, city, country } = req.body;
  const userId = req.user.id;

  // Input validation
  if (!street_address || !city || !country) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Check if user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create new address
    const newAddress = await Address.create({
      street_address,
      city,
      country,
      UserId: userId,
    });

    return res.status(201).json(newAddress);
  } catch (error) {
    console.error("Failed to create address:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
export const setAddress = async (req, res) => {
  const currentUserId = req.user.id;
  const addressId = req.params.id;
  try {
    // Find the address by addressId and currentUserId
    const address = await Address.findOne({
      where: { id: addressId },
    });

    if (address) {
      // Update the UserId of the found address
      address.UserId = currentUserId;
      await address.save();
      res.status(200).json({ message: "Address updated successfully" });
    } else {
      res.status(404).json({
        error: "Address not found or does not belong to the current user",
      });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the address" });
  }
};
