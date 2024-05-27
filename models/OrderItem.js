import { DataTypes } from "sequelize";
import sequelize from "./connectDB.js";

const OrderItem = sequelize.define("OrderItem", {
  OrderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ProductId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default OrderItem;
