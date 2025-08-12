/*
  Warnings:

  - The `department` column on the `AuthorizedUsers` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "AuthorizedUsers" DROP COLUMN "department",
ADD COLUMN     "department" TEXT[];
