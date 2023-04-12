-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "liked" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "description" TEXT;
