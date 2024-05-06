import DataTypes from "sequelize";
import sequelize from "./connectDB";

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
