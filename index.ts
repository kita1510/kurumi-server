/** @format */

import { PrismaClient } from "@prisma/client";
import express from "express";
import userRoutes from "./routes/users";
import postRoutes from "./routes/posts";
import profileRoutes from "./routes/profile";
import commentRoutes from "./routes/comments";
import "dotenv/config";
import cors from "cors"

const app = express();
const prisma = new PrismaClient();

async function main() {}

app.use(cors())

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/comments", commentRoutes);

main()
  .then(async () => prisma.$disconnect)
  .catch(async (e) => {
    console.log(e);
    prisma.$disconnect;
  });

app.listen(process.env.PORT, () => {
  console.log("Backend server is running");
});
