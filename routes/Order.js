import express from "express";

import { checkRole } from "../middleware/authentication.js";
import {
  CreateAddress,
  allAddress,
  createPaymentByStripe,
  getAllorder,
  getOrderDetail,
  setAddress,
  userOrders,
} from "../controllers/Order.js";

const router = express.Router();

router.post("/payment", checkRole("user"), createPaymentByStripe);
router.get("/", checkRole(["user"]), userOrders);
router.get("/all", checkRole(["admin"]), getAllorder);
router.get("/detail/:orderId", checkRole(["admin"]), getOrderDetail);

router.get("/address", checkRole(["user"]), allAddress);
router.post("/address", checkRole(["user"]), CreateAddress);
router.put("/address/:id", checkRole(["user"]), setAddress);
export default router;
