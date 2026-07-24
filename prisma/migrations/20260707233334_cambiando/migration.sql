/*
  Warnings:

  - You are about to drop the column `Price` on the `Watch` table. All the data in the column will be lost.
  - Added the required column `price` to the `Watch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Watch" DROP COLUMN "Price",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;
