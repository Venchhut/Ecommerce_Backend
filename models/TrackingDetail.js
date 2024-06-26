import DataTypes from "sequelize";
import sequelize from "./connectDB.js";

const TrackingDetail = sequelize.define("TrackingDetail", {
  status: {
    type: DataTypes.ENUM("Processing", "Shipped", "Delivered", "Cancelled"),
    defaultValue: "Processing",
  },
});

export default TrackingDetail;
