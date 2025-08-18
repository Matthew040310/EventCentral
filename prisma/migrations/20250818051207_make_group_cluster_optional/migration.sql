-- AlterTable
ALTER TABLE "AuthorizedUsers" ALTER COLUMN "group" DROP NOT NULL,
ALTER COLUMN "cluster" DROP NOT NULL;
