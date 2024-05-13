import DataTypes from "sequelize";
import sequelize from "./connectDB.js";

const Category = sequelize.define("Category", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
export default Category;
