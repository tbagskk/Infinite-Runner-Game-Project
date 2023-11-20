/*
  Warnings:

  - Made the column `nbgame` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `skin` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "nbgame" SET NOT NULL,
ALTER COLUMN "nbgame" DROP DEFAULT,
ALTER COLUMN "skin" SET NOT NULL,
ALTER COLUMN "skin" DROP DEFAULT,
ALTER COLUMN "skin" SET DATA TYPE TEXT;
