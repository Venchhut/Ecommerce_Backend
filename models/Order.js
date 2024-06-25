import DataTypes from "sequelize";
import sequelize from "./connectDB.js";

const Order = sequelize.define("Order", {
  email: {
    type: DataTypes.STRING,
    require: true,
  },
  address: {
    type: DataTypes.STRING,
    require: true,
  },
  phone: {
    type: DataTypes.STRING,
    require: true,
  },
  payment: {
    type: DataTypes.STRING,
    require: true,
  },
  amount: {
    type: DataTypes.STRING,
    require: true,
  },
});

export default Order;
