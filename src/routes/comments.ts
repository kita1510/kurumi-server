/** @format */

import express, { Request, Response } from "express";
import { PrismaClient, Comment } from "@prisma/client";
import verify from "../middlewares/verifyToken";

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
router.post("/", verify, async (req: Request, res: Response) => {
  const { authorId, postId, content }: Comment = req.body;
  // @ts-ignore
  console.log(req?.user);
  // @ts-ignore
  if (req?.user?.id === authorId || req?.user?.Role === "ADMIN") {
    try {
      await prisma.comment.create({
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
      res.status(201).json("Create comment successful!");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("Unable to post comment!");
  }
});

//DELETE A COMMENT
router.delete("/:id", verify, async (req: Request, res: Response) => {
  const { id } = req.params;
  const comment = await prisma.comment.findUnique({
    where: { id: Number(id) },
  });
  if (comment) {
    // @ts-ignore
    if (req?.user?.id === comment?.authorId || req?.user?.Role === "ADMIN") {
      try {
        const comment = await prisma.comment.delete({
          where: { id: Number(id) },
        });
        console.log(comment);
        res.status(200).json("Delete comment successful!");
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json("Unabled to delete comment!");
    }
  } else {
    res.status(403).json("Can't find comment!");
  }
});

// UPDATE A COMMENT
router.put("/:id", verify, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { content }: Comment = req.body;
  console.log(id);
  console.log(content);
  const comment = await prisma.comment.findUnique({
    where: { id: Number(id) },
  });
  // @ts-ignore
  if (req?.user?.id === comment?.authorId || req?.user?.Role === "ADMIN") {
    try {
      const updatedComment = await prisma.comment.update({
        where: { id: Number(id) },
        data: {
          content: content,
        },
      });
      res.status(200).json("Updated comment successful");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("Unabled to delete comment!");
  }
});
export default router;
