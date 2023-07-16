/** @format */

import express, { Request, Response } from "express";
import verify from "../middlewares/verifyToken";
import {
  createComment,
  deleteComment,
  getAllComment,
  getOneComment,
  updateComment,
} from "../controllers/commentController";

const router = express.Router();

// GET ALL COMMENTS
router.get("/", getAllComment);

// GET A COMMENT
router.get("/:id", getOneComment);

// CREATE A COMMENT
router.post("/", verify, createComment);

//DELETE A COMMENT
router.delete("/:id", verify, deleteComment);

// UPDATE A COMMENT
router.put("/:id", verify, updateComment);

export default router;
