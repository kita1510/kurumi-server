/** @format */

import express, { Request, Response } from "express";
import { Prisma, PrismaClient, Post } from "@prisma/client";

const router = express.Router();

const prisma = new PrismaClient();

//GET ALL POSTS
router.get("/", async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({
      include: { author: true, comment: true },
    });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json("Can not get post because: " + err);
  }
});

//GET A USER
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
      include: { author: true, comment: true },
    });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json("Can not get post because: " + err);
  }
});

// CREATE A POST
router.post("/", async (req: Request, res: Response) => {
  const { title, content, authorId, published }: Post = req.body;
  console.log(req.body);
  try {
    const post = await prisma.post.create({
      data: {
        title: title,
        content: content,
        published: published,
        author: {
          connect: {
            id: authorId,
          },
        },
      },
    });
    console.log(post);
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//  UPDATE USER
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content, authorId, published }: Post = req.body;

  console.log(req.body);
  console.log(id);
  try {
    const updatePost =
      await prisma.post.update({
        where: { id: Number(id) || undefined },
        data: {
          title: title,
          content: content,
          published: published,
          author: {
            connect: {
              id: authorId,
            },
          },
        },
      });
    console.log(updatePost);
    res.status(204).json(updatePost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE USER
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  try {
    const post = await prisma.post.delete({
      where: { id: Number(id) },
    });
    console.log(post);
    res.status(200).json("Delete post successful!");
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
