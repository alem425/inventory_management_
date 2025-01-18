/*
  Warnings:

  - Changed the type of `category` on the `ExpenseByCategory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ExpenseByCategory" DROP COLUMN "category",
ADD COLUMN     "category" BIGINT NOT NULL;
