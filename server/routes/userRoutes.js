import express from "express";
import { authUser, forgotPassword, registerUser, resetPassword } from "../Controllers/userController.js";

const router = express.Router();

router.post("/login", authUser);
router.post("/register", registerUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
