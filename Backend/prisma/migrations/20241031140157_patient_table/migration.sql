-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "lastName" TEXT NOT NULL,
    "idNumber" TEXT,
    "gender" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT,
    "kinName" TEXT NOT NULL,
    "kinRelationship" TEXT NOT NULL,
    "kinPhoneNumber" TEXT NOT NULL,
    "patientType" TEXT NOT NULL,
    "insurance" TEXT,
    "memberName" TEXT,
    "memberNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Triage" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "vitals" JSONB NOT NULL,
    "symptoms" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Triage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Patient_idNumber_key" ON "Patient"("idNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Triage_patientId_key" ON "Triage"("patientId");
