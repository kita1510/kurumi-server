-- CreateTable
CREATE TABLE "PostOnLiked" (
    "postId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "PostOnLiked_pkey" PRIMARY KEY ("postId","userId")
);

-- CreateTable
CREATE TABLE "PostOnLibrary" (
    "postId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "PostOnLibrary_pkey" PRIMARY KEY ("postId","userId")
);

-- AddForeignKey
ALTER TABLE "PostOnLiked" ADD CONSTRAINT "PostOnLiked_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostOnLiked" ADD CONSTRAINT "PostOnLiked_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostOnLibrary" ADD CONSTRAINT "PostOnLibrary_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostOnLibrary" ADD CONSTRAINT "PostOnLibrary_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
