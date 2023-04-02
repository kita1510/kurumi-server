-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "coverPage" TEXT,
ADD COLUMN     "liked" INTEGER NOT NULL DEFAULT 0;
