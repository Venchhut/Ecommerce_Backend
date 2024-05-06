import DataTypes from "sequelize";
import sequelize from "./connectDB";

const Feedback = sequelize.define("Feedback", {
  rating: {
    type: DataTypes.INTEGER,
    validate: {
      min: 1,
      max: 5,
    },
  },
  comment: {
    type: DataTypes.TEXT,
  },
});

export default Feedback;
