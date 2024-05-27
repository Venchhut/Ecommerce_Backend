import DataTypes from "sequelize";
import sequelize from "./connectDB.js";

const User = sequelize.define("User", {
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    // allowNull defaults to true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  avatar: {
    type: DataTypes.STRING,
    defaultValue: "No Avatar",
  },
  phoneNumber: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
  role: {
    type: DataTypes.ENUM("user", "admin"),
    defaultValue: "user",
    allowNull: false,
  },
});
export default User;
