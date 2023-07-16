/** @format */

import { PrismaClient, User } from "@prisma/client";
import express, { Request, Response } from "express";
import verify from "../middlewares/verifyToken";
import {
  deleteUser,
  getAllUser,
  getSingleUser,
  updateUser,
} from "../controllers/userController";

const router = express.Router();

const prisma = new PrismaClient();

//GET ALL USERS
router.get("/", getAllUser);

//GET A USER
router.get("/:id", getSingleUser);

//  UPDATE USER
router.put("/:id", verify, updateUser);

//DELETE USER
router.delete("/:id", verify, deleteUser);

export default router;
