import express from "express";
import {
  createTrackingDetail,
  deleteTrackingDetail,
  getAllTrackingDetails,
  getTrackingDetailById,
  updateTrackingDetail,
} from "../controllers/Tracking.js";
import { checkRole } from "../middleware/authentication.js";
const router = express.Router();

router.post("/", checkRole(["admin"]), createTrackingDetail);
router.get("/", getAllTrackingDetails);
router.get("/:id", getTrackingDetailById);
router.put("/:id", checkRole(["admin"]), updateTrackingDetail);
router.delete("/:id", checkRole(["admin"]), deleteTrackingDetail);

export default router;
