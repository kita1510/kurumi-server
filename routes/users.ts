/** @format */

import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

const router = express.Router();

const prisma = new PrismaClient();

//GET ALL
router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: { posts: true, profile: true },
    });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json("User Not Found!");
  }
});


//GET A USER
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: { posts: true, profile: true },
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json("User Not Found!");
  }
});

//  UPDATE USER
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  console.log(req.body);
  console.log(id);
  try {
    const updateUser = await prisma.user.update({
      where: { id: Number(id) || undefined },
      data: {
        name: req.body.name,
        email: req.body.email,
      },
    });
    console.log(updateUser);
    res.status(204).json(updateUser);
  } catch (err) {
    res.status(500).json("User Not Found!");
  }
});

//DELETE USER
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  try {
    const user = await prisma.user.delete({
      where: { id: Number(id) },
      include: { posts: true, profile: true },
    });
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
