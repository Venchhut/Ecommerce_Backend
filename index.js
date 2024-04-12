import express from "express";
import sequelize from "./models/connectDB.js";
import userRoute from "./routes/userRoute.js";
const app = express();
const Port = process.env.Port || 8800;
sequelize
  .sync()
  .then((result) => {
    console.log("You created table success!");
  })
  .catch((err) => {
    console.log("You didn't create table yet!", err);
  });
app.use(express.json());
app.use("/api/user", userRoute);
app.listen(Port, () => {
  console.log(`server is Runing on port ${Port}!`);
});
