/** @format */

import express, { Request, Response } from "express";
import verify from "../middlewares/verifyToken";
import {
  addPostIntoCategory,
  createCategory,
  getAllCategory,
  getPostByCategory,
} from "../controllers/categoryController";
const router = express.Router();

// GET ALL CATEGORY
router.get("/", getAllCategory);

// GET POST BY CATEGORY
router.get("/:name", getPostByCategory);

// CREATE A CATEGORY
router.post("/", verify, createCategory);

// ADD A POST INTO CATEGORY
router.post("/add", verify, addPostIntoCategory);

export default router;
