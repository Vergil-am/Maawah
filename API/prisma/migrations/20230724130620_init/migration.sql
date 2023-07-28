/*
  Warnings:

  - Changed the type of `from` on the `Reservation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `to` on the `Reservation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_userId_fkey";

-- AlterTable
ALTER TABLE "Image" ALTER COLUMN "title" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Reservation" ALTER COLUMN "userId" DROP NOT NULL,
DROP COLUMN "from",
ADD COLUMN     "from" TIMESTAMP(3) NOT NULL,
DROP COLUMN "to",
ADD COLUMN     "to" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "acceptedAt" DROP NOT NULL,
ALTER COLUMN "totalPrice" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
