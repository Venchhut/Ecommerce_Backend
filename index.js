import express from "express";
import cors from "cors";
import sequelize from "./models/connectDB.js";
import Auth from "./routes/Auth.js";
import Product from "./routes/Product.js";
import Category from "./routes/Category.js";
import Wishlist from "./routes/Wishlist.js";
import Cart from "./routes/Cart.js";
import Order from "./routes/Order.js";
import Tracking from "./routes/Tracking.js";
import Relationship from "./models/Relationship.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
// Constants
const app = express();
const Port = 8800;

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(join(__dirname, "public/images")));

// Enable CORS
app.use(cors());

// Middleware for JSON parsing
app.use(express.json());

// Initialize database relationships
Relationship();

// Sync database
sequelize
  .sync()
  .then(() => {
    console.log("You created table success!");
  })
  .catch((err) => {
    console.log("You didn't create table yet!", err);
  });

// API routes
app.use("/api/user", Auth);
app.use("/api/product", Product);
app.use("/api/category", Category);
app.use("/api/wishlist", Wishlist);
app.use("/api/cart", Cart);
app.use("/api/order", Order);
app.use("/api/tracking", Tracking);

// Start server
app.listen(Port, () => {
  console.log(`Server is running on port ${Port}!`);
});
