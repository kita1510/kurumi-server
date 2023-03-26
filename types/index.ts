/** @format */

export interface User {
  id: number;
  name?: string;
  email: string;
}

export interface Profile{
    id: number,
    bio?: string
    userId: number;
}

export interface Post{
    id: number;
    title: string;
    content?: string;
    published: string;
    createdAt: string;
    updatedAt: string;
    authorId: number;
}
