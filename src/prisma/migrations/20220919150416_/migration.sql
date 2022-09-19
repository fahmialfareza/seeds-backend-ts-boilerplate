/*
  Warnings:

  - You are about to drop the column `commented_on` on the `comments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "comments" DROP COLUMN "commented_on",
ADD COLUMN     "reply_on" INTEGER DEFAULT 0;
