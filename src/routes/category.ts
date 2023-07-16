/** @format */

import express, { Request, Response } from "express";
import verify from "../middlewares/verifyToken";
import categoryController from "../controllers/categoryController";
const router = express.Router();

const {
  addPostIntoCategory,
  createCategory,
  getAllCategory,
  getPostByCategory,
} = categoryController;

// GET ALL CATEGORY
router.get("/", getAllCategory);

// GET POST BY CATEGORY
router.get("/:name", getPostByCategory);

// CREATE A CATEGORY
router.post("/", verify, createCategory);

// ADD A POST INTO CATEGORY
router.post("/add", verify, addPostIntoCategory);

export default router;
