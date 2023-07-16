/** @format */

import express, { Request, Response } from "express";
import { Prisma, PrismaClient, Post } from "@prisma/client";
import verify from "../middlewares/verifyToken";
import {
  createPost,
  deletePost,
  getAllPosts,
  getSinglePost,
  updatePost,
} from "../controllers/postController";
const router = express.Router();

const prisma = new PrismaClient();

//GET ALL POSTS
router.get("/", getAllPosts);

//GET A POST
router.get("/:id", getSinglePost);

// CREATE A POST
router.post("/", verify, createPost);

//  UPDATE POST
router.put("/:id", verify, updatePost);

//DELETE POST
router.delete("/:id", verify, deletePost);

export default router;
