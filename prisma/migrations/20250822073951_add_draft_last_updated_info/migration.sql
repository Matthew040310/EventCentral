/*
  Warnings:

  - Added the required column `lastUpdated` to the `DraftEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DraftEvent" ADD COLUMN     "lastUpdated" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "lastUpdatedBy" TEXT;
