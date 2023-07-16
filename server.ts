/** @format */

import { PrismaClient } from "@prisma/client";
import express from "express";
import userRoutes from "./src/routes/users";
import postRoutes from "./src/routes/posts";
import commentRoutes from "./src/routes/comments";
import authRoutes from "./src/routes/auth";
import categoryRoutes from "./src/routes/category";
import cors from "cors";
import "dotenv/config";

const app = express();
const prisma = new PrismaClient();

const PORT = process.env.PORT || 3001;

async function main() {}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/categories", categoryRoutes);

main()
  .then(async () => prisma.$disconnect)
  .catch(async (e) => {
    console.log(e);
    prisma.$disconnect;
  });

app.listen(PORT, () => {
  console.log("Backend server is running");
});
