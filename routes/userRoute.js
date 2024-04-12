import express from "express";
import userController from "../controllers/userController.js";
//? get all user
const router = express.Router();

// Route to get all contacts
router.get("/", userController);

export default router;
