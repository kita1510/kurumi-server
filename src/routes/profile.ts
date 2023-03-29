/** @format */

import express, { Request, Response } from "express";
import { Prisma, PrismaClient, Profile } from "@prisma/client";
import verify from "../middlewares/verifyToken";
const router = express.Router();

const prisma = new PrismaClient();

//GET ALL PROFILE
router.get("/", async (req: Request, res: Response) => {
  try {
    const profiles = await prisma.profile.findMany();
    res.status(200).json(profiles);
  } catch (err) {
    res.status(500).json("Can not get post because: " + err);
  }
});

//GET A PROFILE
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.query;
  console.log(userId);
  try {
    const profiles = await prisma.profile.findUnique({
      where: { id: Number(id) },
    });
    res.status(200).json(profiles);
  } catch (err) {
    res.status(500).json("Can not get post because: " + err);
  }
});

// DELETE A PROFILE
router.delete("/:id", verify, async (req: Request, res: Response) => {
  const { id } = req.params;
  const profile = await prisma.profile.findUnique({
    where: { id: Number(id) },
  });
  if (profile) {
    // @ts-ignore
    if (req?.user?.Role === "ADMIN" || req?.user?.id === profile?.userId) {
      try {
        await prisma.profile.delete({
          where: { id: Number(id) },
        });
        res.status(200).json("Delete profile successful!");
      } catch (err) {
        res.status(500).json("Can not get post because: " + err);
      }
    } else {
      res.status(401).json("You can delete only your profile!");
    }
  } else {
    res.status(403).json("No record of profile!");
  }
});

// CREATE A PROFILE
router.post("/", verify, async (req: Request, res: Response) => {
  const { bio, userId }: Profile = req.body;
  const profile = await prisma.profile.findUnique({
    where: { userId: userId },
  });
  if (!profile) {
    // @ts-ignore
    if (req?.user?.Role === "ADMIN" || req?.user?.id === userId) {
      try {
        const newProfile = await prisma.profile.create({
          data: {
            bio: bio,
            user: {
              connect: {
                id: userId,
              },
            },
          },
        });
        res.status(201).json(newProfile);
      } catch (err) {
        res.status(500).json("Can not get post because: " + err);
      }
    } else {
      res.status(401).json("You can create only your profile!");
    }
  } else {
    res
      .status(403)
      .json("Can not create a profile because profile is available!");
  }
});

//UPDATE A PROFILE
router.put("/:id", verify, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { bio, avatar }: Profile = req.body;
  const profile = await prisma.profile.findUnique({
    where: { id: Number(id) },
  });
  // @ts-ignore
  if (req?.user?.Role === "ADMIN" || req?.user?.id === profile?.userId) {
    try {
      await prisma.profile.update({
        where: { id: Number(id) },
        data: {
          bio: bio,
          avatar,
        },
      });
      res.status(200).json("Update profile successful!");
    } catch (err) {
      res.status(500).json("Can not get post because: " + err);
    }
  } else {
    res.status(401).json("You can update only your profile!");
  }
});

export default router;
