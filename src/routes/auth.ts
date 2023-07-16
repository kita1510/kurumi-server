/** @format */

import express from "express";
import authController from "../controllers/authController";

const router = express.Router();
const { registerUser, loginUser } = authController;

//REGISTER
router.post("/register", registerUser);

//LOGIN
router.post("/login", loginUser);

export default router;
