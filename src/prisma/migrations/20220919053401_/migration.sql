-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "idWallet" INTEGER,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "avatar" TEXT,
    "seedsTag" TEXT,
    "otp" TEXT,
    "pin" TEXT NOT NULL,
    "countPost" INTEGER DEFAULT 0,
    "countFollowers" INTEGER DEFAULT 0,
    "countFollowings" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" SERIAL NOT NULL,
    "idUser" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" SERIAL NOT NULL,
    "idUser" INTEGER NOT NULL,
    "idPost" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "commentedOn" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_idPost_fkey" FOREIGN KEY ("idPost") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
