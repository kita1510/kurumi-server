/** @format */

import express, { Request, Response } from "express";
import { Prisma, PrismaClient, Post } from "@prisma/client";
import verify from "../middlewares/verifyToken";
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
    res.status(500).json(err);
  }
});

//GET A POST
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
    res.status(500).json(err);
  }
});

// CREATE A POST
router.post("/", verify, async (req: any, res: Response) => {
  const { title, content, authorId, published }: Post = req.body;
  // console.log(req.body);
  if (req?.user?.id === authorId || req?.user?.Role === "ADMIN") {
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
  } else {
    res.status(401).json("You can not post ");
  }
});

//  UPDATE POST
router.put("/:id", verify, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content, published }: Post = req.body;
  const post = await prisma.post.findUnique({ where: { id: Number(id) } });
  // @ts-ignore
  if (req?.user?.Role === "ADMIN" || req?.user?.id === post?.authorId) {
    try {
      const updatePost = await prisma.post.update({
        where: { id: Number(id) || undefined },
        data: {
          title: title,
          content: content,
          published: published,
        },
      });
      console.log(updatePost);
      res.status(200).json("Updated post successful!");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You just can update your post");
  }
});

//DELETE POST
router.delete("/:id", verify, async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await prisma.post.findUnique({
    where: {
      id: Number(id),
    },
  });
  if (post) {
    // @ts-ignore
    if (req?.user?.id === post?.authorId || req?.user?.Role === "ADMIN") {
      try {
        await prisma.comment.deleteMany({
          where: {
            postId: Number(id),
          },
        });
        const post = await prisma.post.delete({
          where: { id: Number(id) },
        });
        console.log(post);
        res.status(200).json("Delete post successful!");
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json("You just can delete your post !");
    }
  } else {
    res.status(403).json("No record of post !");
  }
});

export default router;
