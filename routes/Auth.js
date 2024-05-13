import express from "express";
import { allUsers, createUser } from "../controllers/Auth.js";

const router = express.Router();

router.post("/signup", createUser);
router.get("/", allUsers);
export default router;
