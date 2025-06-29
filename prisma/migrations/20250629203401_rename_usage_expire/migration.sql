/*
  Warnings:

  - You are about to drop the column `expiresAt` on the `Usage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Usage" DROP COLUMN "expiresAt",
ADD COLUMN     "expire" TIMESTAMP(3);
