import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Post {
  title: string;
}
interface Posts {
  posts: Post[];
}

interface Profile {
  bio?: string;
}

interface User {
  name: string;
  email: string;
}

function postUser() {
  prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@prisma.io",
      posts: {
        create: { title: "Hello World" },
      },
      profile: {
        create: { bio: "I like turtles" },
      },
    },
  });
}

function getUsers() {
  const listUsers = prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  });
  console.log(listUsers);
  return listUsers;
}

export { postUser, getUsers };
