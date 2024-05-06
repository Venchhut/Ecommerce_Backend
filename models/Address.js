import DataTypes from "sequelize";
import sequelize from "./connectDB";

const Address = sequelize.define("Address", {
  // Define attributes
  street_address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Address;
