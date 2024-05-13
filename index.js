import express from "express";
import sequelize from "./models/connectDB.js";
import Auth from "./routes/Auth.js";
import Product from "./routes/Product.js";
import Category from "./routes/Category.js";
import Wishlist from "./routes/Wishlist.js";
import Relationship from "./models/Relationship.js";
const app = express();
const Port = process.env.Port || 8800;
Relationship();
sequelize
  .sync()
  .then((result) => {
    console.log("You created table success!");
  })
  .catch((err) => {
    console.log("You didn't create table yet!", err);
  });
app.use(express.json());
// app.use("/api/user", userRoute);
app.use("/api/user", Auth);
app.use("/api/product", Product);
app.use("/api/category", Category);
app.use("/api/wishlist", Wishlist);
app.listen(Port, () => {
  console.log(`server is Runing on port ${Port}!`);
});
