-- AlterTable
ALTER TABLE "Triage" ALTER COLUMN "followUpRequired" DROP NOT NULL,
ALTER COLUMN "followUpRequired" DROP DEFAULT;
