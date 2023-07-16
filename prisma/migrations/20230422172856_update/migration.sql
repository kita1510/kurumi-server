-- DropForeignKey
ALTER TABLE "CategoriesOnPosts" DROP CONSTRAINT "CategoriesOnPosts_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "CategoriesOnPosts" DROP CONSTRAINT "CategoriesOnPosts_postId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_postId_fkey";

-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_followerId_fkey";

-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_profileId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "PostOnLibrary" DROP CONSTRAINT "PostOnLibrary_postId_fkey";

-- DropForeignKey
ALTER TABLE "PostOnLibrary" DROP CONSTRAINT "PostOnLibrary_userId_fkey";

-- DropForeignKey
ALTER TABLE "PostOnLiked" DROP CONSTRAINT "PostOnLiked_postId_fkey";

-- DropForeignKey
ALTER TABLE "PostOnLiked" DROP CONSTRAINT "PostOnLiked_userId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";
