/*
  Warnings:

  - Added the required column `consultationDate` to the `Triage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `followUpRequired` to the `Triage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Triage" ADD COLUMN     "additionalNotes" TEXT,
ADD COLUMN     "consultationDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "diagnosis" TEXT,
ADD COLUMN     "doctorNotes" TEXT,
ADD COLUMN     "followUpRequired" BOOLEAN NOT NULL,
ADD COLUMN     "recommendedTreatment" TEXT;
