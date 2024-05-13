import DataTypes from "sequelize";
import sequelize from "./connectDB.js";

const Product = sequelize.define("Product", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  Desc: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Product;
