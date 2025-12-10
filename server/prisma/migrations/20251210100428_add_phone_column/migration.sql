/*
Warnings:

- Added the required column `phone` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable: Add column as nullable first
ALTER TABLE "User" ADD COLUMN "phone" VARCHAR(20);

-- Update existing rows with a default value (empty string or placeholder)
UPDATE "User" SET "phone" = '' WHERE "phone" IS NULL;

-- Make the column NOT NULL
ALTER TABLE "User" ALTER COLUMN "phone" SET NOT NULL;