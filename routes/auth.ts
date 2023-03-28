/** @format */

import { User, PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import "dotenv/config";

const router = express.Router();

const prisma = new PrismaClient();

//REGISTER
router.post("/register", async (req: Request, res: Response) => {
  const { name, email, password }: User = req.body;
  try {
    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: CryptoJS.AES.encrypt(password, "nino").toString(),
      },
    });
    console.log(newUser);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("login", async (req: Request, res: Response) => {
  try {
    const { email }: User = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    !user && res.status(401).json("Wrong email or password!");
    const bytes = CryptoJS.AES.decrypt(
      user?.password as string,
      process.env.SECRET_KEY as string
    );
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    originalPassword !== user?.password &&
      res.status(401).json("Wrong email or password!");

    // const accessToken = jwt.sign()
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
