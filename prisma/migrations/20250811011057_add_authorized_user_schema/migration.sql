/*
  Warnings:

  - Added the required column `cluster` to the `AuthorizedUsers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `AuthorizedUsers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AuthorizedUsers" ADD COLUMN     "cluster" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "role" SET DEFAULT 'Guest';
