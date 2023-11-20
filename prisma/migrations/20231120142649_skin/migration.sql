/*
  Warnings:

  - Added the required column `nbgame` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skin` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "nbgame" INTEGER DEFAULT 0,
ADD COLUMN     "skin" VARCHAR(255) DEFAULT 'default_skin';
