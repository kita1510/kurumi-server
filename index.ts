import { PrismaClient } from "@prisma/client";
import { getUsers, postUser } from "./controllers/user";

const prisma = new PrismaClient();

async function main() {
    // POST
//   await prisma.user.create({
//     data: {
//       name: "Alice",
//       email: "alice@prisma.io",
//       posts: {
//         create: { title: "Hello World" },
//       },
//       profile: {
//         create: { bio: "I like turtles" },
//       },
//     },
//   });

  //GET ALL
  const data =  await prisma.user.findMany({
    include: { posts: true, profile: true },
  });
  console.log(data)

  //UPDATE
  const post = await prisma.post.update({
    where: { id: 1 },
    data: { published: true },
  });
  console.log(post)


}

main()
  .then(async () => prisma.$disconnect)
  .catch(async (e) => {
    console.log(e);
    prisma.$disconnect;
  });
