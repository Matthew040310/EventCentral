/*
  Warnings:

  - You are about to drop the column `reportStatus` on the `DraftEvent` table. All the data in the column will be lost.
  - You are about to drop the column `reportStatus` on the `SubmittedEvent` table. All the data in the column will be lost.
  - Added the required column `eventDate` to the `SubmittedEvent` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "SubmittedEvent_startDate_idx";

-- AlterTable
ALTER TABLE "DraftEvent" DROP COLUMN "reportStatus",
ADD COLUMN     "eventDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "SubmittedEvent" DROP COLUMN "reportStatus",
ADD COLUMN     "eventDate" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "SubmittedEvent_eventDate_idx" ON "SubmittedEvent"("eventDate");
