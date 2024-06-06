import express from "express";

import { checkRole } from "../middleware/authentication.js";
import {
  createPaymentByStripe,
  getAllorder,
  getOrderDetail,
  userOrders,
} from "../controllers/Order.js";

const router = express.Router();

router.post("/payment", checkRole("user"), createPaymentByStripe);
router.get("/", checkRole(["user"]), userOrders);
router.get("/all", checkRole(["admin"]), getAllorder);
router.get("/detail/:orderId", checkRole(["admin"]), getOrderDetail);

export default router;
