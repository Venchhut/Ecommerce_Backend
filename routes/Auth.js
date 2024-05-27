import express from "express";
import {
  allUsers,
  createUser,
  deleteUser,
  getUserById,
  loginUser,
  updateUser,
} from "../controllers/Auth.js";

const router = express.Router();

router.post("/signup", createUser);
router.post("/login", loginUser);
router.get("/", allUsers);
router.patch("/:id", updateUser);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);
export default router;
