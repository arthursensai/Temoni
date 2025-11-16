/*
  Warnings:

  - A unique constraint covering the columns `[allowedUserId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "allowedUserId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_allowedUserId_key" ON "User"("allowedUserId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_allowedUserId_fkey" FOREIGN KEY ("allowedUserId") REFERENCES "AllowedUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
