/*
  Warnings:

  - You are about to alter the column `title` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(25)`.

*/
-- AlterTable
ALTER TABLE `Post` MODIFY `title` VARCHAR(25) NOT NULL,
    MODIFY `content` VARCHAR(500) NULL;
