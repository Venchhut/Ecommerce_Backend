import DataTypes from "sequelize";
import sequelize from "./connectDB.js";

const Wishlist = sequelize.define("Wishlist", {});

export default Wishlist;
