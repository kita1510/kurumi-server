/** @format */

import express, { Request, Response } from "express";
import { PrismaClient, Comment } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// GET ALL COMMENTS
router.get("/", async (req: Request, res: Response) => {
  try {
    const comments = await prisma.comment.findMany({
      include: { author: true, post: true },
    });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json("Can not get comments because: " + err);
  }
});

// GET A COMMENT
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  try {
    const post = await prisma.comment.findUnique({
      where: { id: Number(id) },
    });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json("Can not get post because: " + err);
  }
});

// CREATE A COMMENT
router.post("/", async (req: Request, res: Response) => {
  const { authorId, postId, content }: Comment = req.body;
  console.log(req.body);
  try {
    const post = await prisma.comment.create({
      data: {
        content: content,
        author: {
          connect: {
            id: authorId,
          },
        },
        post: {
          connect: {
            id: postId,
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

//DELETE A COMMENT
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  try {
    const comment = await prisma.comment.delete({
      where: { id: Number(id) },
    });
    console.log(comment);
    res.status(200).json("Delete comment successful!");
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE A COMMENT
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { content }: Comment = req.body;
  console.log(id);
  console.log(content);

  try {
    const updatedComment = await prisma.comment.update({
      where: { id: Number(id) },
      data: {
        content: content,
      },
    });
    // console.log(updatedComment)
    res.status(204).json("Update comment successful");
  } catch (err) {
    res.status(500).json("Can not get post because: " + err);
  }
});
export default router;
