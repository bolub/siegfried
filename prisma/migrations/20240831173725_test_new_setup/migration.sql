-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('CONTRACT_CREATED', 'CONTRACT_OPENED', 'CONTRACT_SIGNED', 'CONTRACT_UPDATED');

-- AlterEnum
ALTER TYPE "ContractStatus" ADD VALUE 'DRAFT';

-- CreateTable
CREATE TABLE "Activity" (
    "action" "ActivityType" NOT NULL,
    "id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "contractId" TEXT NOT NULL,
    "recipientId" TEXT,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "ContractRecipient"("id") ON DELETE SET NULL ON UPDATE CASCADE;
