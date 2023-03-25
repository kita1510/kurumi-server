/** @format */

import { PrismaClient } from "@prisma/client";
import express from "express";
import userRoutes from "./routes/users";

const app = express();
const prisma = new PrismaClient();

async function main() {}

app.use(express.json());
app.use("/api/users", userRoutes);

main()
  .then(async () => prisma.$disconnect)
  .catch(async (e) => {
    console.log(e);
    prisma.$disconnect;
  });

app.listen(8000, () => {
  console.log("Backend server is running");
});
