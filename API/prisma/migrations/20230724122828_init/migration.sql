/*
  Warnings:

  - You are about to drop the column `images` on the `Room` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "images";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "type" SET DEFAULT 'regular';

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "title" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "roomId" INTEGER NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
