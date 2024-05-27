import express from "express";

import { checkRole } from "../middleware/authentication.js";
import { createPaymentByStripe } from "../controllers/Order.js";

const router = express.Router();

router.post("/payment", checkRole("user"), createPaymentByStripe);
export default router;
