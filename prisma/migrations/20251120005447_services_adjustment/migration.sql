/*
  Warnings:

  - You are about to drop the column `buyerCountry` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `buyerZipCode` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `shipping` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "buyerCountry",
DROP COLUMN "buyerZipCode",
DROP COLUMN "shipping",
ADD COLUMN     "additional" TEXT[],
ADD COLUMN     "date" TEXT,
ADD COLUMN     "datetime" TIMESTAMP(3),
ADD COLUMN     "objectType" TEXT,
ADD COLUMN     "persons" INTEGER,
ADD COLUMN     "time" TEXT;
