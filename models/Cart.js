import DataTypes from "sequelize";
import sequelize from "./connectDB.js";

const Cart = sequelize.define("Cart", {
  quantity: {
    type: DataTypes.INTEGER,
  },
});

export default Cart;
