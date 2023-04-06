/** @format */

import express, { Request, Response } from "express";
import { Prisma, PrismaClient, Category } from "@prisma/client";
import verify from "../middlewares/verifyToken";
const router = express.Router();

const prisma = new PrismaClient();


export default router;
