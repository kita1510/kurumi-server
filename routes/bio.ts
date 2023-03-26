/** @format */

import express, { Request, Response } from "express";
import { Prisma, PrismaClient, Profile } from "@prisma/client";

const router = express.Router();

const prisma = new PrismaClient();

//GET ALL BIO
router.get("/", async (req: Request, res: Response) => {
  try {
    const profiles = await prisma.post.findMany({
      include: { author: true, comment: true },
    });
    res.status(200).json(profiles);
  } catch (err) {
    res.status(500).json("Can not get post because: " + err);
  }
});
