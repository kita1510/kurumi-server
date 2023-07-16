/** @format */

import express, { Request, Response } from "express";
import { Prisma, PrismaClient, Post } from "@prisma/client";

const prisma = new PrismaClient();

const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({
      include: { author: true, comment: true, categories: true },
    });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getSinglePost = async (req: Request, res: Response) => {
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
};

const createPost = async (req: Request, res: Response) => {
  const { title, content, authorId, published }: Post = req.body;
  // @ts-ignore
  if (req?.user?.id === authorId || req?.user?.Role === "ADMIN") {
    try {
      const post = await prisma.post.create({
        data: {
          title: title,
          content: content,
          author: {
            connect: {
              id: authorId,
            },
          },
        },
      });
      res.status(201).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You can not post ");
  }
};

const updatePost = async (req: Request, res: Response) => {
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
};

const deletePost = async (req: Request, res: Response) => {
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
        const post = await prisma.post.delete({
          where: { id: Number(id) },
        });
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
};

export default { getAllPosts, getSinglePost, createPost, updatePost, deletePost };
