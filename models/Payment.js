import DataTypes from "sequelize";
import sequelize from "./connectDB.js";

const Payment = sequelize.define("Payment", {
  payment_method: {
    type: DataTypes.STRING,
  },
  amount: {
    type: DataTypes.FLOAT,
  },
  status: {
    type: DataTypes.ENUM("pending", "completed", "failed"),
    defaultValue: "pending",
  },
});

export default Payment;
